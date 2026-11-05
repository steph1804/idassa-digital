// Zaključava cijelu stranicu lozinkom (HTTP Basic Auth).
// Zadana lozinka: u kodu je samo njezin SHA-256 sažetak (DEFAULT_PASSWORD_SHA256), ne sama lozinka.
// Lozinku možeš zamijeniti svojom u Cloudflareu: Settings → Variables and Secrets → SITE_PASSWORD (Secret).
// Za otključavanje stranice obriši tu varijablu i u njezino mjesto dodaj SITE_PUBLIC = "true".

const REALM = 'idassa.digital';
const DEFAULT_PASSWORD_SHA256 = '3bf0c040cd30426cb89c55bb48acc35a9a7d8a73b0b2413cb9a35b565f1daa95';

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

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

    const auth = request.headers.get('Authorization') || '';
    if (!auth.startsWith('Basic ')) return unauthorized();
    let decoded = '';
    try {
      decoded = new TextDecoder().decode(Uint8Array.from(atob(auth.slice(6)), (c) => c.charCodeAt(0)));
    } catch {
      return unauthorized();
    }
    const given = decoded.slice(decoded.indexOf(':') + 1);
    const ok = password
      ? safeEqual(given, password)
      : safeEqual(await sha256Hex(given), DEFAULT_PASSWORD_SHA256);
    if (!ok) return unauthorized('Kriva lozinka.');

    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    out.headers.set('Cache-Control', 'private, no-store');
    return out;
  },
};
