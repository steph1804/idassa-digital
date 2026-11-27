import type { APIRoute } from 'astro';
import { getPosts } from '../../data/blog';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://idassa.digital');
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const link = new URL(`/blog/${p.id}/`, base).href;
      return `<item><title>${esc(p.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>idassa.digital blog</title><link>${new URL('/blog/', base).href}</link><description>Savjeti o web stranicama za smještajne objekte, obrte i male tvrtke.</description><language>hr</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
