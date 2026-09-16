import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const route of ['/', '/privacidad/', '/contacto/gracias/']) {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    test(`@a11y WCAG A/AA ${route} ${viewport.width}px`, async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name !== 'chromium',
        'Axe se ejecuta una vez en Chromium; la interacción se valida en todos los motores.',
      );
      await page.setViewportSize(viewport);
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
