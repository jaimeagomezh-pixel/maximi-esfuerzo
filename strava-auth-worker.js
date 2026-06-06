// strava-auth-worker.js
// Maneja el intercambio OAuth y el refresh automático de tokens Strava
// STRAVA_SECRET = client_secret del app Strava (configurado como Worker secret)
// STRAVA_CLIENT_ID = 249036 (hardcoded — es público en el frontend)

const CLIENT_ID = '249036';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    const url = new URL(request.url);

    // ── POST /exchange — intercambia código OAuth por tokens ──────
    if (url.pathname === '/exchange' && request.method === 'POST') {
      try {
        const { code } = await request.json();
        if (!code) return Response.json({ error: 'Falta code' }, { status: 400, headers: corsHeaders() });

        const res = await fetch('https://www.strava.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id:     CLIENT_ID,
            client_secret: env.STRAVA_SECRET,
            code,
            grant_type: 'authorization_code',
          }),
        });

        const data = await res.json();
        if (!data.access_token) {
          return Response.json({ error: 'Token inválido', detalle: data }, { status: 400, headers: corsHeaders() });
        }

        return Response.json({
          access_token:  data.access_token,
          refresh_token: data.refresh_token,
          expires_at:    data.expires_at,
          athlete:       data.athlete || null,
        }, { headers: corsHeaders() });

      } catch (e) {
        return Response.json({ error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    // ── POST /refresh — renueva access_token con refresh_token ────
    if (url.pathname === '/refresh' && request.method === 'POST') {
      try {
        const { refresh_token } = await request.json();
        if (!refresh_token) return Response.json({ error: 'Falta refresh_token' }, { status: 400, headers: corsHeaders() });

        const res = await fetch('https://www.strava.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id:     CLIENT_ID,
            client_secret: env.STRAVA_SECRET,
            refresh_token,
            grant_type: 'refresh_token',
          }),
        });

        const data = await res.json();
        if (!data.access_token) {
          return Response.json({ error: 'Refresh fallido', detalle: data }, { status: 400, headers: corsHeaders() });
        }

        return Response.json({
          access_token:  data.access_token,
          refresh_token: data.refresh_token, // Strava puede rotar el refresh token
          expires_at:    data.expires_at,
        }, { headers: corsHeaders() });

      } catch (e) {
        return Response.json({ error: e.message }, { status: 500, headers: corsHeaders() });
      }
    }

    return new Response('Strava Auth Worker activo', { status: 200 });
  },
};
