import type { SeoMetadata } from './types';
export const homeSeo: SeoMetadata = {
  title: 'Software a medida para PyMEs | Taller Norte',
  description:
    'Aplicaciones internas, APIs, integraciones y automatizaciones diseñadas alrededor de su proceso empresarial.',
  canonicalPath: '/',
  imagePath: '/og-default.svg',
};
export const privacySeo: SeoMetadata = {
  title: 'Privacidad | Taller Norte',
  description: 'Cómo se tratan los datos enviados mediante el formulario de contacto.',
  canonicalPath: '/privacidad/',
};
export const confirmationSeo: SeoMetadata = {
  title: 'Solicitud recibida | Taller Norte',
  description: 'Confirmación de recepción de la solicitud de contacto.',
  canonicalPath: '/contacto/gracias/',
  noindex: true,
};
