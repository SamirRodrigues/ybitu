import type { APIRoute } from 'astro';
import { site } from '../config';
import { withBase } from '../url';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}${withBase('/sitemap-index.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
