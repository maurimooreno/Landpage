import { expect, test } from '@playwright/test';

test('distingue la empresa nueva y presenta tres casos completos', async ({ page }) => {
  await page.goto('/#experiencia');
  await expect(page.getByText('Taller Norte es una empresa nueva.')).toBeVisible();
  const projects = page.locator('.project-summary');
  await expect(projects).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    const project = projects.nth(index);
    await expect(project.getByText('Caso demostrativo', { exact: true })).toBeVisible();
    await expect(project.getByText('Problema', { exact: true })).toBeVisible();
    await expect(project.getByText('Aporte', { exact: true })).toBeVisible();
    await expect(project.getByText('Solución', { exact: true })).toBeVisible();
    await expect(project.getByText('Resultado ilustrativo', { exact: true })).toBeVisible();
  }
});

test('la secuencia tolera medios ausentes sin espacios rotos', async ({ page }) => {
  await page.goto('/#proyectos');
  await expect(page.locator('#proyectos img')).toHaveCount(0);
  await expect(page.locator('#proyectos')).toContainText('Estos tres ejemplos son sintéticos');
});
