# Feature Specification: Landing de servicios de software a medida

**Feature Branch**: `001-custom-software-landing` (la implementación no se realiza directamente sobre `main`)

**Created**: 2026-09-08

**Status**: Draft

**Input**: Landing profesional para presentar servicios, problemas resueltos, experiencia y
proyectos de un desarrollador independiente, y convertir visitas relevantes en consultas
cualificadas para proyectos de software a medida.

## Clarifications

### Session 2026-09-08

- Q: ¿A qué destino deben enviarse las consultas válidas del formulario en el lanzamiento inicial? → A: Al correo de la empresa.
- Q: ¿Qué mercado geográfico debe priorizar la landing en su lanzamiento inicial? → A: Argentina, con servicios remotos.
- Q: ¿El formulario pedirá únicamente nombre, dato de contacto y canal preferido, sin descripción del proyecto? → A: Sí; formulario mínimo de devolución de contacto.
- Q: ¿Durante cuánto tiempo se conservarán los datos de una solicitud que no se convierte en cliente? → A: 90 días desde el último contacto.
- Q: ¿En qué plazo debe responder la empresa una solicitud de contacto? → A: Dentro de 1 día hábil.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reconocer una solución adecuada (Priority: P1)

Como responsable de una empresa con un proceso manual, una necesidad de integración o una idea de
software, quiero entender rápidamente qué ofrece el profesional y qué problemas resuelve para
decidir si vale la pena conversar sobre mi proyecto.

**Why this priority**: La propuesta debe establecer relevancia antes de que el visitante invierta
tiempo en evaluar experiencia o iniciar contacto.

**Independent Test**: Se puede mostrar la página a una persona del público objetivo y comprobar que,
sin ayuda, identifica la oferta, al menos tres tipos de solución y el siguiente paso recomendado.

**Acceptance Scenarios**:

1. **Given** una persona que llega por primera vez, **When** observa la sección principal,
   **Then** entiende que se ofrecen soluciones de software a medida para pequeñas y medianas
   empresas y encuentra una acción clara para conversar sobre su proyecto.
2. **Given** una persona con una necesidad concreta, **When** revisa los servicios, **Then** puede
   relacionarla con aplicaciones internas, APIs, integraciones, automatizaciones o software
   empresarial a medida.
3. **Given** una persona que no conoce la solución técnica que necesita, **When** lee los problemas
   abordados, **Then** reconoce resultados empresariales como reducir tareas manuales, conectar
   sistemas, centralizar información o digitalizar procesos.

---

### User Story 2 - Iniciar una conversación cualificada (Priority: P1)

Como cliente potencial, quiero dejar mis datos e indicar si prefiero una llamada, WhatsApp o correo
sin explicar todavía el proyecto, para que la empresa me contacte por la vía elegida.

**Why this priority**: La generación de consultas cualificadas es el objetivo comercial principal
de la landing.

**Independent Test**: Se puede completar y enviar una solicitud de contacto válida desde cualquier
llamada a la acción principal, verificando la selección del canal, la validación del dato de contacto,
la confirmación y el manejo de errores.

**Acceptance Scenarios**:

1. **Given** un visitante interesado, **When** activa una llamada principal a la acción,
   **Then** llega directamente al área de contacto y conserva el contexto de la página.
2. **Given** un visitante con datos válidos, **When** indica su nombre, elige llamada, WhatsApp o
   correo, aporta el dato requerido para ese canal, acepta el tratamiento y envía el formulario,
   **Then** recibe una confirmación clara con expectativas sobre el siguiente paso.
3. **Given** un formulario incompleto o inválido, **When** el visitante intenta enviarlo, **Then**
   recibe mensajes específicos junto a los campos afectados, conserva sus demás datos y puede
   corregirlos.
4. **Given** que el formulario no está disponible, **When** el visitante busca otra vía de contacto,
   **Then** encuentra un enlace de correo visible y utilizable.

---

### User Story 3 - Validar experiencia y confianza (Priority: P2)

Como responsable que evalúa un proveedor, quiero revisar experiencia técnica, forma de trabajo y
proyectos relevantes para determinar si el profesional puede asumir una solución empresarial con
responsabilidad.

