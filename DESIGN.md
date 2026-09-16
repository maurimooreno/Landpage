---
name: Taller Norte
description: Un plano técnico editorial para explicar intervenciones de software con precisión y confianza.
colors:
  paper: '#edf0eb'
  paper-deep: '#dfe5df'
  ink: '#102720'
  ink-muted: '#40564f'
  rule: '#aab8b2'
  plan: '#0b6684'
  plan-dark: '#07475e'
  mark: '#bd452d'
typography:
  display:
    fontFamily: 'Saira Variable, Arial Narrow, sans-serif'
    fontSize: 'clamp(3rem, 6.3vw, 6rem)'
    fontWeight: 570
    lineHeight: 0.93
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Saira Variable, Arial Narrow, sans-serif'
    fontSize: 'clamp(2.2rem, 5.2vw, 5.3rem)'
    fontWeight: 590
    lineHeight: 0.98
    letterSpacing: '-0.035em'
  title:
    fontFamily: 'Saira Variable, Arial Narrow, sans-serif'
    fontSize: 'clamp(1.45rem, 2.2vw, 2.2rem)'
    fontWeight: 610
    lineHeight: 1.1
  body:
    fontFamily: 'Source Sans 3 Variable, sans-serif'
    fontSize: 'clamp(1rem, 0.3vw + 0.94rem, 1.125rem)'
    fontWeight: 400
    lineHeight: 1.58
  label:
    fontFamily: 'Saira Variable, Arial Narrow, sans-serif'
    fontSize: '0.78rem'
    fontWeight: 650
    letterSpacing: '0.08em'
rounded:
  sharp: '0'
spacing:
  xs: '0.35rem'
  sm: '0.8rem'
  md: '1rem'
  lg: '1.5rem'
  xl: '2rem'
  section: 'clamp(4.5rem, 9vw, 9rem)'
components:
  action-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    typography: '{typography.title}'
    rounded: '{rounded.sharp}'
    padding: '0.7rem 0.9rem'
    height: '3rem'
  action-primary-hover:
    backgroundColor: '{colors.plan-dark}'
    textColor: '{colors.paper}'
  action-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.title}'
    rounded: '{rounded.sharp}'
    padding: '0.7rem 0.9rem'
    height: '3rem'
  field:
    backgroundColor: 'rgb(255 255 255 / 0.54)'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.sharp}'
    padding: '0.75rem 0.9rem'
    height: '3.25rem'
---

# Design System: Taller Norte

## Overview

**Creative North Star: "Plano de intervención"**

Taller Norte se presenta como un plano técnico que permite leer una intervención antes de ejecutarla. La composición es editorial, precisa y deliberadamente sobria: reglas, coordenadas, tablas y ejes de proceso convierten el trabajo de software en algo concreto y examinable.

La interfaz mantiene una densidad profesional sin sentirse burocrática. El papel verdoso y la tinta profunda aportan materialidad; el azul identifica recorridos y decisiones, mientras que el naranja actúa como marca de corrección. Se evita la estética genérica de landing tecnológica, los gradientes decorativos, las tarjetas repetidas y las promesas visuales sin evidencia.

**Key Characteristics:**

- Retícula técnica visible, divisores finos y alineaciones estrictas.
- Jerarquía tipográfica compacta y expresiva, con titulares angostos y cuerpo muy legible.
- Superficies planas; el contraste tonal y la geometría crean profundidad.
- Azul de plano para recorridos y naranja de corrección para foco, iconos y alertas.
- Componentes rectangulares, táctiles y honestos, sin ornamento superfluo.

## Colors

La paleta combina papel frío, tinta vegetal y dos acentos funcionales tomados del lenguaje de planos intervenidos.

### Primary

- **Azul de plano**: identifica recorridos, progreso, selección y elementos operativos activos.
- **Azul de plano profundo**: sostiene fondos de contacto, estados intensos y texto de resultado.

