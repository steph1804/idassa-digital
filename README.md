# idassa.digital

Web stranica studija idassa digital (Zadar), napravljena u [Astru](https://astro.build) i objavljena na Cloudflare Pages.

## Pokretanje na računalu

```bash
npm install
npm run dev      # lokalni pregled na http://localhost:4321
npm run build    # gotova stranica u mapi dist/
```

## Gdje je što

| Mjesto | Što je |
|---|---|
| `src/data/site.ts` | e-mail, telefon i podaci o obrtu (OIB i adresa pojavljuju se u podnožju kad se upišu) |
| `src/pages/index.astro` | početna stranica |
| `src/pages/politika-privatnosti.astro` | politika privatnosti |
| `src/layouts/Base.astro` | zajedničko zaglavlje, podnožje i SEO oznake |
| `src/styles/global.css` | boje, fontovi i izgled |
| `public/` | favicon, fontovi, slika za dijeljenje, robots.txt |

## Objava (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`
- Svaki push na `main` automatski objavljuje novu verziju.
