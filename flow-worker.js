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
          const datosAtleta = {
            email: emailCliente,
            nombre: opt.nombre || emailCliente.split('@')[0],
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

          // ✅ ENVIAR CÓDIGO DE TRAINHEROIC (solo planes autogestionados)
          if (!esPersonalizado) {
            const codigo = obtenerCodigoTrainHeroic(opt.plan, env);
            if (codigo) {
              await enviarEmailTrainHeroic(env, {
                email: emailCliente,
                codigo,
                plan: opt.plan,
                nombre: opt.nombre
              });
            }
          }

          // Notificar a admin por email
          await notificarAdminEmail(env, {
            asunto: `✅ Nuevo pago — ${opt.plan} (${esPersonalizado ? 'PERSONALIZADO' : 'Suscrito'})`,
            cuerpo: `
              Plan: ${opt.plan}
              Tipo: ${esPersonalizado ? 'Personalizado (requiere tu gestión)' : 'Autogestionado'}
              Cliente: ${opt.nombre}
              Email: ${emailCliente}
              Monto: $${estado.amount} CLP
              Orden: ${estado.commerceOrder}
              ${esPersonalizado ? '\n⚠️ Este atleta necesita gestión manual de TrainHeroic.' : '\n✅ Código TrainHeroic enviado automáticamente.'}
            `
          });
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
async function enviarEmailTrainHeroic(env, { email, codigo, plan, nombre }) {
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
async function notificarAdminEmail(env, { asunto, cuerpo }) {
  const adminEmail = env.NOTIFY_EMAIL || 'maximoesfuerzo91@gmail.com';
  const emailDesde = env.EMAIL_FROM || 'noreply@maximoesfuerzo.cl';

  if (!env.RESEND_API_KEY) {
    console.log('Notificación (sin Resend):', asunto, cuerpo);
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailDesde,
        to: adminEmail,
        subject: asunto,
        text: cuerpo,
      }),
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
  // Redirigir a notificarAdminEmail para consistencia
  await notificarAdminEmail(env, { asunto, cuerpo });
}