**Why this priority**: La evidencia reduce el riesgo percibido y ayuda a que las consultas recibidas
provengan de prospectos con una expectativa informada.

**Independent Test**: Se puede navegar desde experiencia hacia proyectos y comprobar que cada caso
explica el problema, el aporte realizado, la solución y un resultado verificable sin afirmaciones
ambiguas o inventadas.

**Acceptance Scenarios**:

1. **Given** un visitante que revisa la experiencia, **When** lee esa sección, **Then** distingue
   competencias técnicas, capacidades de entrega y experiencia personal del historial de la nueva
   empresa.
2. **Given** un visitante que abre un proyecto, **When** revisa el caso, **Then** comprende el
   contexto, desafío, solución, responsabilidad asumida, capacidades aplicadas y resultado.
3. **Given** un proyecto sujeto a confidencialidad, **When** se presenta como experiencia,
   **Then** se describen el sector, el problema y el resultado sin revelar nombres ni información
   sensible.

### Edge Cases

- Si todavía existen pocos proyectos publicables, la sección muestra únicamente casos verificados y
  no inventa clientes, cifras, testimonios ni resultados para completar el diseño.
- Si un proyecto no tiene una métrica cuantitativa autorizada, se expresa un resultado cualitativo
  concreto y atribuible, sin cifras estimadas presentadas como hechos.
- Si falta contenido visual de un proyecto, el caso conserva jerarquía y comprensión mediante texto
  y recursos neutros accesibles, sin imágenes rotas ni espacios vacíos engañosos.
- Los textos extensos, nombres de empresa largos y direcciones de correo largas no provocan pérdida
  de contenido ni desplazamiento horizontal en pantallas pequeñas.
- La navegación y el formulario siguen siendo operables con teclado, ampliación de texto, reducción
  de movimiento y tecnologías de asistencia.
- En dispositivos móviles, la navegación, las llamadas a la acción y el formulario siguen siendo
  operables mediante interacción táctil tanto en portrait como en landscape cuando la orientación
  resulte aplicable; cualquier orientación no aplicable se justifica en la evidencia de validación.
- Ante una conexión lenta o un recurso que no carga, la propuesta, los servicios y el contacto
  continúan siendo legibles y utilizables.
- Los envíos repetidos, automatizados o maliciosos se rechazan sin exponer detalles internos ni
  impedir injustificadamente una consulta legítima.
- Tras un error de envío, los datos no sensibles permanecen disponibles para reintentar y nunca se
  muestra una confirmación falsa.
- Si el visitante elige llamada o WhatsApp, debe aportar un número telefónico válido; si elige
  correo, debe aportar una dirección de correo válida.

## Requirements *(mandatory)*

### Scope

**In scope**:

- Una landing pública de una sola experiencia narrativa con navegación hacia sus secciones.
- Presentación de propuesta de valor, servicios, problemas resueltos, experiencia, proyectos,
  contacto y pie de página.
- Captura y entrega segura de consultas de potenciales clientes.
- Experiencia completa para móvil, tableta, escritorio, teclado y tecnologías de asistencia.
- Información esencial para descubrimiento en buscadores y para compartir la página.
- El MVP publicable incluye las tres historias de usuario completas —oferta y servicios, contacto,
  experiencia y proyectos— junto con todos los controles transversales de lanzamiento. Las historias
  conservan pruebas independientes para desarrollo, pero ninguna constituye por sí sola una release
  pública del MVP.

**Out of scope**:

- Área privada, cuentas de usuario, panel administrativo o portal para clientes.
- Cotización automática, pagos, contratación o agenda de reuniones integrada.
- Blog, catálogo de productos, comercio electrónico o gestión comercial completa.
- Creación o invención de experiencia, proyectos, testimonios, marcas o métricas no aportadas y
  autorizadas por el propietario.
- Una versión multilingüe en el lanzamiento inicial.

### Functional Requirements

- **FR-001**: La página MUST presentar en su sección principal una propuesta de valor que identifique
  al proveedor, el público objetivo, el servicio de desarrollo a medida y el beneficio empresarial.
- **FR-002**: La sección principal MUST ofrecer una llamada primaria para hablar sobre un proyecto y
  una ruta secundaria para explorar trabajos realizados.
