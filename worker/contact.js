// Kontakt forma: prima upit sa stranice i šalje ga e-mailom preko Cloudflare Email Routinga.
// Potrebno u Cloudflareu (jednom):
//  1. Email Routing uključen za idassa.digital, a adresa na koju upiti stižu potvrđena kao "Destination address".
//  2. Settings → Variables and Secrets → Secret CONTACT_TO = ta potvrđena adresa.
// Pošiljatelj je forma@idassa.digital, a "Odgovori" ide izravno na e-mail posjetitelja.

const FROM = 'forma@idassa.digital';
const PACKAGES = new Set(['Portus', 'Forum', 'Nisam siguran']);
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

const clean = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/[\n\t]+/g, ' ');

function b64(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
const encodeHeader = (text) => `=?UTF-8?B?${b64(text)}?=`;
const wrap76 = (s) => s.replace(/.{1,76}/g, '$&\r\n');

function reply(request, ok, message, status) {
  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify({ ok, message }), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  const to = new URL(ok ? '/?poslano=1#kontakt' : '/?greska=1#kontakt', request.url);
  return Response.redirect(to.toString(), 303);
}

export async function handleContact(request, env, EmailMessage) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
  }
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return reply(request, false, 'Neispravan zahtjev.', 403);
  }

  let data;
  try {
    const type = request.headers.get('Content-Type') || '';
    data = type.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return reply(request, false, 'Neispravan zahtjev.', 400);
  }

  // Zamka za botove: skriveno polje koje ljudi ne vide i ne ispunjavaju.
  if (clean(data.web, 200)) return reply(request, true, 'Hvala!', 200);
  // Prebrzo poslano (manje od 3 s od učitavanja forme) = gotovo sigurno bot.
  const started = Number(data.t);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < 3000) {
    return reply(request, true, 'Hvala!', 200);
  }

  const name = oneLine(data.ime, 100);
  const email = oneLine(data.email, 200);
  const phone = oneLine(data.telefon, 40);
  const pkg = PACKAGES.has(data.paket) ? data.paket : 'Nisam siguran';
  const message = clean(data.poruka, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return reply(request, false, 'Upišite ime, ispravan e-mail i poruku.', 400);
  }
  if (!env.SEND_EMAIL || !env.CONTACT_TO) {
    return reply(request, false, 'Forma trenutno ne radi. Pišite nam izravno na hello@idassa.digital.', 503);
  }

  const body = [
    `Novi upit s idassa.digital`,
    ``,
    `Ime: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone || '-'}`,
    `Paket: ${pkg}`,
    ``,
    message,
    ``,
    `--`,
    `Poslano: ${new Date().toISOString()}`,
  ].join('\n');

  const raw = [
    `From: ${encodeHeader('idassa.digital forma')} <${FROM}>`,
    `To: <${env.CONTACT_TO}>`,
    `Reply-To: ${encodeHeader(name)} <${email}>`,
    `Subject: ${encodeHeader(`Upit: ${name} (${pkg})`)}`,
    `Message-ID: <${crypto.randomUUID()}@idassa.digital>`,
    `Date: ${new Date().toUTCString()}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    wrap76(b64(body)),
  ].join('\r\n');

  try {
    await env.SEND_EMAIL.send(new EmailMessage(FROM, env.CONTACT_TO, raw));
  } catch (err) {
    console.error('Slanje upita nije uspjelo', err);
    return reply(request, false, 'Poruka nije poslana. Pišite nam izravno na hello@idassa.digital.', 502);
  }
  return reply(request, true, 'Hvala! Poruka je poslana, javljamo se u roku od jednog radnog dana.', 200);
}
