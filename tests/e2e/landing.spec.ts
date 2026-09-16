import { expect, test } from '@playwright/test';

test('explica la oferta y permite recorrer sus secciones', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('procesos trabados');
  await expect(page.getByRole('link', { name: 'Hablemos de tu proyecto' })).toHaveAttribute(
    'href',
    '#contacto',
  );
  await expect(
    page.getByRole('heading', { name: 'El problema primero. La tecnología después.' }),
  ).toBeVisible();
  await expect(page.getByText('APIs e integraciones', { exact: false }).first()).toBeVisible();
  await expect(page.getByText('Automatizaciones observables', { exact: false })).toBeVisible();
  await expect(page.getByText('Aplicaciones internas diseñadas', { exact: false })).toBeVisible();
  await page.getByRole('link', { name: 'Servicios' }).first().click();
  await expect(page.locator('#servicios')).toBeInViewport();
});

test('mantiene HTML semántico y una alternativa de correo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toHaveAttribute(
    'href',
    '#contenido',
  );
  await expect(
    page.getByRole('link', { name: 'hola@tallernorte.example' }).first(),
  ).toHaveAttribute('href', 'mailto:hola@tallernorte.example');
});
