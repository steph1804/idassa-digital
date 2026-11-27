import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog: svaki članak je jedna .md datoteka u src/content/blog/.
// Ime datoteke postaje adresa članka (npr. moj-clanak.md → /blog/moj-clanak/).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // true = članak se ne prikazuje na stranici (skica)
    draft: z.boolean().default(false),
    // Naslovna fotografija (datoteke u public/blog/). Sve je neobavezno.
    image: z.string().optional(), // velika, npr. /blog/slika-1600.webp
    imageSmall: z.string().optional(), // mala, npr. /blog/slika-800.webp
    imageOg: z.string().optional(), // za dijeljenje, 1200x630 jpg
    imageAlt: z.string().default(''),
    imageCredit: z.string().optional(), // npr. 'Adrian Mag, Unsplash'
    imageCreditUrl: z.string().url().optional(),
  }),
});

export const collections = { blog };
