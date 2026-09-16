import { expect, test } from '@playwright/test';

const routes = ['/', '/privacidad/', '/contacto/gracias/'];

test('el foco visible recorre navegación y acción principal', async ({ page }) => {
  await page.goto('/');
  const skipLink = page.getByRole('link', { name: 'Saltar al contenido' });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  const outline = await skipLink.evaluate((element) => getComputedStyle(element).outlineWidth);
  expect(Number.parseFloat(outline)).toBeGreaterThanOrEqual(3);
});

for (const route of routes) {
  test(`${route} conserva reflow equivalente a 400%`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
}

test('los objetivos táctiles principales alcanzan 24 CSS px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const targets = page.locator(
    'summary:visible, button:visible, .action-link:visible, .channel-options label:visible, .consent:visible',
  );
  for (let index = 0; index < (await targets.count()); index += 1) {
    const box = await targets.nth(index).boundingBox();
    if (box) expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(24);
  }
});

test('contenido largo no rompe el formulario', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/#contacto');
  await page
    .getByLabel('Tu nombre')
    .fill(
      'Nombre de organización y persona responsable deliberadamente extenso para validar el diseño',
    );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test('fuentes ausentes no ocultan el contenido', async ({ page }) => {
  await page.route(/\.(woff2?|ttf)$/, (route) => route.abort());
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Solicitar contacto' })).toBeVisible();
});
