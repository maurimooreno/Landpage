import { expect, test } from '@playwright/test';
import { fillValidContact, mockContactEndpoint } from '../fixtures/contact-endpoint';

const contactEndpoint = process.env.PUBLIC_CONTACT_ENDPOINT ?? 'https://forms.example.test/contact';

test('muestra sólo el dato requerido por el canal', async ({ page }) => {
  await page.goto('/#contacto');
  await expect(page.getByLabel('Teléfono')).toBeVisible();
  await expect(page.getByLabel('Correo electrónico')).toBeHidden();
  await page.getByRole('radio', { name: /^Correo / }).check();
  await expect(page.getByLabel('Teléfono')).toBeHidden();
  await expect(page.getByLabel('Correo electrónico')).toBeVisible();
});

test('envía el payload exacto y confirma sólo una aceptación autoritativa', async ({ page }) => {
  let payload: unknown;
  await page.route(contactEndpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        requestId: 'opaque-1',
        receivedAt: '2026-09-13T12:00:00Z',
      }),
    });
  });
  await page.goto('/#contacto');
  await fillValidContact(page, 'email');
  await page.getByRole('button', { name: 'Solicitar contacto' }).click();
  await expect(page).toHaveURL('/contacto/gracias/');
  expect(payload).toEqual({
    name: 'Persona de prueba',
    preferredChannel: 'email',
    consent: true,
    privacyVersion: '2026-09-13',
    source: 'landing-custom-software',
    website: '',
    email: 'persona@example.com',
  });
  await expect(page.getByRole('heading', { name: 'Solicitud aceptada' })).toBeVisible();
});

test('valida en cliente y evita envíos incompletos', async ({ page }) => {
  await mockContactEndpoint(page);
  await page.goto('/#contacto');
  await page.getByRole('button', { name: 'Solicitar contacto' }).click();
  await expect(page.getByText('Ingresá tu nombre.')).toBeVisible();
  await expect(page.getByText('Ingresá un teléfono válido')).toBeVisible();
  await expect(page.getByText('Necesitamos tu consentimiento')).toBeVisible();
});
