import { expect, test } from '@playwright/test';

const routes = ['/', '/privacidad/', '/contacto/gracias/'];
const widths = [320, 390, 768, 1024, 1440];

for (const route of routes) {
  for (const width of widths) {
    test(`${route} no desborda a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 900 });
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
    });
  }
}

test('las tres rutas funcionan con touch en portrait y landscape', async ({ page }, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith('mobile'),
    'Touch real sólo es aplicable a proyectos móviles con hasTouch.',
  );
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    if (viewport.width < 768) {
      await page.getByText('Índice').tap();
      await page.locator('.mobile-nav').getByRole('link', { name: 'Contacto' }).tap();
    } else {
      await page.locator('.desktop-nav').getByRole('link', { name: 'Contacto' }).tap();
    }
    await expect(page.locator('#contacto')).toBeInViewport();
    await page.goto('/privacidad/');
    await page.getByRole('link', { name: 'Volver al contacto' }).tap();
    await expect(page).toHaveURL(/#contacto$/);
    await page.goto('/contacto/gracias/');
    await page.getByRole('link', { name: 'Volver al inicio' }).tap();
    await expect(page).toHaveURL(/\/$/);
  }
});
