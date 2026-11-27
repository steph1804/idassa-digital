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
  }),
});

export const collections = { blog };
