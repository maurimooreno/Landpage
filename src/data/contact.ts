import type { ContactChannelOption } from './types';
import { profile } from './profile';
export const privacyVersion = '2026-09-13';
export const contactTimeoutMs = 10_000;
export const contactEmail = profile.email;
export const contactChannels: readonly ContactChannelOption[] = [
  { value: 'call', label: 'Llamada', detail: 'Te llamamos al número indicado.', inputMode: 'tel' },
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    detail: 'Iniciamos la conversación por WhatsApp.',
    inputMode: 'tel',
  },
  {
    value: 'email',
    label: 'Correo',
    detail: 'Respondemos a tu dirección de correo.',
    inputMode: 'email',
  },
];
export const validationMessages = {
  name: 'Ingresá tu nombre.',
  channel: 'Elegí cómo preferís que te contactemos.',
  phone: 'Ingresá un teléfono válido, incluyendo código de área.',
  email: 'Ingresá una dirección de correo válida.',
  consent: 'Necesitamos tu consentimiento para gestionar la solicitud.',
  generic:
    'No pudimos enviar la solicitud. Conservamos tus datos en el formulario para que reintentes.',
  timeout: 'La solicitud demoró más de lo esperado. Revisá tu conexión y volvé a intentar.',
  rateLimit: 'Recibimos varios intentos. Esperá un momento antes de volver a enviar.',
} as const;
