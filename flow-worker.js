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
    'Access-Control-Allow-Origin': 'https://maximi-esfuerzo.pages.dev',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// COACH_SECRET se lee de env.COACH_SECRET (Cloudflare Worker secret)
// Configúralo con: npx wrangler secret put COACH_SECRET
// Valor por defecto solo como fallback de desarrollo:
const COACH_SECRET = null; // nunca hardcodeado en código

// ══════════════════════════════════════════════
//  HANDLER PRINCIPAL
// ══════════════════════════════════════════════
export default {
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
          const comercioOrden = `ME-${Date.now()}`;
          const datos = {
            commerceOrder: comercioOrden,
            subject:       `Plan ${plan} - Máximo Esfuerzo (Pago único)`,
            currency:      'CLP',
            amount:        String(monto),
            email:         email,
            urlConfirmation: 'https://flow-payments.jaimea-gomezh.workers.dev/webhook-pago',
            urlReturn:     'https://maximi-esfuerzo.pages.dev?pago=ok',
            optional:      JSON.stringify({ plan, nombre, tipoPago: 'unico' }),
          };

          const resp = await llamarFlow('/payment/create', datos, env);
          if (resp.url && resp.token) {
            return Response.json({
              ok: true,
              url: `${resp.url}?token=${resp.token}`
            }, { headers: corsHeaders() });
          }
          return Response.json({ ok: false, error: resp }, { headers: corsHeaders() });
        }

        // Suscripción 3 meses: cobros automáticos cada mes por 3 meses
        if (tipoSuscripcion === 'suscripcion-3m' || tipoPago === 'mensual') {
          // 1. Crear cliente en Flow
          const cliente = await llamarFlow('/customer/create', {
            name:  nombre,
            email: email,
          }, env);

          const customerId = cliente.customerId || cliente.id;
          if (!customerId) {
            return Response.json({ ok: false, error: 'No se pudo crear cliente', detalle: cliente }, { headers: corsHeaders() });
          }

          // 2. Crear plan de suscripción con 3 cobros
          const planId = `ME-3m-${Date.now()}`;
          const planResp = await llamarFlow('/plan/create', {
            planId:       planId,
            name:         `${plan} (3 meses) - Máximo Esfuerzo`,
            currency:     'CLP',
            amount:       String(monto),
            interval:     '1',
            intervalType: 'month',
            charges:      '3',  // ← 3 cobros automáticos
            trialPeriodDays: '0',
            urlCallback:  'https://flow-payments.jaimea-gomezh.workers.dev/webhook-suscripcion',
          }, env);

          if (!planResp.planId) {
            return Response.json({ ok: false, error: 'No se pudo crear plan', detalle: planResp }, { headers: corsHeaders() });
          }

          // 3. Suscribir cliente al plan
          const susResp = await llamarFlow('/subscription/create', {
            planId:     planId,
            customerId: customerId,
            couponId:   '',
          }, env);

          if (susResp.url && susResp.token) {
            return Response.json({
              ok: true,
              url: `${susResp.url}?token=${susResp.token}`,
              subscriptionId: susResp.subscriptionId
            }, { headers: corsHeaders() });
          }

          return Response.json({ ok: false, error: susResp }, { headers: corsHeaders() });
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

          // Notificar a Jaime por email
          await notificarEmail(env, {
            asunto: `✅ Nuevo pago recibido — ${opt.plan}`,
            cuerpo: `
              Plan: ${opt.plan}
              Cliente: ${opt.nombre}
              Email: ${estado.payer}
              Monto: $${estado.amount} CLP
              Orden: ${estado.commerceOrder}
              
              → Enviar código TrainHeroic al cliente.
            `
          });
        }

        return new Response('OK', { status: 200 });

      } catch(e) {
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
        const { stravaId, sessions, nombre } = await request.json();
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

    // ── POST /rucking/save-profile — atleta guarda su perfil (SE, BM) ──
    if (url.pathname === '/rucking/save-profile' && request.method === 'POST') {
      try {
        const { stravaId, nombre, profile } = await request.json();
        if (!stravaId || !profile) return Response.json({ ok:false, error:'Datos inválidos' }, { status:400, headers:corsHeaders() });
        await env.RUCK_DATA.put(`profile:${stravaId}`, JSON.stringify({ ...profile, updatedAt: new Date().toISOString() }));
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

    // ── CRON: notificar planes por vencer ────────
    // (configurar en wrangler.toml como cron trigger)
    return new Response('Flow Worker activo', { status: 200 });
  },

  // ── Cron diario para revisar vencimientos ────
  async scheduled(event, env) {
    // Aquí iría la lógica de revisar en Firebase/KV
    // los planes que vencen en 7 días y enviar email
    // Por ahora registra que corrió
    console.log('Cron ejecutado:', new Date().toISOString());
  }
};

// ── Enviar email de notificación ──────────────
async function notificarEmail(env, { asunto, cuerpo }) {
  // Usa el servicio de email de Cloudflare o un endpoint externo
  // Por ahora registra en consola — se conecta a un servicio real en el siguiente paso
  console.log('EMAIL:', asunto);
  console.log(cuerpo);

  // Si tienes configurado un servicio como Resend o SendGrid,
  // se agrega aquí con env.EMAIL_API_KEY
}
