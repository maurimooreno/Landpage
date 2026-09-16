import { validationMessages } from '../data/contact';
import type { ContactChannel, ContactSubmission } from '../data/types';

const form = document.querySelector<HTMLFormElement>('#contact-form');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const buttonLabel = form.querySelector<HTMLElement>('[data-button-label]');
  const channelInputs = [
    ...form.querySelectorAll<HTMLInputElement>('input[name="preferredChannel"]'),
  ];
  const phoneRegion = form.querySelector<HTMLElement>('[data-channel-field="phone"]');
  const emailRegion = form.querySelector<HTMLElement>('[data-channel-field="email"]');
  const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
  const emailInput = form.elements.namedItem('email') as HTMLInputElement;

  const setError = (name: string, message = '') => {
    const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    const input = form.elements.namedItem(name);
    if (error) error.textContent = message;
    if (input instanceof HTMLElement && 'setAttribute' in input) {
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
  };

  const selectedChannel = (): ContactChannel =>
    (channelInputs.find((input) => input.checked)?.value ?? 'call') as ContactChannel;

  const syncChannel = () => {
    const usesEmail = selectedChannel() === 'email';
    if (phoneRegion) phoneRegion.hidden = usesEmail;
    if (emailRegion) emailRegion.hidden = !usesEmail;
    phoneInput.disabled = usesEmail;
    phoneInput.required = !usesEmail;
    emailInput.disabled = !usesEmail;
    emailInput.required = usesEmail;
    setError('phone');
    setError('email');
  };

  channelInputs.forEach((input) => input.addEventListener('change', syncChannel));
  syncChannel();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status) status.textContent = '';
    ['name', 'preferredChannel', 'phone', 'email', 'consent'].forEach((name) => setError(name));

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const channel = selectedChannel();
    const phone = String(data.get('phone') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const consent = data.get('consent') === 'true';
    let valid = true;
    if (name.length < 2 || name.length > 80) {
      setError('name', validationMessages.name);
      valid = false;
    }
    if ((channel === 'call' || channel === 'whatsapp') && !/^[+()\d\s-]{7,30}$/.test(phone)) {
      setError('phone', validationMessages.phone);
      valid = false;
    }
    if (channel === 'email' && !emailInput.validity.valid) {
      setError('email', validationMessages.email);
      valid = false;
    }
    if (!consent) {
      setError('consent', validationMessages.consent);
      valid = false;
    }
    if (!valid) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const payload: ContactSubmission & { source: 'landing-custom-software' } = {
      name,
      preferredChannel: channel,
      consent: true,
      privacyVersion: String(data.get('privacyVersion')),
      source: 'landing-custom-software',
      website: String(data.get('website') ?? ''),
      ...(channel === 'email' ? { email } : { phone }),
    };
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      Number(form.dataset.timeout ?? 10000),
    );
    if (submitButton) submitButton.disabled = true;
    if (buttonLabel) buttonLabel.textContent = 'Enviando…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        requestId?: string;
        receivedAt?: string;
        fieldErrors?: Record<string, string>;
        code?: string;
      } | null;
      if (
        (response.status === 200 || response.status === 202) &&
        result?.success &&
        result.requestId &&
        result.receivedAt
      ) {
        sessionStorage.setItem('contact-accepted', 'true');
        window.location.assign('/contacto/gracias/');
        return;
      }
      if ((response.status === 400 || response.status === 422) && result?.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => setError(field, message));
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      } else if (response.status === 409) {
        if (status)
          status.textContent =
            'El aviso de privacidad cambió. Recargá la página, revisalo y volvé a aceptar.';
      } else if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        if (status)
          status.textContent = `${validationMessages.rateLimit}${retryAfter ? ` Podés reintentar en ${retryAfter} segundos.` : ''}`;
      } else if (status) status.textContent = validationMessages.generic;
    } catch (error) {
      if (status)
        status.textContent =
          error instanceof DOMException && error.name === 'AbortError'
            ? validationMessages.timeout
            : validationMessages.generic;
    } finally {
      window.clearTimeout(timeout);
      if (submitButton) submitButton.disabled = false;
      if (buttonLabel) buttonLabel.textContent = 'Solicitar contacto';
    }
  });
}