- **FR-003**: La navegación MUST permitir alcanzar servicios, experiencia, proyectos y contacto y
  MUST indicar con nombres comprensibles el destino de cada enlace.
- **FR-004**: La sección de servicios MUST cubrir aplicaciones internas, APIs, integraciones,
  automatizaciones y software empresarial a medida.
- **FR-005**: Cada servicio MUST relacionar una necesidad o problema reconocible con el resultado que
  puede obtener el cliente, evitando limitarse a una lista de tecnologías.
- **FR-006**: La página MUST explicar problemas abordables, incluidos procesos manuales repetitivos,
  sistemas desconectados, información dispersa, herramientas existentes insuficientes y nuevos
  flujos de trabajo digitales.
- **FR-007**: La sección de experiencia MUST separar con precisión la trayectoria del profesional de
  la antigüedad o experiencia atribuible a la nueva empresa.
- **FR-008**: La experiencia MUST comunicar competencias técnicas, tipos de sistemas construidos,
  capacidad para comprender procesos empresariales y forma general de colaboración.
- **FR-009**: La sección de proyectos MUST conservar una presentación completa y comprensible con
  entre uno y ocho casos verificados. El lanzamiento inicial MAY incluir menos de tres casos cuando
  no existan más proyectos autorizados para publicación, pero la interfaz MUST admitir tres o más
  casos simultáneos sin requerir un rediseño ni inventar contenido para completar la composición.
- **FR-010**: Cada proyecto publicado MUST incluir título, contexto o sector, problema, solución,
  responsabilidad del profesional, capacidades utilizadas y resultado verificable.
- **FR-011**: La presentación de proyectos MUST permitir anonimizar clientes y datos sujetos a
  confidencialidad sin perder la utilidad del caso.
- **FR-012**: Las llamadas a la acción distribuidas en la página MUST conducir a una única acción
  principal coherente: iniciar una conversación sobre un proyecto.
- **FR-013**: El formulario MUST solicitar únicamente nombre, canal de contacto preferido, el dato
  necesario para ese canal y aceptación informada del tratamiento de los datos.
- **FR-014**: El canal preferido MUST permitir elegir exactamente una opción entre llamada, WhatsApp
  o correo. Llamada y WhatsApp MUST requerir un número telefónico; correo MUST requerir una dirección
  de correo.
- **FR-015**: El formulario MUST validar los campos obligatorios y el formato del dato correspondiente
  al canal seleccionado antes del envío, y MUST identificar cada error con texto comprensible.
- **FR-016**: Un envío exitoso MUST confirmar que la empresa responderá por el canal elegido dentro
  de 1 día hábil y MUST ofrecer una forma de contactar nuevamente; un fallo MUST mostrar un estado
  honesto y permitir reintentar.
- **FR-017**: La página MUST ofrecer un correo electrónico como canal alternativo visible en contacto
  y en el pie de página.
- **FR-018**: El sistema MUST enviar cada solicitud válida al correo de la empresa con el nombre,
  dato de contacto, canal preferido, consentimiento y momento de envío, sin exigir almacenamiento
  adicional en un CRM o repositorio comercial.
- **FR-019**: El formulario MUST aplicar medidas contra abuso y automatización que no dependan de
  desafíos inaccesibles para una persona legítima.
- **FR-020**: La página MUST enlazar una política de privacidad comprensible que informe finalidad,
  datos recogidos, conservación, destinatarios y derechos de la persona conforme al marco aplicable
  en Argentina.
- **FR-021**: La página MUST recoger únicamente los datos necesarios, protegerlos durante su envío y
  evitar exponer información de solicitudes, credenciales o detalles internos. Los datos de una
  persona que no se convierta en cliente MUST eliminarse dentro de los 90 días posteriores al último
  contacto.
- **FR-022**: Todo contenido interactivo MUST ser utilizable con teclado, mostrar foco visible,
  comunicar nombre, función y estado, y conservar un orden de lectura lógico.
- **FR-023**: El contenido y las interacciones MUST conformar con WCAG 2.2 nivel AA, incluidos
  contraste, ampliación, alternativas textuales, objetivos táctiles, operación mediante touch y
  movimiento reducido.
