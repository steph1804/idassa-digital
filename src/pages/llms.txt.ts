// llms.txt: kratki sažetak stranice za AI asistente (ChatGPT, Claude, Perplexity...). Format: https://llmstxt.org
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { portfolio } from '../data/portfolio';
import { getPosts } from '../data/blog';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const base = 'https://idassa.digital';
  const body = `# ${site.name}

> ${site.name} je web studio iz Hrvatske koji izrađuje web stranice za smještajne objekte (apartmane, kuće za odmor), obrte i male tvrtke te radi Google (SEO) optimizaciju, AI optimizaciju i digitalni marketing. Radimo za klijente iz cijele Hrvatske, uživo ili online.

## Usluge

- Izrada web stranica: dizajn, izrada i tekstovi, prilagođeno mobitelu, brzo učitavanje, više jezika.
- Google i SEO: optimizacija stranice za Google, sređivanje Google poslovnog profila (kategorije, radno vrijeme, fotografije, recenzije, objave) i vidljivost na Google Mapsu.
- AI optimizacija: stranica, strukturirani podaci i poslovni profil složeni tako da ih ChatGPT, Googleovi AI pregledi i drugi asistenti razumiju i preporuče.
- Održavanje i marketing: hosting i održavanje od 25 € mjesečno, pomoć s objavama, društvenim mrežama i oglasima.

## Paketi (cijene su konačne, PDV uključen, plaća se jednokratno)

- Portus, 390 €: stranica na jednoj stranici, kontakt, karta i radno vrijeme, prilagođeno mobitelu, registracija domene, prijevod na 3 jezika, galerija do 12 fotografija.
- Forum, 790 €: do 6 podstranica, pisanje tekstova, osnovni SEO i Google profil, obrazac za upite, prijevod na 7 jezika, galerija do 24 fotografije.
- Jednostavna stranica gotova je za oko dva tjedna. Domena i stranica su u vlasništvu klijenta.

## Kontakt

- E-mail: ${site.email}
- Telefon: ${site.phoneDisplay}
- Upit: ${base}/#kontakt (odgovor u roku od jednog radnog dana)

## Radovi

${portfolio.map((w) => `- [${w.name}](${w.url}): ${w.description}`).join('\n')}

## Blog

${posts.map((p) => `- [${p.data.title}](${base}/blog/${p.id}/): ${p.data.description}`).join('\n')}

## Ostalo

- [Početna](${base}/)
- [Blog](${base}/blog/)
- [Politika privatnosti](${base}/politika-privatnosti/)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