### Secondary

- **Marca de corrección**: señala foco, iconos direccionales, advertencias y anotaciones puntuales; nunca domina superficies extensas.

### Neutral

- **Papel de taller**: fondo principal y lienzo de lectura.
- **Papel prensado**: pie, rieles y capas neutrales secundarias.
- **Tinta forestal**: texto principal, fondos de alto contraste y bordes estructurales.
- **Tinta atenuada**: texto explicativo y metadatos.
- **Regla metálica**: divisores, marcos y ejes inactivos.

**The Intervention Mark Rule.** La marca naranja solo aparece donde una corrección, dirección o estado necesita atención inmediata; su rareza preserva su fuerza.

**The Paper-and-Ink Rule.** Las superficies principales nacen del papel y la tinta; el azul organiza el recorrido, no sustituye la base neutral.

## Typography

**Display Font:** Saira Variable (con Arial Narrow y sans-serif como respaldo)  
**Body Font:** Source Sans 3 Variable (con sans-serif como respaldo)

**Character:** Saira aporta la tensión vertical y la precisión de una rotulación técnica sin caer en una tipografía monoespaciada. Source Sans 3 mantiene la lectura natural y confiable en explicaciones, avisos y formularios.

### Hierarchy

- **Display** (peso 570, escala fluida, interlineado 0.93): propuesta principal y títulos de página; ancho controlado y equilibrio de líneas.
- **Headline** (peso 590, escala fluida, interlineado 0.98): apertura de secciones, generalmente limitada a unas quince letras por línea visual.
- **Title** (peso 610, escala fluida, interlineado 1.1): servicios, casos y capacidades.
- **Body** (peso 400, escala fluida, interlineado 1.58): explicaciones de hasta aproximadamente 52-68 caracteres por línea según el contexto.
- **Label** (peso 650, 0.78rem, espaciado 0.08em, mayúsculas): coordenadas, códigos, encabezados de tabla y metadatos.

**The Two-Instruments Rule.** Saira rotula estructura y acción; Source Sans 3 explica. No agregar una tercera voz tipográfica.

**The Compressed-Headline Rule.** Los titulares grandes usan interlineado cerrado y medida corta; el cuerpo recupera aire y longitud para sostener la lectura.

## Layout

El lienzo usa un contenedor centrado de hasta 92rem, con canal lateral fluido entre 1.1rem y 4.5rem. Las secciones se separan por una regla superior y un ritmo vertical fluido entre 4.5rem y 9rem. En escritorio predominan composiciones asimétricas de dos columnas y tablas de tres columnas; el contenido se alinea con ejes compartidos en vez de encerrarse en tarjetas.

El sistema colapsa primero las composiciones amplias alrededor de 64rem y convierte navegación, tablas, casos y pie en una sola columna alrededor de 48rem. Los controles agrupados y el plano de proceso se compactan por debajo de 35rem; la matriz técnica llega a una columna solo en anchos extremadamente estrechos. Los objetivos táctiles conservan al menos unas 3rem de altura y nunca dependen exclusivamente de hover.

**The Shared-Axis Rule.** Cada bloque debe encontrar una línea, columna o coordenada común; evitar islas flotantes sin relación espacial.

## Elevation & Depth

El sistema es plano por defecto y no usa sombras ambientales para separar contenido. La profundidad surge de cambios tonales, fondos de tinta, bordes de un píxel, una retícula tenue y superposiciones funcionales como la cabecera translúcida. Los únicos halos aparecen como respuesta de foco en campos, nunca como decoración permanente.

**The Flat-Plan Rule.** Una superficie en reposo no se eleva; primero se resuelve con contraste, regla y posición.

## Shapes

La forma es ortogonal y precisa: esquinas rectas, marcos de un píxel, líneas discontinuas solo para transiciones secundarias y pequeños cuadrados para coordenadas o estados. Los recortes, ejes y cruces responden al lenguaje del dibujo técnico. No se utilizan pastillas, burbujas ni radios amables como atajo de jerarquía.