- **FR-024**: La landing, la ruta de privacidad y la ruta de confirmación, incluidos sus estados
  relevantes, MUST conservar contenido y funcionalidad entre pantallas móviles pequeñas y
  escritorios, sin desplazamiento horizontal a un ancho de 320 píxeles. La validación MUST cubrir
  portrait y landscape cuando corresponda y justificar expresamente cualquier orientación no
  aplicable.
- **FR-025**: La identidad visual, jerarquía, contenido y estados MUST comunicar profesionalismo y
  confiabilidad y MUST evitar patrones genéricos, afirmaciones sin evidencia y presión artificial.
- **FR-026**: La página MUST incluir títulos y descripciones únicos, jerarquía semántica, información
  para compartir, dirección canónica e instrucciones coherentes de indexación.
- **FR-027**: El contenido público esencial MUST ser descubrible y comprensible por buscadores y
  MUST describir con precisión la oferta para empresas de Argentina y la modalidad remota del
  servicio.
- **FR-028**: La experiencia principal MUST seguir utilizable bajo condiciones móviles
  representativas, priorizando propuesta de valor, servicios y contacto sobre recursos decorativos.
- **FR-029**: El pie de página MUST incluir identidad profesional, navegación esencial, contacto,
  acceso a privacidad y aviso de derechos de autor vigente.
- **FR-030**: La página MUST representar estados de carga, éxito, error, contenido ausente y recursos
  no disponibles siempre que puedan ocurrir, sin dejar al usuario sin orientación.

### Key Entities *(include if feature involves data)*

- **Solicitud de contacto**: Petición enviada al correo de la empresa por un cliente potencial;
  contiene nombre, canal preferido, número telefónico o correo según corresponda, consentimiento,
  fecha de envío, fecha del último contacto, fecha límite de eliminación y estado de entrega.
- **Servicio**: Capacidad ofrecida; relaciona un nombre y explicación con problemas habituales,
  resultados esperables y una invitación a conversar.
- **Proyecto**: Caso verificable de trabajo realizado; contiene contexto, desafío, solución,
  responsabilidad, capacidades aplicadas, resultado, recursos autorizados y nivel de
  confidencialidad.
- **Perfil profesional**: Información verificada sobre posicionamiento, experiencia, competencias,
  forma de trabajo, modalidad de servicio y canales de contacto.

## Success Criteria *(mandatory)*

### Usability Validation Protocol

- La validación moderada MUST incluir como mínimo 10 participantes que representen al público
  objetivo: responsables de pequeñas o medianas empresas o personas con capacidad para evaluar o
  encargar software empresarial a medida.
- La muestra MUST incluir al menos cinco sesiones en un viewport móvil y cinco en un viewport de
  escritorio. Cada participante prueba la página por primera vez, sin ayuda del moderador y con datos
  de contacto de prueba proporcionados para la sesión.
- Cada sesión MUST evaluar: comprensión de la oferta tras 30 segundos, localización del contacto en
  15 segundos, envío del formulario en menos de 3 minutos y valoración individual de claridad,
  profesionalismo y confianza en una escala de 1 a 5.
- Los resultados MUST registrar dispositivo, tiempos, finalización, respuestas y puntuaciones sin
  conservar datos personales innecesarios. Cuando un porcentaje produzca una fracción de
  participante, el mínimo exigido se redondea hacia arriba.
- Los umbrales de SC-002 MUST calcularse y cumplirse por separado para la cohorte móvil y para la
  cohorte de escritorio; el resultado agregado no puede compensar el incumplimiento de una cohorte.
- Si una validación moderada no alcanza cualquiera de sus criterios, se documenta el hallazgo, se
  aplica una corrección consolidada en cualquier archivo afectado y se repite la validación con nueva
  evidencia. Cada ciclo registra los archivos modificados. Se permiten como máximo dos ciclos de
  corrección y repetición; si el criterio continúa incumplido, el lanzamiento queda bloqueado y
  requiere una revisión explícita del plan.

### Measurable Outcomes

