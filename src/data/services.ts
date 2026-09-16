import type { Service } from './types';
export const services: readonly Service[] = [
  {
    code: 'API',
    title: 'Sistemas que no se hablan',
    problem: 'La información se duplica entre planillas, sistemas heredados y proveedores.',
    intervention: 'APIs e integraciones con contratos claros, trazabilidad y manejo de errores.',
    outcome: 'Un flujo de datos consistente y menos conciliación manual.',
  },
  {
    code: 'AUT',
    title: 'Tareas que consumen al equipo',
    problem: 'Personas valiosas repiten cargas, validaciones, reportes o avisos todos los días.',
    intervention: 'Automatizaciones observables que respetan reglas y excepciones del negocio.',
    outcome: 'Más tiempo para decisiones y menos riesgo de omisiones.',
  },
  {
    code: 'APP',
    title: 'Procesos que una herramienta genérica fuerza',
    problem: 'El equipo adapta su operación a un producto que no refleja cómo trabaja.',
    intervention: 'Aplicaciones internas diseñadas alrededor del proceso real y sus responsables.',
    outcome: 'Una interfaz más clara, adopción más simple y control operativo.',
  },
  {
    code: 'SYS',
    title: 'Software crítico que necesita evolucionar',
    problem:
      'Una solución existente limita cambios, crece sin estructura o resulta difícil de mantener.',
    intervention:
      'Modernización gradual, módulos con responsabilidades precisas y pruebas automatizadas.',
    outcome: 'Cambios más seguros sin reemplazar todo de una vez.',
  },
];
