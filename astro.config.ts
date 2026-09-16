import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const isBuild = process.argv.some((argument) => argument === 'build');
const defaultSiteUrl = 'http://localhost:4321';
const defaultContactEndpoint = 'https://forms.example.test/contact';

function validUrl(value: string | undefined, fallback: string, label: string): URL {
  const candidate = value?.trim() || fallback;
  let parsed: URL;

  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error(`${label} must be a valid absolute URL.`);
  }

  if (isBuild && parsed.protocol !== 'https:') {
    throw new Error(`${label} must use HTTPS for a release build.`);
  }

  return parsed;
}

if (isBuild && (!process.env.PUBLIC_SITE_URL || !process.env.PUBLIC_CONTACT_ENDPOINT)) {
  throw new Error(
    'PUBLIC_SITE_URL and PUBLIC_CONTACT_ENDPOINT are required for a release build. PRODUCTION_SITE_URL is configured only in the post-deployment workflow.',
  );
}

const siteUrl = validUrl(process.env.PUBLIC_SITE_URL, defaultSiteUrl, 'PUBLIC_SITE_URL');
validUrl(process.env.PUBLIC_CONTACT_ENDPOINT, defaultContactEndpoint, 'PUBLIC_CONTACT_ENDPOINT');

export default defineConfig({
  site: siteUrl.origin,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/contacto/gracias'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
