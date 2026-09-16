import { expect, test } from '@playwright/test';

test('no publica marcas, métricas ni testimonios no aprobados', async ({ page }) => {
  await page.goto('/');
  const projects = await page.locator('#proyectos').innerText();
  expect(projects).not.toMatch(/testimonio|cliente real|\d+%|años de experiencia/i);
  expect(projects.match(/Caso demostrativo/g)?.length).toBe(3);
});
