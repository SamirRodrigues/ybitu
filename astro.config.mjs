import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio próprio (padrão): SITE_URL=https://ybituolivro.com.br e BASE_PATH=/
// GitHub Pages sem domínio próprio: SITE_URL=https://samirrodrigues.github.io e BASE_PATH=/ybitu
// (o workflow em .github/workflows/deploy.yml escolhe pelos "Variables" do repositório).
export default defineConfig({
  site: process.env.SITE_URL || 'https://ybituolivro.com.br',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', es: 'es' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
