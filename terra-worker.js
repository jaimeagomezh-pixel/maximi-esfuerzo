// ══════════════════════════════════════════════════════
//  TERRA WEARABLES WORKER — Máximo Esfuerzo
//  Variables de entorno requeridas en Cloudflare:
//    TERRA_API_KEY   → tu API Key de app.tryterra.co
//    TERRA_DEV_ID    → tu Dev ID de app.tryterra.co
//  KV namespace:
//    TERRA_USERS     → mapeo reference_id (Firebase UID) → terra_user_id
// ══════════════════════════════════════════════════════

const TERRA_BASE = 'https://api.tryterra.co/v2';

// ── Cabeceras autenticadas hacia Terra ─────────────
function terraHeaders(env) {
  return {
    'x-api-key':    env.TERRA_API_KEY,
    'dev-id':       env.TERRA_DEV_ID,
    'Content-Type': 'application/json',
  };
}

// ── CORS abierto (maximoesfuerzo.cl + pages.dev) ─────
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function corsResponse(body, status = 200) {
  const headers = { ...corsHeaders(), 'Content-Type': 'application/json' };
  return new Response(body ? JSON.stringify(body) : null, { status, headers });
}

// ── Fecha hoy en formato YYYY-MM-DD (UTC-4 Chile) ───
function hoy(offsetHoras = -4) {
  const d = new Date(Date.now() + offsetHoras * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

// ══════════════════════════════════════════════════════
//  HANDLER PRINCIPAL
// ══════════════════════════════════════════════════════
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // ── POST /connect ────────────────────────────────
    // Body: { reference_id: "firebase_uid", email: "..." }
    // Devuelve: { ok: true, url: "https://widget.tryterra.co/..." }
    if (url.pathname === '/connect' && request.method === 'POST') {
      try {
        const { reference_id, email } = await request.json();
        if (!reference_id) return corsResponse({ ok: false, error: 'Falta reference_id' }, 400);

        const resp = await fetch(`${TERRA_BASE}/auth/generateWidgetSession`, {
          method: 'POST',
          headers: terraHeaders(env),
          body: JSON.stringify({
            reference_id,
            auth_success_redirect_url: 'https://maximi-esfuerzo.pages.dev?terra=ok',
            auth_failure_redirect_url: 'https://maximi-esfuerzo.pages.dev?terra=error',
            language: 'es',
            show_disconnect: true,
          }),
        });

        const data = await resp.json();
        if (data.session_id) {
          return corsResponse({
            ok:  true,
            url: `https://widget.tryterra.co/session?session_id=${data.session_id}&lang=es`,
            session_id: data.session_id,
          });
        }
        return corsResponse({ ok: false, error: data }, 500);

      } catch (e) {
        return corsResponse({ ok: false, error: e.message }, 500);
      }
    }

    // ── GET /userid?ref=firebase_uid ─────────────────
    // Devuelve el terra_user_id guardado para ese UID de Firebase
    if (url.pathname === '/userid' && request.method === 'GET') {
      try {
        const ref = url.searchParams.get('ref');
        if (!ref) return corsResponse({ ok: false }, 400);

        const userId = await env.TERRA_USERS.get(ref);
        if (userId) {
          const providerRaw = await env.TERRA_USERS.get(`${ref}:provider`);
          return corsResponse({ ok: true, user_id: userId, provider: providerRaw || 'Wearable' });
        }
        return corsResponse({ ok: false, user_id: null });

      } catch (e) {
        return corsResponse({ ok: false, error: e.message }, 500);
      }
    }

    // ── GET /data?ref=firebase_uid&type=daily|sleep|activity ──
    // Obtiene datos del día actual para el atleta
    if (url.pathname === '/data' && request.method === 'GET') {
      try {
        const ref     = url.searchParams.get('ref');
        const tipo    = url.searchParams.get('type') || 'daily';
        if (!ref) return corsResponse({ ok: false, error: 'Falta ref' }, 400);

        // Recuperar terra_user_id
        const terraUserId = await env.TERRA_USERS.get(ref);
        if (!terraUserId) return corsResponse({ ok: false, error: 'Usuario no conectado' }, 404);

        const fechaHoy   = hoy();
        const fechaAyer  = hoy(-28); // 24h atrás para asegurar datos de ayer también

        const terraUrl = `${TERRA_BASE}/${tipo}?user_id=${terraUserId}&start_date=${fechaAyer}&end_date=${fechaHoy}&to_webhook=false&with_samples=false`;

        const resp = await fetch(terraUrl, {
          headers: terraHeaders(env),
        });

        const data = await resp.json();
        return corsResponse({ ok: true, data: data.data || [], type: tipo });

      } catch (e) {
        return corsResponse({ ok: false, error: e.message }, 500);
      }
    }

    // ── POST /webhook ─────────────────────────────────
    // Terra llama aquí cuando el atleta conecta su dispositivo
    // o cuando llegan nuevos datos
    if (url.pathname === '/webhook' && request.method === 'POST') {
      try {
        const body   = await request.text();
        const evento = JSON.parse(body);
        const tipo   = evento.type;
        const user   = evento.user;

        if (!user || !user.user_id) return new Response('ok', { status: 200 });

        const terraUserId  = user.user_id;
        const referenceId  = user.reference_id || '';
        const provider     = user.provider || 'Wearable';

        // Guardar el mapeo reference_id → terra_user_id
        if (referenceId && (tipo === 'user_auth' || tipo === 'connection_error' || referenceId)) {
          await env.TERRA_USERS.put(referenceId, terraUserId, { expirationTtl: 60 * 60 * 24 * 365 });
          await env.TERRA_USERS.put(`${referenceId}:provider`, provider, { expirationTtl: 60 * 60 * 24 * 365 });
        }

        // También guardar por terra_user_id para lookup inverso
        if (referenceId) {
          await env.TERRA_USERS.put(`uid:${terraUserId}`, referenceId, { expirationTtl: 60 * 60 * 24 * 365 });
        }

        return new Response('OK', { status: 200 });

      } catch (e) {
        console.error('Webhook error:', e);
        return new Response('Error', { status: 500 });
      }
    }

    // ── GET /disconnect?ref=firebase_uid ─────────────
    if (url.pathname === '/disconnect' && request.method === 'POST') {
      try {
        const { reference_id } = await request.json();
        if (!reference_id) return corsResponse({ ok: false }, 400);

        const terraUserId = await env.TERRA_USERS.get(reference_id);
        if (terraUserId) {
          // Llamar a Terra para desconectar
          await fetch(`${TERRA_BASE}/auth/deauthenticateUser?user_id=${terraUserId}`, {
            method: 'DELETE',
            headers: terraHeaders(env),
          });
          await env.TERRA_USERS.delete(reference_id);
          await env.TERRA_USERS.delete(`${reference_id}:provider`);
          await env.TERRA_USERS.delete(`uid:${terraUserId}`);
        }
        return corsResponse({ ok: true });

      } catch (e) {
        return corsResponse({ ok: false, error: e.message }, 500);
      }
    }

    return new Response('Terra Worker activo ✓', { status: 200 });
  },
};
