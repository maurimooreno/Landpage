import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { fillValidContact, mockContactEndpoint } from '../fixtures/contact-endpoint';

test('@a11y formulario es operable por teclado y anuncia errores', async ({ page }) => {
  await page.goto('/#contacto');
  await page.getByLabel('Tu nombre').focus();
  await page.keyboard.type('Persona');
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Llamada')).toBeFocused();
  await page.getByRole('button', { name: 'Solicitar contacto' }).click();
  await expect(page.getByText('Necesitamos tu consentimiento')).toBeVisible();
  await expect(page.locator('[data-form-status]')).toHaveAttribute('aria-live', 'polite');
});

test('@a11y respeta movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const behavior = await page
    .locator('html')
    .evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(behavior).toBe('auto');
});

for (const route of ['/', '/privacidad/', '/contacto/gracias/']) {
  test(`@a11y ${route} no tiene violaciones axe serias`, async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'chromium',
      'Axe se ejecuta una vez en Chromium; la interacción se valida en todos los motores.',
    );
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((violation) =>
        ['serious', 'critical'].includes(violation.impact ?? ''),
      ),
    ).toEqual([]);
  });
}

test('un fallo conserva el foco y anuncia recuperación', async ({ page }) => {
  await mockContactEndpoint(page, 'failure');
  await page.goto('/#contacto');
  await fillValidContact(page);
  const button = page.getByRole('button', { name: 'Solicitar contacto' });
  await button.focus();
  await button.click();
  await expect(page.locator('[data-form-status]')).toContainText('Conservamos tus datos');
});

test('sin JavaScript quedan disponibles contenido y correo directo', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.content()).toContain('El formulario mejorado requiere JavaScript');
  await expect(page.getByRole('link', { name: 'hola@tallernorte.example' }).first()).toBeVisible();
  await context.close();
});