- **SC-001**: Al menos el 80% de participantes representativos identifica en 30 segundos qué se
  ofrece, para quién y tres tipos de problemas que pueden resolverse.
- **SC-002**: Al menos el 90% de participantes de la cohorte móvil y, de forma independiente, al menos
  el 90% de participantes de la cohorte de escritorio encuentra cómo iniciar contacto en 15 segundos
  sin ayuda.
- **SC-003**: Al menos el 90% de participantes con datos válidos completa y envía una solicitud en
  menos de 3 minutos en su primer intento.
- **SC-004**: El 100% de las solicitudes aceptadas contiene nombre, un canal preferido, un dato válido
  para ese canal y consentimiento registrado.
- **SC-005**: El 100% de los proyectos publicados identifica problema, aporte y resultado y cuenta
  con aprobación del propietario para divulgar su contenido.
- **SC-006**: El 100% de los recorridos críticos evaluados puede completarse usando solo teclado y
  cumple los criterios aplicables de WCAG 2.2 nivel AA en revisión automática y manual.
- **SC-007**: En tres auditorías móviles consecutivas de Lighthouse ejecutadas en laboratorio sobre
  el build estático servido en un entorno controlado previo al despliegue y con el mismo perfil
  documentado, la página principal alcanza en cada ejecución un LCP menor o igual a 2,5 segundos, un
  CLS menor o igual a 0,1 y un TBT menor o igual a 200 milisegundos; cualquier incumplimiento bloquea
  el lanzamiento del MVP. La comprobación posterior contra la URL pública es un control operativo
  separado.
- **SC-008**: La landing, privacidad y confirmación, incluidos sus estados relevantes, no pierden
  contenido, generan desplazamiento horizontal ni impiden completar una acción esencial entre 320 y
  1440 píxeles. En mobile, la interacción mediante touch se valida en portrait y landscape cuando
  corresponda; toda orientación no aplicable queda justificada en la evidencia.
- **SC-009**: El 100% de envíos válidos muestra un resultado inequívoco y las solicitudes confirmadas
  llegan al correo de la empresa sin pérdida durante las pruebas de aceptación.
- **SC-010**: Dentro de los primeros 90 días con al menos 500 visitas relevantes, un mínimo del 3%
  inicia el formulario y un mínimo del 1% envía una consulta cualificada.
- **SC-011**: En las pruebas moderadas definidas por el protocolo, al menos el 85% de participantes
  califica con 4 o más sobre 5 cada dimensión evaluada: claridad, profesionalismo y confianza
  percibida.
- **SC-012**: El 100% de los datos de solicitantes que no se convierten en clientes se elimina dentro
  de los 90 días posteriores al último contacto.
- **SC-013**: El 100% de las solicitudes válidas recibe un intento de contacto por la vía elegida
  dentro de 1 día hábil desde su envío.

## Assumptions

- El lanzamiento inicial será en español, priorizará Argentina y ofrecerá los servicios de forma
  remota a pequeñas y medianas empresas y a responsables con poder para explorar o encargar una
  solución.
- El desarrollador opera como profesional independiente que inicia una empresa; la página no
  atribuirá a la empresa una antigüedad, equipo o cartera que pertenezca a su experiencia personal.
- El propietario proporcionará antes de publicar su nombre o marca, correo, modalidad o ubicación
  de servicio, competencias verificadas, proyectos autorizados y resultados atribuibles.
- La conversación inicial no constituye un presupuesto vinculante; el alcance y precio se preparan
  después de entender el proyecto.
- Una solicitud se considera un cliente potencial cualificado solo después de que el contacto
  posterior confirme una necesidad dentro de los servicios ofrecidos; el formulario no realiza esa
  cualificación.
- El correo será el canal alternativo universal. Enlaces a redes profesionales podrán añadirse si
  son aportados y mantenidos por el propietario.
- Los datos de una solicitud que no se convierta en cliente se conservarán como máximo 90 días desde
  el último contacto; una relación contractual posterior tendrá su propio plazo y fundamento de
  conservación.
- La medición de conversión será agregada, respetará las decisiones de privacidad y excluirá tráfico
  automatizado conocido.
- No existen dependencias de sistemas de usuarios, pagos o gestión comercial para el alcance inicial.
