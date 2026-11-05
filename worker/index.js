// Zaključava cijelu stranicu lozinkom (HTTP Basic Auth).
// Lozinka se postavlja u Cloudflareu: Settings → Variables and Secrets → SITE_PASSWORD (Secret).
// Za otključavanje stranice obriši tu varijablu i u njezino mjesto dodaj SITE_PUBLIC = "true".

const REALM = 'idassa.digital';

function unauthorized(message = 'Potrebna je lozinka.') {
  return new Response(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

export default {
  async fetch(request, env) {
    if (env.SITE_PUBLIC === 'true') return env.ASSETS.fetch(request);

    const password = env.SITE_PASSWORD;
    if (!password) {
      return new Response('Stranica je zaključana, a lozinka još nije postavljena.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
      });
    }

    const auth = request.headers.get('Authorization') || '';
    if (!auth.startsWith('Basic ')) return unauthorized();
    let decoded = '';
    try {
      decoded = new TextDecoder().decode(Uint8Array.from(atob(auth.slice(6)), (c) => c.charCodeAt(0)));
    } catch {
      return unauthorized();
    }
    const given = decoded.slice(decoded.indexOf(':') + 1);
    if (!safeEqual(given, password)) return unauthorized('Kriva lozinka.');

    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    out.headers.set('Cache-Control', 'private, no-store');
    return out;
  },
};
