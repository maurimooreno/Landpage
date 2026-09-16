import type { Capability } from './types';
export const capabilities: readonly Capability[] = [
  {
    area: 'Descubrimiento',
    detail:
      'Mapeo del proceso, actores, excepciones y costo de la fricción antes de definir alcance.',
  },
  {
    area: 'Arquitectura',
    detail:
      'APIs, integraciones y aplicaciones mantenibles con límites y responsabilidades explícitas.',
  },
  {
    area: 'Entrega',
    detail:
      'Iteraciones visibles, pruebas proporcionales al riesgo y documentación para operar el sistema.',
  },
  {
    area: 'Continuidad',
    detail:
      'Observabilidad, seguridad, transferencia de conocimiento y evolución sin dependencia opaca.',
  },
];
export const technologyGroups = [
  { label: 'Backend', values: ['TypeScript', 'Node.js', '.NET', 'APIs REST'] },
  { label: 'Datos', values: ['PostgreSQL', 'SQL Server', 'modelado y migraciones'] },
  { label: 'Web', values: ['Astro', 'interfaces accesibles', 'integraciones frontend'] },
  { label: 'Operación', values: ['GitHub Actions', 'contenedores', 'monitoreo'] },
] as const;
