import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = () => {
  const body = site.isPublic
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        '# AI pretraživači i asistenti su dobrodošli (AI optimizacija)',
        ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot']
          .flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
        'Sitemap: https://idassa.digital/sitemap-index.xml',
        '',
      ].join('\n')
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
