import type { Page, Route } from '@playwright/test';

export type ContactMode =
  | 'success'
  | 'validation'
  | 'privacy'
  | 'rate-limit'
  | 'forbidden'
  | 'oversize'
  | 'failure'
  | 'timeout';

export async function mockContactEndpoint(page: Page, mode: ContactMode = 'success') {
  await page.route('https://forms.example.com/contact', async (route: Route) => {
    if (mode === 'timeout') {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return route.abort('timedout');
    }
    const responses = {
      success: {
        status: 202,
        body: { success: true, requestId: 'req_demo_01', receivedAt: '2026-09-13T12:00:00Z' },
      },
      validation: {
        status: 422,
        body: {
          success: false,
          code: 'validation_error',
          fieldErrors: { email: 'Ingresá un correo válido.' },
        },
      },
      privacy: { status: 409, body: { success: false, code: 'privacy_notice_outdated' } },
      'rate-limit': { status: 429, body: { success: false, code: 'rate_limited' } },
      forbidden: { status: 403, body: { success: false, code: 'origin_rejected' } },
      oversize: { status: 413, body: { success: false, code: 'payload_too_large' } },
      failure: { status: 500, body: { success: false, code: 'delivery_unavailable' } },
    } as const;
    const response = responses[mode];
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      headers:
        mode === 'rate-limit'
          ? { 'Retry-After': '60', 'Access-Control-Expose-Headers': 'Retry-After' }
          : {},
      body: JSON.stringify(response.body),
    });
  });
}

export async function fillValidContact(
  page: Page,
  channel: 'call' | 'whatsapp' | 'email' = 'call',
) {
  await page.getByLabel('Tu nombre').fill('Persona de prueba');
  await page
    .getByRole('radio', {
      name: channel === 'call' ? /^Llamada/ : channel === 'whatsapp' ? /^WhatsApp/ : /^Correo /,
    })
    .check();
  if (channel === 'email') await page.getByLabel('Correo electrónico').fill('persona@example.com');
  else await page.getByLabel('Teléfono').fill('+54 11 5555 0101');
  await page.getByLabel(/Acepto que/).check();
}
