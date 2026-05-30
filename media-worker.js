// media-worker.js — Google Drive integration for InBody PDFs and MyJump videos
// Deploy: npx wrangler deploy media-worker.js --name media --compatibility-date 2026-05-29
// Bindings needed: BODY_DATA (KV), GOOGLE_SERVICE_ACCOUNT (secret)

const ROOT_FOLDER = '1WUCe0foHsQp_RG22Odf9PpgOx61G47B1';

async function getToken(env) {
  const sa = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT);
  const now = Math.floor(Date.now() / 1000);
  const b64u = s => btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
  const header = b64u(JSON.stringify({ alg:'RS256', typ:'JWT' }));
  const claim  = b64u(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/drive.file',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600, iat: now
  }));
  const pemBody = sa.private_key.replace(/-----[^-]+-----|\n/g, '');
  const keyBytes = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('pkcs8', keyBytes, { name:'RSASSA-PKCS1-v1_5', hash:'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${header}.${claim}`));
  const jwt = `${header}.${claim}.${b64u(String.fromCharCode(...new Uint8Array(sig)))}`;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const d = await r.json();
  if (!d.access_token) throw new Error('Token error: ' + JSON.stringify(d));
  return d.access_token;
}

async function findOrCreate(token, name, parent) {
  const q = encodeURIComponent(`name='${name}' and '${parent}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const r = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)`, {
    headers: { Authorization:`Bearer ${token}` }
  });
  const d = await r.json();
  if (d.files?.length) return d.files[0].id;
  const c = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: { Authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ name, mimeType:'application/vnd.google-apps.folder', parents:[parent] })
  });
  const f = await c.json();
  return f.id;
}

async function uploadMultipart(token, folderId, name, mimeType, data) {
  const meta = JSON.stringify({ name, parents:[folderId] });
  const boundary = 'me_boundary_xyz';
  const enc = new TextEncoder();
  const p1 = enc.encode(`--${boundary}\r\nContent-Type: application/json\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`);
  const p2 = new Uint8Array(data);
  const p3 = enc.encode(`\r\n--${boundary}--`);
  const combined = new Uint8Array(p1.length + p2.length + p3.length);
  combined.set(p1, 0); combined.set(p2, p1.length); combined.set(p3, p1.length + p2.length);
  const r = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
    method: 'POST',
    headers: { Authorization:`Bearer ${token}`, 'Content-Type':`multipart/related; boundary=${boundary}` },
    body: combined
  });
  return r.json();
}

const cors = origin => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
});

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const c = cors(req.headers.get('Origin'));
    if (req.method === 'OPTIONS') return new Response(null, { headers: c });

    const ok  = (data)  => new Response(JSON.stringify(data), { headers:{...c,'Content-Type':'application/json'} });
    const err = (msg,s) => new Response(JSON.stringify({error:msg}), { status:s||500, headers:{...c,'Content-Type':'application/json'} });

    try {
      // ── GET historial InBody ─────────────────────────────────────
      if (req.method === 'GET' && url.pathname.startsWith('/media/inbody/')) {
        const uid = url.pathname.split('/')[3];
        if (!uid) return err('uid requerido', 400);
        const data = await env.BODY_DATA.get(`body:${uid}`) || '[]';
        return new Response(data, { headers:{...c,'Content-Type':'application/json'} });
      }

      // ── POST guardar medición InBody en KV ───────────────────────
      if (req.method === 'POST' && url.pathname === '/media/save-inbody') {
        const { uid, email, medicion } = await req.json();
        if (!uid || !medicion?.fecha) return err('uid y medicion.fecha requeridos', 400);
        const list = JSON.parse(await env.BODY_DATA.get(`body:${uid}`) || '[]');
        const idx = list.findIndex(m => m.fecha === medicion.fecha);
        if (idx >= 0) list[idx] = medicion; else list.push(medicion);
        list.sort((a,b) => a.fecha.localeCompare(b.fecha));
        await env.BODY_DATA.put(`body:${uid}`, JSON.stringify(list));
        // Guardar mapeo email→uid para que el coach pueda buscar por email
        if (email) await env.BODY_DATA.put(`email:${email.toLowerCase()}`, uid);
        return ok({ ok:true });
      }

      // ── GET historial por email (para el coach) ──────────────────
      if (req.method === 'GET' && url.pathname.startsWith('/media/inbody-by-email/')) {
        const email = decodeURIComponent(url.pathname.split('/')[3]);
        if (!email) return err('email requerido', 400);
        const uid = await env.BODY_DATA.get(`email:${email.toLowerCase()}`);
        if (!uid) return new Response('[]', { headers:{...c,'Content-Type':'application/json'} });
        const data = await env.BODY_DATA.get(`body:${uid}`) || '[]';
        return new Response(data, { headers:{...c,'Content-Type':'application/json'} });
      }

      // ── POST subir PDF InBody a Drive ────────────────────────────
      if (req.method === 'POST' && url.pathname === '/media/upload-pdf') {
        const fd = await req.formData();
        const file   = fd.get('file');
        const uid    = fd.get('uid');
        const nombre = fd.get('nombre');
        const fecha  = fd.get('fecha');
        if (!file || !uid || !nombre || !fecha) return err('Faltan campos', 400);

        const token = await getToken(env);
        const atletaDir  = await findOrCreate(token, nombre, ROOT_FOLDER);
        const inbodyDir  = await findOrCreate(token, 'inbody', atletaDir);
        const buf    = await file.arrayBuffer();
        const result = await uploadMultipart(token, inbodyDir, `InBody_${fecha}.pdf`, 'application/pdf', buf);
        return ok({ ok:true, link: result.webViewLink, fileId: result.id });
      }

      // ── POST iniciar subida de video (resumable) ─────────────────
      // El Worker crea la sesión en Drive y devuelve la URL de upload.
      // El browser sube el video directamente a Drive (sin pasar por el Worker).
      if (req.method === 'POST' && url.pathname === '/media/init-video') {
        const { uid, nombre, fps, fecha, mimeType } = await req.json();
        if (!uid || !nombre || !fps || !fecha) return err('Faltan campos', 400);

        const token = await getToken(env);
        const atletaDir  = await findOrCreate(token, nombre, ROOT_FOLDER);
        const videosDir  = await findOrCreate(token, 'videos', atletaDir);
        const nombreArchivo = `${nombre.replace(/\s+/g,'_')}_${fps}fps_${fecha}`;

        const r = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,webViewLink', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Upload-Content-Type': mimeType || 'video/mp4'
          },
          body: JSON.stringify({ name: nombreArchivo, parents:[videosDir] })
        });
        const uploadUrl = r.headers.get('Location');
        if (!uploadUrl) return err('No se pudo iniciar la subida', 500);
        return ok({ ok:true, uploadUrl, nombreArchivo });
      }

      return err('Ruta no encontrada', 404);
    } catch(e) {
      console.error(e);
      return err(e.message, 500);
    }
  }
};
