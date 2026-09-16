import { expect, test } from '@playwright/test';

test('landing publica metadata, canonical y datos estructurados', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Software a medida para PyMEs/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Aplicaciones internas/,
  );
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-AR');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    /Software a medida/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://example.com/',
  );
  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
  );
  expect(jsonLd['@type']).toBe('ProfessionalService');
});

test('robots referencia el sitemap y el sitemap excluye confirmación', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://example.com/sitemap-index.xml');
  const sitemapIndex = await (await request.get('/sitemap-index.xml')).text();
  expect(sitemapIndex).toContain('sitemap-0.xml');
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  expect(sitemap).toContain('https://example.com/privacidad/');
  expect(sitemap).not.toContain('/contacto/gracias/');
});

test('confirmación es noindex', async ({ page }) => {
  await page.goto('/contacto/gracias/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});