**The Sharp-Corner Rule.** Los controles y contenedores mantienen radio cero. La expresividad viene de la proporción, el color y la línea.

## Components

### Buttons

- **Shape:** rectángulo de esquinas rectas, con una altura táctil mínima de 3rem y contenido distribuido entre etiqueta e icono direccional.
- **Primary:** tinta forestal sobre texto claro, borde estructural y relleno compacto; al pasar el puntero cambia a azul profundo y se desplaza dos píxeles hacia arriba.
- **Hover / Focus:** transiciones breves; el foco visible usa una marca naranja exterior de tres píxeles.
- **Secondary:** fondo transparente y borde de regla; en hover refuerza el borde y suma una película clara, sin convertirse en otra llamada principal.

### Cards / Containers

- **Corner Style:** esquinas rectas.
- **Background:** papel transparente o tinta completa segun la seccion.
- **Shadow Strategy:** ninguna sombra en reposo.
- **Border:** reglas superiores e inferiores que conectan filas; los casos se leen como láminas, no como tarjetas independientes.
- **Internal Padding:** ritmo fluido basado en 1rem, 1.5rem y 2rem.

### Inputs / Fields

- **Style:** campo rectangular de al menos 3.25rem, borde de regla y fondo blanco translúcido sobre papel; en la sección oscura adopta un fondo blanco al nueve por ciento.
- **Focus:** borde azul o blanco según el fondo, con halo de tres píxeles y foco global naranja cuando corresponde.
- **Error / Disabled:** error mediante borde y texto de corrección; el botón deshabilitado conserva forma y reduce opacidad sin desaparecer.

### Navigation

La cabecera es compacta, fija durante el desplazamiento y ligeramente translúcida. La marca combina nombre y descriptor; los enlaces usan Saira y subrayado solo como respuesta. En mobile, un índice nativo despliega enlaces rectangulares con divisores y objetivos táctiles amplios.

### Process Plan

El componente firma representa tres hitos sobre un eje horizontal. Cada foco o hover avanza la línea hasta su posición, el punto activo invierte azul y papel, y el tercer hito se formula como acción final. La nota de diagnóstico usa un pequeño icono SVG de giro y la marca naranja.

### Channel Selector

Las vías de contacto forman un control segmentado rectangular de tres columnas. La opción activa invierte a papel claro sobre azul profundo; en mobile los segmentos se apilan y conservan sus divisores. El foco visible nunca depende del cambio de fondo.

### Project Sheet

Cada caso se presenta como lámina numerada: cabecera a la izquierda, definición problema-aporte-solución a la derecha y tecnologías alineadas al mismo eje. La etiqueta de demostración usa una marca fina naranja para separar evidencia sintética de afirmaciones verificadas.

## Do's and Don'ts

### Do:

- **Do** construir jerarquía mediante ejes compartidos, reglas de un píxel y contraste de papel/tinta.
- **Do** reservar el azul para recorrido y estado, y el naranja para correcciones, foco e iconos direccionales.
- **Do** usar Saira para estructura y Source Sans 3 para explicación, respetando medidas de lectura controladas.
- **Do** mantener objetivos táctiles amplios, foco visible y estados que funcionen sin hover.
- **Do** identificar de forma inequívoca cualquier evidencia demostrativa.

### Don't:

- **Don't** introducir gradientes decorativos, tarjetas repetitivas o héroes tecnológicos genéricos.
- **Don't** redondear controles y contenedores; el lenguaje formal es ortogonal.
- **Don't** usar sombras como sustituto de una jerarquía espacial clara.
- **Don't** saturar la página con la marca naranja ni usarla como fondo dominante.
- **Don't** agregar insignias, adornos o promesas visuales que no aporten evidencia o dirección.
