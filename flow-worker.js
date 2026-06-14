// ══════════════════════════════════════════════
//  FLOW PAYMENTS WORKER — Máximo Esfuerzo
//  Variables de entorno requeridas en Cloudflare:
//  FLOW_API_KEY, FLOW_SECRET_KEY, NOTIFY_EMAIL
// ══════════════════════════════════════════════

const FLOW_BASE = 'https://www.flow.cl/api';
// Para pruebas usa: 'https://sandbox.flow.cl/api'

// ── Firmar parámetros con HMAC-SHA256 ──────────
async function firmar(params, secretKey) {
  const keys = Object.keys(params).sort();
  const cadena = keys.map(k => k + params[k]).join('');
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(cadena));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// ── Llamar a la API de Flow ────────────────────
async function llamarFlow(endpoint, params, env) {
  params.apiKey = env.FLOW_API_KEY;
  params.s = await firmar(params, env.FLOW_SECRET_KEY);
  const body = new URLSearchParams(params);
  const res = await fetch(`${FLOW_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });
  return res.json();
}

// ── Verificar webhook de Flow ──────────────────
async function verificarWebhook(params, secretKey) {
  const firma = params.s;
  const copia = { ...params };
  delete copia.s;
  const firma2 = await firmar(copia, secretKey);
  return firma === firma2;
}

// ── CORS ───────────────────────────────────────
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// COACH_SECRET se lee de env.COACH_SECRET (Cloudflare Worker secret)
// Configúralo con: npx wrangler secret put COACH_SECRET
// Valor por defecto solo como fallback de desarrollo:
const COACH_SECRET = null; // nunca hardcodeado en código

// Llave compartida para endpoints de escritura del atleta (sync, save-profile).
// No es un secreto fuerte (vive en el JS público) pero bloquea escrituras
// casuales de terceros que descubran la URL del worker.
const SYNC_KEY = 'ME-sync-26';

// ══════════════════════════════════════════════
//  HANDLER PRINCIPAL
// ══════════════════════════════════════════════
export default {
  // ── Cron diario: notificar planes por vencer ──
  async scheduled(event, env, ctx) {
    ctx.waitUntil(notificarVencimientosProximos(env));
  },

  async fetch(request, env) {
    // Leer secret desde env (Cloudflare Worker secret), nunca del código
    const COACH_SECRET = env.COACH_SECRET;
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // ── POST /crear-pago (pago único o suscripción 3 meses) ──────
    if (url.pathname === '/crear-pago' && request.method === 'POST') {
      try {
        const { plan, monto, email, nombre, tipoPago, tipoSuscripcion } = await request.json();

        // Pago único: cobro directo sin suscripción
        if (tipoSuscripcion === 'pago-unico' || tipoPago === 'unico') {
          return await crearPagoUnico({ plan, monto, email, nombre, tipoPago: 'unico' }, env);
        }

        // Suscripción 3 meses: cobros automáticos cada mes por 3 meses
        if (tipoSuscripcion === 'suscripcion-3m' || tipoPago === 'mensual') {
          try {
            // 1. Crear cliente en Flow
            const cliente = await llamarFlow('/customer/create', {
              name:  nombre || email,
              email: email,
            }, env);
            console.log('Cliente Flow:', JSON.stringify(cliente));

            const customerId = cliente.customerId || cliente.id;
            if (!customerId) {
              console.error('Error creando cliente:', JSON.stringify(cliente));
              // Fallback: cobrar primer mes como pago único y notificar admin
              return await crearPagoUnico({ plan, monto, email, nombre, tipoPago: 'mensual-fallback' }, env);
            }

            // 2. Crear plan de suscripción con 3 cobros
            const planId = `ME-3m-${Date.now()}`;
            const planResp = await llamarFlow('/plan/create', {
              planId:          planId,
              name:            `${plan} - 3 meses`,
              currency:        'CLP',
              amount:          String(monto),
              interval:        1,
              intervalType:    'month',
              charges:         3,
              trialPeriodDays: 0,
              urlCallback:     'https://flow-payments.jaimea-gomezh.workers.dev/webhook-suscripcion',
            }, env);
            console.log('Plan Flow:', JSON.stringify(planResp));

            if (!planResp.planId) {
              console.error('Error creando plan:', JSON.stringify(planResp));
              return await crearPagoUnico({ plan, monto, email, nombre, tipoPago: 'mensual-fallback' }, env);
            }

            // 3. Suscribir cliente al plan (sin couponId vacío)
            const susParams = { planId: planId, customerId: customerId };
            const susResp = await llamarFlow('/subscription/create', susParams, env);
            console.log('Suscripcion Flow:', JSON.stringify(susResp));

            if (susResp.url && susResp.token) {
              return Response.json({
                ok: true,
                url: `${susResp.url}?token=${susResp.token}`,
                subscriptionId: susResp.subscriptionId,
                tipo: 'suscripcion'
              }, { headers: corsHeaders() });
            }

            // Si subscription/create no devuelve URL, fallback a pago único
            console.error('Suscripcion sin URL:', JSON.stringify(susResp));
            return await crearPagoUnico({ plan, monto, email, nombre, tipoPago: 'mensual-fallback' }, env);

          } catch(subErr) {
            console.error('Error en suscripcion:', subErr.message);
            return await crearPagoUnico({ plan, monto, email, nombre, tipoPago: 'mensual-fallback' }, env);
          }
        }

        return Response.json({ ok: false, error: 'Tipo de pago inválido' }, { headers: corsHeaders() });

      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { headers: corsHeaders() });
      }
    }

    // ── POST /crear-suscripcion (asesoría) ───────
    if (url.pathname === '/crear-suscripcion' && request.method === 'POST') {
      try {
        const { email, nombre, meses, monto } = await request.json();

        // 1. Crear o buscar cliente en Flow
        const cliente = await llamarFlow('/customer/create', {
          name:  nombre,
          email: email,
        }, env);

        const customerId = cliente.customerId || cliente.id;
        if (!customerId) {
          return Response.json({ ok: false, error: 'No se pudo crear cliente', detalle: cliente }, { headers: corsHeaders() });
        }

        // 2. Crear plan de suscripción
        const planId = `asesoria-${meses}m-${Date.now()}`;
        const plan = await llamarFlow('/plan/create', {
          planId:       planId,
          name:         `Asesoría ${meses} mes(es) - Máximo Esfuerzo`,
          currency:     'CLP',
          amount:       String(monto),
          interval:     '1',
          intervalCount: String(meses),
          trialPeriodDays: '0',
          urlCallback:  'https://flow-payments.jaimea-gomezh.workers.dev/webhook-suscripcion',
        }, env);

        // 3. Suscribir cliente al plan — redirige a Flow para ingresar tarjeta
        const suscripcion = await llamarFlow('/subscription/create', {
          planId:     planId,
          customerId: customerId,
          couponId:   '',
        }, env);

        if (suscripcion.url && suscripcion.token) {
          return Response.json({
            ok: true,
            url: `${suscripcion.url}?token=${suscripcion.token}`
          }, { headers: corsHeaders() });
        }

        return Response.json({ ok: false, error: suscripcion }, { headers: corsHeaders() });

      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { headers: corsHeaders() });
      }
    }

    // ── POST /webhook-pago (Flow confirma pago) ──
    if (url.pathname === '/webhook-pago' && request.method === 'POST') {
      try {
        const body   = await request.text();
        const params = Object.fromEntries(new URLSearchParams(body));

        const valido = await verificarWebhook(params, env.FLOW_SECRET_KEY);
        if (!valido) return new Response('Firma inválida', { status: 403 });

        // Consultar estado real del pago
        const estado = await llamarFlow('/payment/getStatus', {
          token: params.token
        }, env);

        if (estado.status === 2) { // 2 = pagado
          const opt = JSON.parse(estado.optional || '{}');
          const emailCliente = estado.payer;
          const esPersonalizado = opt.plan?.toLowerCase().includes('personalizado') || opt.tipoPago === 'personalizado';

          // ✅ GUARDAR ATLETA EN KV (para panel coach)
          const fechaCompra = new Date().toISOString();
          const fechaVencimiento = calcularVencimiento(opt.tipoSuscripcion || opt.tipoPago, fechaCompra);
          const rutCliente = opt.rutCliente || '66666666-6'; // RUT atleta o consumidor final
          const datosAtleta = {
            email: emailCliente,
            nombre: opt.nombre || emailCliente.split('@')[0],
            rut: rutCliente,
            plan: opt.plan,
            tipoPlan: esPersonalizado ? 'personalizado' : 'suscrito',
            tipoSuscripcion: opt.tipoSuscripcion || opt.tipoPago,
            monto: estado.amount,
            fechaCompra,
            fechaVencimiento,
            orden: estado.commerceOrder,
            pagos: [{ fecha: fechaCompra, monto: estado.amount, orden: estado.commerceOrder }]
          };
          await env.RUCK_DATA.put(`plan-atleta:${emailCliente}`, JSON.stringify(datosAtleta));

          // ✅ EMITIR BOLETA DE HONORARIOS EN SII
          let folioBoleta = null;
          try {
            folioBoleta = await emitirBoleta(env, {
              rutEmisor:   env.SII_RUT,
              claveEmisor: env.SII_CLAVE,
              rutReceptor: rutCliente,
              monto:       estado.amount,
              descripcion: `Servicio de entrenamiento — ${opt.plan}`,
              nombre:      opt.nombre || emailCliente.split('@')[0],
              email:       emailCliente,
            });
            console.log('Boleta emitida, folio:', folioBoleta);
          } catch(bErr) {
            console.error('Error emitiendo boleta SII:', bErr.message);
          }

          // ✅ ENVIAR CÓDIGO DE TRAINHEROIC (solo planes autogestionados)
          if (!esPersonalizado) {
            const codigo = obtenerCodigoTrainHeroic(opt.plan, env);
            if (codigo) {
              await enviarEmailTrainHeroic(env, {
                email: emailCliente,
                codigo,
                plan: opt.plan,
                nombre: opt.nombre,
                folioBoleta,
              });
            }
          }

          // Notificar a admin con todos los datos para emitir boleta en SII
          const glosaBoleta = `Servicio de entrenamiento — ${opt.plan}`;
          const emailDesdeAdmin = env.EMAIL_FROM || 'onboarding@resend.dev';
          const adminEmail = env.NOTIFY_EMAIL || 'maximoesfuerzo91@gmail.com';
          const htmlAdmin = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<style>
  body{font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0;}
  .wrap{max-width:600px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
  .hdr{background:#1a1a2e;color:#fff;padding:24px 28px;}
  .hdr h2{margin:0;font-size:20px;}
  .hdr p{margin:6px 0 0;font-size:13px;color:#aaa;}
  .body{padding:28px;}
  .tag{display:inline-block;background:${esPersonalizado?'#fff3cd':'#d4edda'};color:${esPersonalizado?'#856404':'#155724'};border:1px solid ${esPersonalizado?'#ffc107':'#28a745'};border-radius:4px;padding:3px 10px;font-size:12px;font-weight:700;margin-bottom:16px;}
  .row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;font-size:14px;}
  .row:last-child{border-bottom:none;}
  .lbl{color:#666;}
  .val{font-weight:600;color:#111;}
  .boleta-box{background:#e8f4fd;border:2px solid #3498db;border-radius:8px;padding:20px;margin:20px 0;}
  .boleta-box h3{margin:0 0 14px;color:#1a5276;font-size:15px;}
  .dato{background:#fff;border:1px solid #bee3f8;border-radius:6px;padding:10px 14px;margin-bottom:8px;font-size:14px;}
  .dato .lbl{font-size:11px;color:#666;display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:1px;}
  .dato .val{font-size:15px;color:#111;font-weight:700;}
  .btn{display:block;background:#3498db;color:#fff!important;text-decoration:none;text-align:center;padding:13px;border-radius:6px;font-weight:700;font-size:15px;margin-top:16px;}
  .warn{background:#fff3cd;border:1px solid #ffc107;border-radius:6px;padding:12px;font-size:13px;color:#856404;margin-top:16px;}
  .ftr{background:#f8f9fa;padding:16px 28px;font-size:12px;color:#999;text-align:center;}
</style></head><body>
<div class="wrap">
  <div class="hdr">
    <h2>💰 Nuevo pago recibido</h2>
    <p>${new Date().toLocaleString('es-CL',{timeZone:'America/Santiago'})}</p>
  </div>
  <div class="body">
    <span class="tag">${esPersonalizado ? '👤 PERSONALIZADO' : '✅ AUTOGESTIONADO'}</span>

    <div class="row"><span class="lbl">Plan</span><span class="val">${opt.plan}</span></div>
    <div class="row"><span class="lbl">Cliente</span><span class="val">${opt.nombre || emailCliente.split('@')[0]}</span></div>
    <div class="row"><span class="lbl">Email</span><span class="val">${emailCliente}</span></div>
    <div class="row"><span class="lbl">Monto</span><span class="val">$${Number(estado.amount).toLocaleString('es-CL')} CLP</span></div>
    <div class="row"><span class="lbl">Orden Flow</span><span class="val">${estado.commerceOrder}</span></div>
    <div class="row"><span class="lbl">TrainHeroic</span><span class="val">${esPersonalizado ? '⚠️ Requiere gestión manual' : '✅ Código enviado automáticamente'}</span></div>

    <div class="boleta-box">
      <h3>🧾 Datos para Boleta de Honorarios — emitir en SII</h3>
      <div class="dato"><span class="lbl">RUT Receptor</span><span class="val">${rutCliente}</span></div>
      <div class="dato"><span class="lbl">Nombre Receptor</span><span class="val">${opt.nombre || emailCliente.split('@')[0]}</span></div>
      <div class="dato"><span class="lbl">Monto</span><span class="val">$${Number(estado.amount).toLocaleString('es-CL')} CLP</span></div>
      <div class="dato"><span class="lbl">Glosa (descripción)</span><span class="val">${glosaBoleta}</span></div>
      <a class="btn" href="https://www4.sii.cl/bolehicliII/index.html" target="_blank">👉 Ir a emitir boleta en SII</a>
    </div>

    ${esPersonalizado ? '<div class="warn">⚠️ <strong>Plan personalizado:</strong> Recuerda enviar manualmente el acceso a TrainHeroic a este atleta.</div>' : ''}
  </div>
  <div class="ftr">Máximo Esfuerzo · Sistema de pagos automático</div>
</div>
</body></html>`;

          if (env.RESEND_API_KEY) {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ from: emailDesdeAdmin, to: adminEmail, subject: `💰 Nuevo pago — ${opt.plan} | $${Number(estado.amount).toLocaleString('es-CL')} CLP`, html: htmlAdmin }),
            });
          }
        }

        return new Response('OK', { status: 200 });

      } catch(e) {
        console.error('Error en webhook pago:', e);
        return new Response('Error', { status: 500 });
      }
    }

    // ── POST /webhook-suscripcion ────────────────
    if (url.pathname === '/webhook-suscripcion' && request.method === 'POST') {
      try {
        const body   = await request.text();
        const params = Object.fromEntries(new URLSearchParams(body));

        const valido = await verificarWebhook(params, env.FLOW_SECRET_KEY);
        if (!valido) return new Response('Firma inválida', { status: 403 });

        const evento = params.event_name || params.status;

        // Pago mensual exitoso
        if (evento === 'subscription_payment_success' || params.status === '2') {
          await notificarEmail(env, {
            asunto: `✅ Pago suscripción recibido`,
            cuerpo: `
              Cliente: ${params.customer_name || params.customerId}
              Email: ${params.email || params.payer}
              Monto: $${params.amount} CLP
              Fecha: ${new Date().toLocaleDateString('es-CL')}
            `
          });
        }

        // Suscripción por vencer (Flow no lo envía automático — lo manejamos con cron)
        if (evento === 'subscription_cancel') {
          await notificarEmail(env, {
            asunto: `❌ Suscripción cancelada`,
            cuerpo: `El cliente ${params.email || params.customerId} canceló su suscripción.`
          });
        }

        return new Response('OK', { status: 200 });

      } catch(e) {
        return new Response('Error', { status: 500 });
      }
    }

    // ── POST /rucking/sync — atleta empuja sus sesiones al KV ──
    // stravaId puede ser un ID numérico de Strava o "uid:xxx" (Firebase UID)
    if (url.pathname === '/rucking/sync' && request.method === 'POST') {
      try {
        const { stravaId, sessions, nombre, k } = await request.json();
        if (k !== SYNC_KEY) {
          return Response.json({ ok: false, error: 'No autorizado' }, { status: 401, headers: corsHeaders() });
        }
        if (!stravaId || !Array.isArray(sessions)) {
          return Response.json({ ok: false, error: 'Datos inválidos' }, { status: 400, headers: corsHeaders() });
        }
        await env.RUCK_DATA.put(`ruck:${stravaId}`, JSON.stringify(sessions));
        if (nombre) {
          const hasStrava = !String(stravaId).startsWith('uid:');
          await env.RUCK_DATA.put(`atleta:${stravaId}`, JSON.stringify({
            stravaId,
            nombre,
            hasStrava,
            updatedAt: new Date().toISOString()
          }));
        }
        return Response.json({ ok: true, saved: sessions.length }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── GET /rucking/athlete — coach lee datos de un atleta ────
    if (url.pathname === '/rucking/athlete' && request.method === 'GET') {
      const secret   = url.searchParams.get('secret');
      const stravaId = url.searchParams.get('stravaId');
      if (secret !== COACH_SECRET) {
        return Response.json({ ok: false, error: 'No autorizado' }, { status: 401, headers: corsHeaders() });
      }
      if (!stravaId) {
        return Response.json({ ok: false, error: 'stravaId requerido' }, { status: 400, headers: corsHeaders() });
      }
      try {
        const raw = await env.RUCK_DATA.get(`ruck:${stravaId}`);
        const sessions = raw ? JSON.parse(raw) : [];
        return Response.json({ ok: true, sessions }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── GET /rucking/lista — lista atletas registrados (para autocompletar) ──
    if (url.pathname === '/rucking/lista' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) {
        return Response.json({ ok: false, error: 'No autorizado' }, { status: 401, headers: corsHeaders() });
      }
      try {
        // Lista todas las claves atleta:*
        const list = await env.RUCK_DATA.list({ prefix: 'atleta:' });
        const atletas = (await Promise.all(
          list.keys.map(async k => {
            const val = await env.RUCK_DATA.get(k.name);
            return val ? JSON.parse(val) : null;
          })
        )).filter(Boolean);
        // Dedupe: si una entrada uid:xxx tiene perfil con linkedStravaId que ya
        // figura como atleta propio, es la MISMA persona → omitir la ficha uid.
        const idsNumericos = new Set(atletas.map(a => String(a.stravaId)).filter(id => !id.startsWith('uid:')));
        const unicos = [];
        for (const a of atletas) {
          if (String(a.stravaId).startsWith('uid:')) {
            try {
              const pRaw = await env.RUCK_DATA.get(`profile:${a.stravaId}`);
              const linked = pRaw ? JSON.parse(pRaw).linkedStravaId : null;
              if (linked && idsNumericos.has(String(linked))) continue; // duplicado
            } catch(e) {}
          }
          unicos.push(a);
        }
        return Response.json({ ok: true, atletas: unicos }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── POST /rucking/save-profile — atleta guarda su perfil (SE, BM) ──
    // MERGE con el perfil existente: distintos dispositivos/módulos suben campos
    // distintos (stravaStats, bw/talla/fechaNac, se...) y no deben pisarse entre sí.
    if (url.pathname === '/rucking/save-profile' && request.method === 'POST') {
      try {
        const { stravaId, nombre, profile, replace, k } = await request.json();
        if (k !== SYNC_KEY) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!stravaId || !profile) return Response.json({ ok:false, error:'Datos inválidos' }, { status:400, headers:corsHeaders() });
        let base = {};
        if (!replace) {
          try { const prevRaw = await env.RUCK_DATA.get(`profile:${stravaId}`); if (prevRaw) base = JSON.parse(prevRaw); } catch(e) {}
        }
        await env.RUCK_DATA.put(`profile:${stravaId}`, JSON.stringify({ ...base, ...profile, updatedAt: new Date().toISOString() }));
        if (nombre) {
          const hasStrava = !String(stravaId).startsWith('uid:');
          await env.RUCK_DATA.put(`atleta:${stravaId}`, JSON.stringify({ stravaId, nombre, hasStrava, updatedAt: new Date().toISOString() }));
        }
        return Response.json({ ok:true }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── GET /rucking/get-profile — coach lee perfil de un atleta ──
    if (url.pathname === '/rucking/get-profile' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
      const stravaId = url.searchParams.get('stravaId');
      if (!stravaId) return Response.json({ ok:false, error:'stravaId requerido' }, { status:400, headers:corsHeaders() });
      try {
        const raw = await env.RUCK_DATA.get(`profile:${stravaId}`);
        return Response.json({ ok:true, profile: raw ? JSON.parse(raw) : null }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ══════════════════════════════════════════════════════════════
    // MÓDULO NUTRICIÓN — FatSecret 3-legged OAuth 1.0 (HMAC-SHA1)
    // El atleta conecta SU cuenta FatSecret (donde registra comida con
    // dato chileno y recibe el gasto diario de Garmin). Nosotros solo
    // LEEMOS su diario — nunca escribimos ni mantenemos base de alimentos.
    // Claves KV:  nutri:pending:<reqToken> → {uid, secret}  (TTL 10 min)
    //             nutri:token:<uid>        → {token, secret} (access token)
    // ══════════════════════════════════════════════════════════════
    const FS_REQUEST   = 'https://authentication.fatsecret.com/oauth/request_token';
    const FS_AUTHORIZE = 'https://authentication.fatsecret.com/oauth/authorize';
    const FS_ACCESS    = 'https://authentication.fatsecret.com/oauth/access_token';

    // ── POST /fatsecret/request — paso 1: request token → URL de autorización ──
    if (url.pathname === '/fatsecret/request' && request.method === 'POST') {
      try {
        const { uid, k } = await request.json();
        if (k !== SYNC_KEY) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!uid) return Response.json({ ok:false, error:'uid requerido' }, { status:400, headers:corsHeaders() });
        const callback = `${url.origin}/fatsecret/callback`;
        const signed = await fsOauthParams('GET', FS_REQUEST, { oauth_callback: callback }, env.FATSECRET_KEY, env.FATSECRET_SECRET, null, null);
        const res = await fetch(FS_REQUEST + '?' + fsQuery(signed));
        const txt = await res.text();
        const p = Object.fromEntries(new URLSearchParams(txt));
        if (!p.oauth_token) return Response.json({ ok:false, error:'FatSecret no devolvió request token', detalle: txt.slice(0,200) }, { status:502, headers:corsHeaders() });
        // Asociar el request token al atleta (para reconocerlo en el callback)
        await env.RUCK_DATA.put(`nutri:pending:${p.oauth_token}`, JSON.stringify({ uid, secret: p.oauth_token_secret }), { expirationTtl: 600 });
        return Response.json({ ok:true, authUrl: `${FS_AUTHORIZE}?oauth_token=${encodeURIComponent(p.oauth_token)}` }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── GET /fatsecret/callback — paso 3: el atleta aprobó → access token ──
    if (url.pathname === '/fatsecret/callback' && request.method === 'GET') {
      const reqToken = url.searchParams.get('oauth_token');
      const verifier = url.searchParams.get('oauth_verifier');
      const appBack = 'https://maximoesfuerzo.cl/?fatsecret=';
      try {
        if (!reqToken || !verifier) return Response.redirect(appBack + 'error', 302);
        const pendRaw = await env.RUCK_DATA.get(`nutri:pending:${reqToken}`);
        if (!pendRaw) return Response.redirect(appBack + 'expired', 302);
        const pend = JSON.parse(pendRaw);
        const signed = await fsOauthParams('GET', FS_ACCESS, { oauth_token: reqToken, oauth_verifier: verifier }, env.FATSECRET_KEY, env.FATSECRET_SECRET, reqToken, pend.secret);
        const res = await fetch(FS_ACCESS + '?' + fsQuery(signed));
        const txt = await res.text();
        const p = Object.fromEntries(new URLSearchParams(txt));
        if (!p.oauth_token || !p.oauth_token_secret) return Response.redirect(appBack + 'error', 302);
        await env.RUCK_DATA.put(`nutri:token:${pend.uid}`, JSON.stringify({ token: p.oauth_token, secret: p.oauth_token_secret, connectedAt: new Date().toISOString() }));
        await env.RUCK_DATA.delete(`nutri:pending:${reqToken}`);
        return Response.redirect(appBack + 'ok', 302);
      } catch(e) {
        return Response.redirect(appBack + 'error', 302);
      }
    }

    // ── POST /fatsecret/data — resumen mensual: kcal+macros ingeridos y gasto del día ──
    // date = días desde epoch (opcional, default hoy). get_month trae todo el mes de esa fecha.
    if (url.pathname === '/fatsecret/data' && request.method === 'POST') {
      try {
        const { uid, k, date } = await request.json();
        if (k !== SYNC_KEY) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!uid) return Response.json({ ok:false, error:'uid requerido' }, { status:400, headers:corsHeaders() });
        const tokRaw = await env.RUCK_DATA.get(`nutri:token:${uid}`);
        if (!tokRaw) return Response.json({ ok:true, connected:false }, { headers:corsHeaders() });
        const tok = JSON.parse(tokRaw);
        const dayInt = (typeof date === 'number') ? date : Math.floor(Date.now() / 86400000);
        const food = await fsApiCall('food_entries.get_month', { date: String(dayInt) }, env, tok);
        const exer = await fsApiCall('exercise_entries.get_month', { date: String(dayInt) }, env, tok);
        return Response.json({ ok:true, connected:true, food, exercise: exer }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /fatsecret/day — detalle por comida de un día específico ──
    if (url.pathname === '/fatsecret/day' && request.method === 'POST') {
      try {
        const { uid, k, date } = await request.json();
        if (k !== SYNC_KEY) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!uid || typeof date !== 'number') return Response.json({ ok:false, error:'uid y date requeridos' }, { status:400, headers:corsHeaders() });
        const tokRaw = await env.RUCK_DATA.get(`nutri:token:${uid}`);
        if (!tokRaw) return Response.json({ ok:true, connected:false }, { headers:corsHeaders() });
        const tok = JSON.parse(tokRaw);
        const entries = await fsApiCall('food_entries.get', { date: String(date) }, env, tok);
        return Response.json({ ok:true, connected:true, entries }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── GET /fatsecret/status — ¿el atleta tiene FatSecret conectado? (atleta o coach) ──
    if (url.pathname === '/fatsecret/status' && request.method === 'GET') {
      const uid = url.searchParams.get('uid');
      if (!uid) return Response.json({ ok:false, error:'uid requerido' }, { status:400, headers:corsHeaders() });
      const tokRaw = await env.RUCK_DATA.get(`nutri:token:${uid}`);
      return Response.json({ ok:true, connected: !!tokRaw }, { headers:corsHeaders() });
    }

    // ── POST /fatsecret/disconnect — el atleta desvincula su cuenta ──
    if (url.pathname === '/fatsecret/disconnect' && request.method === 'POST') {
      try {
        const { uid, k } = await request.json();
        if (k !== SYNC_KEY) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!uid) return Response.json({ ok:false, error:'uid requerido' }, { status:400, headers:corsHeaders() });
        await env.RUCK_DATA.delete(`nutri:token:${uid}`);
        return Response.json({ ok:true }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── GET /nutri/config — config de macros (% y ajuste kcal) que fija el coach ──
    // Distribución por porcentaje sobre las calorías objetivo. Default 15/25/60.
    if (url.pathname === '/nutri/config' && request.method === 'GET') {
      if (url.searchParams.get('k') !== SYNC_KEY) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
      try {
        const uid = url.searchParams.get('uid');
        if (uid) {
          // Resolución: por defecto → grupo del atleta → override individual
          const cfg = await _nutriCfgEfectiva(env, uid);
          let override = false;
          try { override = !!(await env.RUCK_DATA.get(`nutri:config:${uid}`)); } catch(e) {}
          return Response.json({ ok:true, config: cfg, override }, { headers:corsHeaders() });
        }
        const raw = await env.RUCK_DATA.get('nutri:config');
        const cfg = raw ? JSON.parse(raw) : { pctGrasa:15, pctProt:25, pctCarb:60, ajusteKcal:0 };
        return Response.json({ ok:true, config: cfg, override:false }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── GET /nutri/config-grupo — config de un grupo (coach, para prellenar) ──
    if (url.pathname === '/nutri/config-grupo' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
      const gid = url.searchParams.get('gid');
      if (!gid) return Response.json({ ok:false, error:'gid requerido' }, { status:400, headers:corsHeaders() });
      try {
        const raw = await env.RUCK_DATA.get(`nutri:config:grupo:${gid}`);
        return Response.json({ ok:true, config: raw ? JSON.parse(raw) : null }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /nutri/config-grupo — dieta de un grupo (coach) ──
    if (url.pathname === '/nutri/config-grupo' && request.method === 'POST') {
      try {
        const { secret, gid, config } = await request.json();
        if (secret !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!gid) return Response.json({ ok:false, error:'gid requerido' }, { status:400, headers:corsHeaders() });
        const c = {};
        if (config && config.ajusteKcal !== undefined && config.ajusteKcal !== null && config.ajusteKcal !== '') c.ajusteKcal = Number(config.ajusteKcal);
        if (config && config.pctProt)  c.pctProt  = Number(config.pctProt);
        if (config && config.pctCarb)  c.pctCarb  = Number(config.pctCarb);
        if (config && config.pctGrasa) c.pctGrasa = Number(config.pctGrasa);
        if (!Object.keys(c).length) await env.RUCK_DATA.delete(`nutri:config:grupo:${gid}`);
        else await env.RUCK_DATA.put(`nutri:config:grupo:${gid}`, JSON.stringify({ ...c, updatedAt: new Date().toISOString() }));
        return Response.json({ ok:true }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /nutri/membresia — el coach sincroniza a qué grupos pertenece un atleta ──
    if (url.pathname === '/nutri/membresia' && request.method === 'POST') {
      try {
        const { secret, uid, grupos } = await request.json();
        if (secret !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!uid) return Response.json({ ok:false, error:'uid requerido' }, { status:400, headers:corsHeaders() });
        if (Array.isArray(grupos) && grupos.length) await env.RUCK_DATA.put(`nutri:member:${uid}`, JSON.stringify(grupos));
        else await env.RUCK_DATA.delete(`nutri:member:${uid}`);
        return Response.json({ ok:true }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /nutri/config-atleta — meta individual de un atleta (coach) ──
    // Guarda override sobre la config global. Vacío = vuelve a heredar la global.
    if (url.pathname === '/nutri/config-atleta' && request.method === 'POST') {
      try {
        const { secret, uid, config } = await request.json();
        if (secret !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!uid) return Response.json({ ok:false, error:'uid requerido' }, { status:400, headers:corsHeaders() });
        const ov = {};
        if (config && config.ajusteKcal !== undefined && config.ajusteKcal !== null && config.ajusteKcal !== '') ov.ajusteKcal = Number(config.ajusteKcal);
        if (config && config.pctProt)  ov.pctProt  = Number(config.pctProt);
        if (config && config.pctCarb)  ov.pctCarb  = Number(config.pctCarb);
        if (config && config.pctGrasa) ov.pctGrasa = Number(config.pctGrasa);
        if (!Object.keys(ov).length) await env.RUCK_DATA.delete(`nutri:config:${uid}`);
        else await env.RUCK_DATA.put(`nutri:config:${uid}`, JSON.stringify({ ...ov, updatedAt: new Date().toISOString() }));
        return Response.json({ ok:true }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /nutri/config — el coach guarda la config de macros ──
    if (url.pathname === '/nutri/config' && request.method === 'POST') {
      try {
        const { secret, config } = await request.json();
        if (secret !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!config) return Response.json({ ok:false, error:'config requerida' }, { status:400, headers:corsHeaders() });
        await env.RUCK_DATA.put('nutri:config', JSON.stringify({
          pctGrasa: Number(config.pctGrasa), pctProt: Number(config.pctProt),
          pctCarb: Number(config.pctCarb), ajusteKcal: Number(config.ajusteKcal) || 0,
          updatedAt: new Date().toISOString()
        }));
        return Response.json({ ok:true }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── GET /nutri/coach-resumen — resumen nutricional de atletas conectados (coach) ──
    if (url.pathname === '/nutri/coach-resumen' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
      try {
        let cfg = { pctGrasa:15, pctProt:25, pctCarb:60, ajusteKcal:0 };
        try { const r = await env.RUCK_DATA.get('nutri:config'); if (r) cfg = JSON.parse(r); } catch(e) {}
        // Mapa uid → nombre (desde usuarios registrados)
        const nombres = {};
        try {
          const lu = await env.RUCK_DATA.list({ prefix: 'usuario:' });
          await Promise.all(lu.keys.map(async k => {
            const v = await env.RUCK_DATA.get(k.name); if (!v) return;
            const u = JSON.parse(v); if (u.uid) nombres[u.uid] = u.nombre || (u.email || '').split('@')[0];
          }));
        } catch(e) {}
        const lt = await env.RUCK_DATA.list({ prefix: 'nutri:token:' });
        const hoy = Math.floor(Date.now() / 86400000);
        const atletas = [];
        for (const k of lt.keys) {
          const uid = k.name.replace('nutri:token:', '');
          let tok; try { tok = JSON.parse(await env.RUCK_DATA.get(k.name)); } catch(e) { continue; }
          // Config efectiva: por defecto → grupo → override individual
          const cfgA = await _nutriCfgEfectiva(env, uid);
          const food = await fsApiCall('food_entries.get_month', { date: String(hoy) }, env, tok);
          const exer = await fsApiCall('exercise_entries.get_month', { date: String(hoy) }, env, tok);
          const fd = _nutriDays(food), ed = _nutriDays(exer);
          let sumK = 0, sumP = 0, n = 0, bal = 0, sumObjK = 0, sumObjP = 0, nGasto = 0;
          for (let d = hoy - 6; d <= hoy; d++) {
            const f = fd.find(x => Number(x.date_int) === d);
            const e = ed.find(x => Number(x.date_int) === d);
            const ing = f ? Number(f.calories) || 0 : 0;
            const gas = e ? Number(e.calories) || 0 : 0;
            if (f) { sumK += ing; sumP += Number(f.protein) || 0; n++; }
            if (f || e) bal += ing - gas;
            if (gas) { const ok = gas + (Number(cfgA.ajusteKcal) || 0); sumObjK += ok; sumObjP += ok * (Number(cfgA.pctProt) || 25) / 100 / 4; nGasto++; }
          }
          const kcalProm = n ? Math.round(sumK / n) : 0;
          const protProm = n ? Math.round(sumP / n) : 0;
          const protPct  = sumObjP > 0 ? Math.round(sumP / sumObjP * 100) : null;
          const objKProm = nGasto ? Math.round(sumObjK / nGasto) : null;
          let estado = 'gris';
          if (n > 0) {
            const desvK = objKProm ? Math.abs(kcalProm - objKProm) / objKProm : 1;
            if (protPct !== null && protPct >= 90 && desvK <= 0.12) estado = 'verde';
            else if ((protPct === null || protPct >= 70) && desvK <= 0.25) estado = 'ambar';
            else estado = 'rojo';
          }
          atletas.push({ uid, nombre: nombres[uid] || ('Atleta ' + uid.slice(0, 4)), kcalProm, protProm, protPct, balSemana: Math.round(bal), dias: n, estado, ajusteKcal: Number(cfgA.ajusteKcal) || 0 });
        }
        atletas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        return Response.json({ ok:true, atletas }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ══════════════════════════════════════════════════════════════
    // MÓDULO ENTRENAMIENTO (Biblioteca de Ejercicios + Planes)
    // Claves KV:  train:lib            → biblioteca global del coach
    //             train:plan:<atletaId> → sesiones programadas por atleta
    //             (atletaId = "uid:<firebaseUid>", igual que rucking)
    // ══════════════════════════════════════════════════════════════

    // ── GET /train/library — biblioteca de ejercicios (coach) ──
    if (url.pathname === '/train/library' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
      try {
        const raw = await env.RUCK_DATA.get('train:lib');
        return Response.json({ ok:true, exercises: raw ? JSON.parse(raw).exercises : [] }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /train/library — guarda la biblioteca completa (coach es único editor) ──
    if (url.pathname === '/train/library' && request.method === 'POST') {
      try {
        const { secret, exercises } = await request.json();
        if (secret !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!Array.isArray(exercises)) return Response.json({ ok:false, error:'exercises debe ser un array' }, { status:400, headers:corsHeaders() });
        await env.RUCK_DATA.put('train:lib', JSON.stringify({ exercises, updatedAt: new Date().toISOString() }));
        return Response.json({ ok:true, total: exercises.length }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── GET /train/plan — sesiones programadas de un atleta (coach) ──
    if (url.pathname === '/train/plan' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
      const atleta = url.searchParams.get('atleta');
      if (!atleta) return Response.json({ ok:false, error:'atleta requerido' }, { status:400, headers:corsHeaders() });
      try {
        const raw = await env.RUCK_DATA.get(`train:plan:${atleta}`);
        return Response.json({ ok:true, sessions: raw ? JSON.parse(raw).sessions : [] }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /train/plan — asigna/actualiza una sesión a uno o más atletas (fan-out) ──
    if (url.pathname === '/train/plan' && request.method === 'POST') {
      try {
        const { secret, atletas, session } = await request.json();
        if (secret !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!Array.isArray(atletas) || !atletas.length || !session || !session.id || !session.fecha) {
          return Response.json({ ok:false, error:'Faltan atletas o session {id, fecha}' }, { status:400, headers:corsHeaders() });
        }
        const guardados = [];
        for (const atletaId of atletas) {
          const key = `train:plan:${atletaId}`;
          const raw = await env.RUCK_DATA.get(key);
          const plan = raw ? JSON.parse(raw) : { sessions: [] };
          // Upsert por id: si la sesión ya existe se reemplaza (edición)
          plan.sessions = plan.sessions.filter(s => s.id !== session.id);
          plan.sessions.push({ ...session, updatedAt: new Date().toISOString() });
          plan.sessions.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
          await env.RUCK_DATA.put(key, JSON.stringify(plan));
          guardados.push(atletaId);
        }
        return Response.json({ ok:true, guardados }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /train/plan-delete — elimina una sesión del plan de un atleta ──
    if (url.pathname === '/train/plan-delete' && request.method === 'POST') {
      try {
        const { secret, atleta, sessionId } = await request.json();
        if (secret !== COACH_SECRET) return Response.json({ ok:false, error:'No autorizado' }, { status:401, headers:corsHeaders() });
        if (!atleta || !sessionId) return Response.json({ ok:false, error:'Faltan atleta o sessionId' }, { status:400, headers:corsHeaders() });
        const key = `train:plan:${atleta}`;
        const raw = await env.RUCK_DATA.get(key);
        if (raw) {
          const plan = JSON.parse(raw);
          plan.sessions = plan.sessions.filter(s => s.id !== sessionId);
          await env.RUCK_DATA.put(key, JSON.stringify(plan));
        }
        return Response.json({ ok:true }, { headers:corsHeaders() });
      } catch(e) { return Response.json({ ok:false, error:e.message }, { status:500, headers:corsHeaders() }); }
    }

    // ── POST /registrar-usuario — guarda usuario que se registró con Google ──
    if (url.pathname === '/registrar-usuario' && request.method === 'POST') {
      try {
        const { email, nombre, uid, photoURL } = await request.json();
        if (!email) return Response.json({ ok: false, error: 'Email requerido' }, { headers: corsHeaders() });
        // Guardar SIEMPRE el registro usuario:<email> (antes se omitía para
        // atletas pagados y el coach no podía resolver email→uid). Se marca
        // el tipo según si tiene plan, preservando datos previos.
        const yaEsAtleta = await env.RUCK_DATA.get(`plan-atleta:${email}`);
        let prev = {};
        try { const prevRaw = await env.RUCK_DATA.get(`usuario:${email}`); if (prevRaw) prev = JSON.parse(prevRaw); } catch(e) {}
        const data = {
          ...prev,
          email, nombre: nombre || prev.nombre || email.split('@')[0],
          uid: uid || prev.uid || null, photoURL: photoURL || prev.photoURL || null,
          tipo: yaEsAtleta ? 'atleta' : (prev.tipo || 'registro'),
          fechaRegistro: prev.fechaRegistro || new Date().toISOString()
        };
        await env.RUCK_DATA.put(`usuario:${email}`, JSON.stringify(data));
        return Response.json({ ok: true }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { headers: corsHeaders() });
      }
    }

    // ── GET /usuario-uid — devuelve UID de Firebase para un email ──
    if (url.pathname === '/usuario-uid' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) {
        return Response.json({ ok: false, error: 'No autorizado' }, { status: 401, headers: corsHeaders() });
      }
      try {
        const email = url.searchParams.get('email')?.toLowerCase().trim();
        if (!email) return Response.json({ ok: false, error: 'Email requerido' }, { headers: corsHeaders() });
        const raw = await env.RUCK_DATA.get(`usuario:${email}`);
        if (!raw) return Response.json({ ok: false, error: 'No encontrado' }, { headers: corsHeaders() });
        const u = JSON.parse(raw);
        return Response.json({ ok: true, uid: u.uid, nombre: u.nombre }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── GET /usuarios-registrados — coach consulta usuarios sin plan ──
    if (url.pathname === '/usuarios-registrados' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) {
        return Response.json({ ok: false, error: 'No autorizado' }, { status: 401, headers: corsHeaders() });
      }
      try {
        const list = await env.RUCK_DATA.list({ prefix: 'usuario:' });
        const usuarios = await Promise.all(
          list.keys.map(async k => {
            const val = await env.RUCK_DATA.get(k.name);
            return val ? JSON.parse(val) : null;
          })
        );
        return Response.json({ ok: true, usuarios: usuarios.filter(Boolean) }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── GET /plan-atletas — coach consulta atletas que han pagado ──
    if (url.pathname === '/plan-atletas' && request.method === 'GET') {
      if (url.searchParams.get('secret') !== COACH_SECRET) {
        return Response.json({ ok: false, error: 'No autorizado' }, { status: 401, headers: corsHeaders() });
      }
      try {
        const list = await env.RUCK_DATA.list({ prefix: 'plan-atleta:' });
        const atletas = await Promise.all(
          list.keys.map(async k => {
            const val = await env.RUCK_DATA.get(k.name);
            return val ? JSON.parse(val) : null;
          })
        );
        return Response.json({ ok: true, atletas: atletas.filter(Boolean) }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── GET /test-sii — verifica credenciales SII sin emitir boleta ──
    if (url.pathname === '/test-sii' && request.method === 'GET') {
      const key = url.searchParams.get('key');
      if (key !== (env.COACH_SECRET || 'ME2026coach')) {
        return new Response('No autorizado', { status: 401 });
      }
      try {
        if (!env.SII_RUT || !env.SII_CLAVE) {
          return new Response('❌ Faltan secrets: SII_RUT y/o SII_CLAVE no configurados', { status: 400 });
        }
        const [rutNum, dv] = env.SII_RUT.split('-');
        // Solo hacer login (sin emitir nada) para verificar credenciales
        const loginBody = new URLSearchParams({
          rutcntr: rutNum,
          dv:      dv.toUpperCase(),
          clave:   env.SII_CLAVE,
          referrer: 'https://www4.sii.cl/bolehicliII/',
        });
        const resLogin = await fetch('https://hercules.sii.cl/cgi_AUT2000/autInicio.cgi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://www.sii.cl/',
          },
          body: loginBody.toString(),
          redirect: 'manual',
        });
        const setCookie = resLogin.headers.get('set-cookie') || '';
        const cookies = setCookie.split(',').map(c=>c.split(';')[0].trim()).filter(c=>c.includes('=')).join('; ');
        const bodyLogin = await resLogin.text();
        if (!cookies) {
          return Response.json({ ok: false, paso: 'login', status: resLogin.status, respuesta: bodyLogin.slice(0, 400) });
        }
        return Response.json({ ok: true, mensaje: '✅ Login SII exitoso. Credenciales válidas.', rut: env.SII_RUT, cookiesObtenidas: cookies.length > 0 });
      } catch(e) {
        return Response.json({ ok: false, error: e.message });
      }
    }

    // ── GET /test-email — prueba envío de email sin pago real ──
    if (url.pathname === '/test-email' && request.method === 'GET') {
      const key = url.searchParams.get('key');
      if (key !== (env.COACH_SECRET || 'ME2026coach')) {
        return new Response('No autorizado', { status: 401 });
      }
      try {
        await enviarEmailTrainHeroic(env, {
          email: env.NOTIFY_EMAIL || 'maximoesfuerzo91@gmail.com',
          codigo: 'TEST-2026-PRUEBA',
          plan: 'Plan de Prueba · Intermedio',
          nombre: 'Jaime (test)'
        });
        await notificarAdminEmail(env, {
          asunto: '🧪 Test email enviado correctamente',
          cuerpo: 'El sistema de emails funciona. Este es un test.'
        });
        return new Response('✅ Emails de prueba enviados. Revisa tu correo.', { status: 200 });
      } catch(e) {
        return new Response('❌ Error: ' + e.message, { status: 500 });
      }
    }

    // ── GET /mi-plan — atleta consulta su plan activo ─────────────
    if (url.pathname === '/mi-plan' && request.method === 'GET') {
      const email = url.searchParams.get('email');
      if (!email) return Response.json({ ok: false, error: 'Falta email' }, { status: 400, headers: corsHeaders() });
      try {
        const key = `plan-atleta:${email.toLowerCase()}`;
        const val = await env.RUCK_DATA.get(key);
        if (!val) return Response.json({ ok: true, plan: null }, { headers: corsHeaders() });
        const datos = JSON.parse(val);
        const hoy = new Date();
        const fv = datos.fechaVencimiento ? new Date(datos.fechaVencimiento) : null;
        const dias = fv ? Math.ceil((fv - hoy) / 86400000) : null;
        return Response.json({
          ok: true,
          plan: {
            nombre: datos.plan,
            vencimiento: datos.fechaVencimiento ? datos.fechaVencimiento.split('T')[0] : null,
            diasRestantes: dias,
            activo: !fv || dias > 0,
            subscriptionId: datos.subscriptionId || null,
            pagos: datos.pagos || [],
          }
        }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── POST /cancelar-plan — atleta solicita cancelación ─────────
    if (url.pathname === '/cancelar-plan' && request.method === 'POST') {
      try {
        const { email, nombre, motivo } = await request.json();
        if (!email) return Response.json({ ok: false, error: 'Falta email' }, { status: 400, headers: corsHeaders() });
        // Notificar al coach por email
        await notificarAdminEmail(env, {
          asunto: `⚠️ Solicitud de cancelación — ${nombre || email}`,
          cuerpo: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;">
<div style="max-width:560px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  <div style="background:#c0392b;color:#fff;padding:20px 24px;">
    <h2 style="margin:0;">⚠️ Solicitud de cancelación</h2>
  </div>
  <div style="padding:24px;">
    <p style="margin:0 0 12px;"><strong>Atleta:</strong> ${nombre || '(sin nombre)'}</p>
    <p style="margin:0 0 12px;"><strong>Email:</strong> ${email}</p>
    <p style="margin:0 0 12px;"><strong>Motivo:</strong> ${motivo || '(no especificado)'}</p>
    <hr style="margin:20px 0;border:none;border-top:1px solid #eee;">
    <p style="color:#666;font-size:13px;">El atleta ha solicitado cancelar su plan desde la plataforma. Ingresa a Flow para cancelar la suscripción manualmente si corresponde.</p>
  </div>
</div></body></html>`,
          esHtml: true,
        });
        return Response.json({ ok: true, mensaje: 'Solicitud enviada. El coach se contactará contigo pronto.' }, { headers: corsHeaders() });
      } catch(e) {
        return Response.json({ ok: false, error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── CRON: notificar planes por vencer ────────
    // (configurar en wrangler.toml como cron trigger)
    return new Response('Flow Worker activo', { status: 200 });
  },
};

// ══════════════════════════════════════════════
//  FUNCIONES DE EMAIL Y CÓDIGOS
// ══════════════════════════════════════════════

// ── Helper: crear pago único en Flow ─────────
async function crearPagoUnico({ plan, monto, email, nombre, tipoPago }, env) {
  const comercioOrden = `ME-${Date.now()}`;
  const datos = {
    commerceOrder:   comercioOrden,
    subject:         `Plan ${plan} - Máximo Esfuerzo`,
    currency:        'CLP',
    amount:          String(monto),
    email:           email,
    urlConfirmation: 'https://flow-payments.jaimea-gomezh.workers.dev/webhook-pago',
    urlReturn:       'https://maximi-esfuerzo.pages.dev?pago=ok',
    optional:        JSON.stringify({ plan, nombre, tipoPago }),
  };
  const resp = await llamarFlow('/payment/create', datos, env);
  if (resp.url && resp.token) {
    return Response.json({ ok: true, url: `${resp.url}?token=${resp.token}`, tipo: 'pago-unico' }, { headers: corsHeaders() });
  }
  return Response.json({ ok: false, error: resp }, { headers: corsHeaders() });
}

// ── Calcular fecha de vencimiento según tipo de suscripción ──
function calcularVencimiento(tipoSuscripcion, fechaCompra) {
  const fecha = new Date(fechaCompra);
  if (tipoSuscripcion === 'suscripcion-3m' || tipoSuscripcion === 'mensual') {
    fecha.setMonth(fecha.getMonth() + 3);
  } else if (tipoSuscripcion === 'pago-unico' || tipoSuscripcion === 'unico') {
    fecha.setMonth(fecha.getMonth() + 1);
  } else if (tipoSuscripcion === 'personalizado') {
    return null; // indefinido — el coach decide
  } else {
    fecha.setMonth(fecha.getMonth() + 1); // fallback: 1 mes
  }
  return fecha.toISOString();
}

// ── Mapear plan al código de TrainHeroic ─────
function obtenerCodigoTrainHeroic(plan, env) {
  // Parsear los códigos del secret (formato: JSON con plan → código)
  // Variable de entorno: CODIGOS_TRAINHEROIC
  // Ej: {"ESTABIL|BAS|1":"EST-BAS-2026", "ACOND|BAS|1":"ACO-BAS-2026", ...}
  try {
    const codigosJson = env.CODIGOS_TRAINHEROIC || '{}';
    const codigos = typeof codigosJson === 'string' ? JSON.parse(codigosJson) : codigosJson;

    // Normalizar nombre del plan (remover espacios, minúsculas para búsqueda)
    const planNormalizado = plan.toLowerCase().replace(/\s+/g, '');

    // Buscar coincidencia: puede ser clave exacta o parcial
    for (const [clave, codigo] of Object.entries(codigos)) {
      const claveNormalizada = clave.toLowerCase().replace(/\s+/g, '');
      if (planNormalizado.includes(claveNormalizada) || claveNormalizada.includes(planNormalizado)) {
        return codigo;
      }
    }

    // Si no hay coincidencia exacta, devolver el primer código disponible como fallback
    const codigosArr = Object.values(codigos);
    return codigosArr.length > 0 ? codigosArr[0] : null;
  } catch (e) {
    console.error('Error parseando códigos:', e);
    return null;
  }
}

// ── Enviar email al cliente con código ───────
async function enviarEmailTrainHeroic(env, { email, codigo, plan, nombre, folioBoleta }) {
  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY no configurada');
    return;
  }

  const emailDesde = env.EMAIL_FROM || 'noreply@maximoesfuerzo.cl';
  const asunto = `🏋️ Tu código de TrainHeroic — ${plan}`;

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Barlow', Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #C9630A 0%, #8B4513 100%); color: white; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .body { padding: 40px 20px; }
        .plan { font-size: 16px; font-weight: 600; color: #333; margin: 20px 0; }
        .code-box { background: #f9f9f9; border: 2px solid #C9630A; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
        .code-box .codigo { font-family: 'Courier New', monospace; font-size: 24px; font-weight: 700; color: #C9630A; letter-spacing: 2px; }
        .instructions { background: #f0f0f0; padding: 20px; border-radius: 4px; margin: 20px 0; font-size: 14px; color: #555; }
        .instructions ol { margin: 10px 0; padding-left: 20px; }
        .instructions li { margin: 8px 0; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0; }
        .footer a { color: #C9630A; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏋️ MÁXIMO ESFUERZO</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px;">Tu plan está activo</p>
        </div>
        <div class="body">
          <p style="margin: 0 0 20px 0; color: #555;">¡Hola ${nombre || 'atleta'}!</p>
          <p style="color: #555; line-height: 1.6;">
            Tu pago fue procesado exitosamente. 🎉<br>
            A continuación encontrarás tu código de acceso a TrainHeroic para el plan que adquiriste.
          </p>

          <div class="plan">
            Plan adquirido: <strong>${plan}</strong>
          </div>

          <div class="code-box">
            <p style="margin: 0 0 15px 0; color: #999; font-size: 14px;">Tu código de TrainHeroic:</p>
            <div class="codigo">${codigo}</div>
          </div>

          <div class="instructions">
            <strong>📌 Instrucciones:</strong>
            <ol>
              <li>Dirígete a <strong>TrainHeroic</strong></li>
              <li>Ingresa tu email: <strong>${email}</strong></li>
              <li>Usa el código anterior para activar tu plan</li>
              <li>¡Listo! Comienza tu entrenamiento</li>
            </ol>
          </div>

          ${folioBoleta ? `
          <div style="background:#f0fff4;border:1px solid #68d391;border-radius:6px;padding:14px;margin:20px 0;font-size:13px;color:#276749;">
            🧾 <strong>Boleta de honorarios emitida</strong> — Folio N° ${folioBoleta}<br>
            <span style="color:#555;">Disponible en tu portal del SII con tu RUT.</span>
          </div>` : ''}

          <p style="color: #999; font-size: 13px; margin-top: 30px;">
            Si tienes preguntas, responde este email o contáctanos a través de nuestro sitio.
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0;">© 2026 Máximo Esfuerzo — Plataforma de rendimiento deportivo</p>
          <p style="margin: 8px 0 0 0;">
            <a href="https://maximi-esfuerzo.pages.dev">maximi-esfuerzo.pages.dev</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailDesde,
        to: email,
        subject: asunto,
        html: html,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Email enviado a', email, '—', data.id);
    } else {
      const err = await res.text();
      console.error('Error enviando email:', err);
    }
  } catch (e) {
    console.error('Error en enviarEmailTrainHeroic:', e);
  }
}

// ── Notificar a admin (Jaime) ────────────────
async function notificarAdminEmail(env, { asunto, cuerpo, esHtml = false }) {
  const adminEmail = env.NOTIFY_EMAIL || 'maximoesfuerzo91@gmail.com';
  const emailDesde = env.EMAIL_FROM || 'onboarding@resend.dev';

  if (!env.RESEND_API_KEY) {
    console.log('Notificación (sin Resend):', asunto, cuerpo);
    return;
  }

  try {
    const body = esHtml
      ? { from: emailDesde, to: adminEmail, subject: asunto, html: cuerpo }
      : { from: emailDesde, to: adminEmail, subject: asunto, text: cuerpo };

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      console.log('Admin notificado:', asunto);
    } else {
      console.error('Error notificando admin:', await res.text());
    }
  } catch (e) {
    console.error('Error en notificarAdminEmail:', e);
  }
}

// ── Enviar email de notificación (LEGACY) ────
async function notificarEmail(env, { asunto, cuerpo }) {
  await notificarAdminEmail(env, { asunto, cuerpo });
}

// ── CRON: notificar vencimientos próximos al coach ─────────────
async function notificarVencimientosProximos(env) {
  try {
    const list = await env.RUCK_DATA.list({ prefix: 'plan-atleta:' });
    const hoy = new Date();
    const alertas7  = [];
    const alertas3  = [];
    const vencidos  = [];

    for (const k of list.keys) {
      const val = await env.RUCK_DATA.get(k.name);
      if (!val) continue;
      const a = JSON.parse(val);
      if (!a.fechaVencimiento) continue;
      const fv   = new Date(a.fechaVencimiento);
      const dias = Math.ceil((fv - hoy) / 86400000);
      if (dias === 7)  alertas7.push(a);
      if (dias === 3)  alertas3.push(a);
      if (dias === 0)  vencidos.push(a);
    }

    const total = alertas7.length + alertas3.length + vencidos.length;
    if (total === 0) return; // nada que notificar hoy

    const filas = (arr, label) => arr.map(a =>
      `<tr><td style="padding:8px 12px;">${a.nombre}</td><td style="padding:8px 12px;">${a.email}</td><td style="padding:8px 12px;">${a.plan}</td><td style="padding:8px 12px;font-weight:700;color:${label==='HOY'?'#e74c3c':label==='3d'?'#e67e22':'#f39c12'};">${label}</td></tr>`
    ).join('');

    const htmlCron = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;">
<div style="max-width:600px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  <div style="background:#1a1a2e;color:#fff;padding:20px 24px;">
    <h2 style="margin:0;">⏰ Planes próximos a vencer</h2>
    <p style="margin:6px 0 0;color:#aaa;font-size:13px;">${hoy.toLocaleDateString('es-CL')}</p>
  </div>
  <div style="padding:24px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead><tr style="background:#f0f0f0;">
        <th style="padding:8px 12px;text-align:left;">Atleta</th>
        <th style="padding:8px 12px;text-align:left;">Email</th>
        <th style="padding:8px 12px;text-align:left;">Plan</th>
        <th style="padding:8px 12px;text-align:left;">Vence</th>
      </tr></thead>
      <tbody>
        ${filas(vencidos,'HOY')}
        ${filas(alertas3,'3d')}
        ${filas(alertas7,'7d')}
      </tbody>
    </table>
  </div>
</div></body></html>`;

    await notificarAdminEmail(env, {
      asunto: `⏰ ${total} plan${total>1?'es':''} por vencer — Máximo Esfuerzo`,
      cuerpo: htmlCron,
      esHtml: true,
    });
  } catch(e) {
    console.error('Error en cron vencimientos:', e);
  }
}

// ── BOLETA DE HONORARIOS ELECTRÓNICA — SII ───────────────────
// Sistema BHE para personas naturales 2ª categoría
// Requiere Secrets: SII_RUT (ej: "12345678-K"), SII_CLAVE (clave tributaria)
async function emitirBoleta(env, { rutEmisor, claveEmisor, rutReceptor, monto, descripcion, nombre, email }) {
  if (!rutEmisor || !claveEmisor) {
    throw new Error('Credenciales SII no configuradas (SII_RUT / SII_CLAVE)');
  }

  const [rutNum, dvEmisor] = rutEmisor.split('-');
  const [rutRecNum, dvRec] = rutReceptor.split('-');

  // ── Paso 1: Login al SII (sistema BHE usa autenticación por portal) ─
  const loginBody = new URLSearchParams({
    rutcntr: rutNum,
    dv:      dvEmisor.toUpperCase(),
    clave:   claveEmisor,
    referrer: 'https://www4.sii.cl/bolehicliII/',
  });

  const resLogin = await fetch('https://hercules.sii.cl/cgi_AUT2000/autInicio.cgi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://www.sii.cl/',
    },
    body: loginBody.toString(),
    redirect: 'manual',
  });

  // Extraer cookies de sesión
  const setCookie = resLogin.headers.get('set-cookie') || '';
  const cookies = setCookie.split(',')
    .map(c => c.split(';')[0].trim())
    .filter(c => c.includes('='))
    .join('; ');

  if (!cookies) {
    const body = await resLogin.text();
    throw new Error(`Login SII falló. Status: ${resLogin.status}. Resp: ${body.slice(0, 200)}`);
  }

  // ── Paso 2: Emitir BHE vía API del portal SII ───────────────
  const fechaHoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const bheBody = new URLSearchParams({
    RUT_EMISOR:    rutNum,
    DV_EMISOR:     dvEmisor.toUpperCase(),
    RUT_RECEPTOR:  rutRecNum,
    DV_RECEPTOR:   dvRec.toUpperCase(),
    NOMBRE_RECEP:  nombre,
    EMAIL_RECEP:   email,
    MONTO_TOTAL:   String(monto),
    FECHA_EMISION: fechaHoy,
    GLOSA:         descripcion,
  });

  const resEmision = await fetch('https://www4.sii.cl/bolehicliII/ingreso_bhe.cgi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://www4.sii.cl/bolehicliII/',
    },
    body: bheBody.toString(),
  });

  const respTexto = await resEmision.text();

  // Extraer folio de la respuesta HTML/JSON del SII
  const folio = respTexto.match(/folio["\s:>]+(\d+)/i)?.[1]
             || respTexto.match(/N[°º]\s*(\d+)/)?.[1]
             || respTexto.match(/"numero"\s*:\s*"?(\d+)"?/i)?.[1];

  if (!folio) {
    console.error('Respuesta BHE SII:', respTexto.slice(0, 600));
    throw new Error('SII no retornó folio BHE. Ver Observability para detalle.');
  }

  return folio;
}

// ══════════════════════════════════════════════
//  OAUTH 1.0 (FatSecret) — firma HMAC-SHA1
//  El 3-legged OAuth de FatSecret solo admite HMAC-SHA1. Cada llamada
//  se firma con: clave = pctEnc(consumerSecret) & pctEnc(tokenSecret).
// ══════════════════════════════════════════════

// Percent-encoding estricto RFC 3986 (encodeURIComponent deja ! * ' ( ) sin codificar)
function fsPctEncode(str) {
  return encodeURIComponent(String(str)).replace(/[!*'()]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

// Serializa params a query string con codificación RFC 3986 IDÉNTICA a la de la
// firma. URLSearchParams codifica distinto (espacio→+) y rompe la firma OAuth 1.0.
function fsQuery(params) {
  return Object.keys(params).map(key => `${fsPctEncode(key)}=${fsPctEncode(params[key])}`).join('&');
}

async function fsHmacSha1(baseString, signingKey) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(signingKey), { name:'HMAC', hash:'SHA-1' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(baseString));
  let bin = '';
  const bytes = new Uint8Array(sig);
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

// Construye el set de parámetros OAuth firmado (incluye oauth_signature).
// token / tokenSecret son null en el paso 1 (request_token).
async function fsOauthParams(httpMethod, baseUrl, extra, consumerKey, consumerSecret, token, tokenSecret) {
  const nonce = (typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : (Date.now() + '' + Math.random())).replace(/-/g, '');
  const oauth = {
    oauth_consumer_key:     consumerKey,
    oauth_nonce:            nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp:        Math.floor(Date.now() / 1000).toString(),
    oauth_version:          '1.0',
  };
  if (token) oauth.oauth_token = token;
  const all = { ...oauth, ...extra };
  // Base string: ordenar por clave, codificar cada par, unir con &
  const paramString = Object.keys(all).sort()
    .map(key => `${fsPctEncode(key)}=${fsPctEncode(all[key])}`).join('&');
  const baseString = [httpMethod.toUpperCase(), fsPctEncode(baseUrl), fsPctEncode(paramString)].join('&');
  const signingKey = `${fsPctEncode(consumerSecret)}&${fsPctEncode(tokenSecret || '')}`;
  all.oauth_signature = await fsHmacSha1(baseString, signingKey);
  return all;
}

// Config de nutrición efectiva para un atleta: por defecto → grupo → individual.
async function _nutriCfgEfectiva(env, uid) {
  let cfg = { pctGrasa:15, pctProt:25, pctCarb:60, ajusteKcal:0 };
  try { const g = await env.RUCK_DATA.get('nutri:config'); if (g) cfg = { ...cfg, ...JSON.parse(g) }; } catch(e) {}
  if (!uid) return cfg;
  // Config del primer grupo del atleta que tenga dieta definida
  try {
    const mRaw = await env.RUCK_DATA.get(`nutri:member:${uid}`);
    if (mRaw) {
      for (const gid of JSON.parse(mRaw)) {
        const gc = await env.RUCK_DATA.get(`nutri:config:grupo:${gid}`);
        if (gc) { cfg = { ...cfg, ...JSON.parse(gc) }; break; }
      }
    }
  } catch(e) {}
  // Override individual (manda sobre todo)
  try { const o = await env.RUCK_DATA.get(`nutri:config:${uid}`); if (o) cfg = { ...cfg, ...JSON.parse(o) }; } catch(e) {}
  return cfg;
}

// Normaliza month.day a array (FatSecret devuelve objeto si hay un solo día).
function _nutriDays(monthResp) {
  const m = monthResp && monthResp.month;
  if (!m || !m.day) return [];
  return Array.isArray(m.day) ? m.day : [m.day];
}

// Llama un método de la REST API legacy de FatSecret firmando con el token del atleta.
async function fsApiCall(method, params, env, tok) {
  const FS_API = 'https://platform.fatsecret.com/rest/server.api';
  const extra = { ...params, method, format: 'json' };
  const signed = await fsOauthParams('GET', FS_API, extra, env.FATSECRET_KEY, env.FATSECRET_SECRET, tok.token, tok.secret);
  const res = await fetch(FS_API + '?' + fsQuery(signed));
  const txt = await res.text();
  try { return JSON.parse(txt); } catch(e) { return { error: txt.slice(0, 300) }; }
}
