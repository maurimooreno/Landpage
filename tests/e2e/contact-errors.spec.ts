import { expect, test } from '@playwright/test';
import {
  fillValidContact,
  mockContactEndpoint,
  type ContactMode,
} from '../fixtures/contact-endpoint';

for (const mode of ['forbidden', 'oversize', 'failure'] satisfies ContactMode[]) {
  test(`${mode} no produce un falso éxito y conserva los datos`, async ({ page }) => {
    await mockContactEndpoint(page, mode);
    await page.goto('/#contacto');
    await fillValidContact(page);
    await page.getByRole('button', { name: 'Solicitar contacto' }).click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator('[data-form-status]')).toContainText('No pudimos enviar');
    await expect(page.getByLabel('Tu nombre')).toHaveValue('Persona de prueba');
  });
}

test('explica un aviso de privacidad desactualizado', async ({ page }) => {
  await mockContactEndpoint(page, 'privacy');
  await page.goto('/#contacto');
  await fillValidContact(page);
  await page.getByRole('button', { name: 'Solicitar contacto' }).click();
  await expect(page.locator('[data-form-status]')).toContainText('aviso de privacidad cambió');
});

test('respeta Retry-After en límites de frecuencia', async ({ page }) => {
  await mockContactEndpoint(page, 'rate-limit');
  await page.goto('/#contacto');
  await fillValidContact(page);
  await page.getByRole('button', { name: 'Solicitar contacto' }).click();
  await expect(page.locator('[data-form-status]')).toContainText('60 segundos');
});

test('maneja timeout sin borrar el formulario', async ({ page }) => {
  await mockContactEndpoint(page, 'timeout');
  await page.goto('/#contacto');
  await page.locator('#contact-form').evaluate((form) => {
    (form as HTMLFormElement).dataset.timeout = '30';
  });
  await fillValidContact(page);
  await page.getByRole('button', { name: 'Solicitar contacto' }).click();
  await expect(page.locator('[data-form-status]')).toContainText(/demoró|No pudimos/);
  await expect(page.getByLabel('Tu nombre')).toHaveValue('Persona de prueba');
});

test('muestra errores de validación del servidor', async ({ page }) => {
  await mockContactEndpoint(page, 'validation');
  await page.goto('/#contacto');
  await fillValidContact(page, 'email');
  await page.getByRole('button', { name: 'Solicitar contacto' }).click();
  await expect(page.getByText('Ingresá un correo válido.')).toBeVisible();
});
