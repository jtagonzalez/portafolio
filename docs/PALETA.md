# Paleta de color

## Los 4 colores

| Rol | Nombre | Oscuro (por defecto) | Claro | Tono (HSL) |
|---|---|---|---|---|
| Base neutra | **Tinta** | `#0D1626` (fondo) | `#0D1626` (texto) | 218° |
| Base neutra | **Papel** | `#EEF2F6` (texto) | `#F5F7FA` (fondo) | 216° |
| Estructura | **Teal** | `#2DD4BF` | `#0F766E` | 172° |
| Acción | **Coral** | `#FF8A65` | `#FF8A65` fondo / `#B93C1D` texto | 14° |

Las superficies (`#16223A`, `#FFFFFF`) y el texto secundario (`#A9B4C4`, `#4A5568`) no son colores nuevos: son
**tonos de Tinta y Papel** (mismo tono de 216–218°, solo cambia la luminosidad). El teal y el coral tienen una
versión más oscura para texto en modo claro, con el mismo tono y menos luminosidad.

## Por qué estos colores (ciencia del color)

1. **Armonía complementaria dividida.** El complemento exacto del coral (14°) está en 194°. En vez de usar ese
   cian puro, se toman sus dos vecinos a ±22°: **teal (172°)** y **azul tinta (218°)**. Así se mantiene el contraste
   cálido/frío del complementario (el coral resalta al máximo sobre el fondo frío) sin la vibración visual de dos
   complementarios puros con la misma saturación.
2. **Contraste de temperatura.** El fondo y la estructura son fríos (azul y teal) y la acción es cálida (coral). El
   ojo va primero a lo cálido, por eso el coral se reserva para lo que queremos que el reclutador haga: descargar el
   CV, ver proyectos y reproducir el diagrama.
3. **Asociación semántica.** El azul tinta transmite confianza y profundidad técnica (terminales, IDEs). El teal se
   asocia a tecnología, datos y "sistema funcionando". El coral da calidez y energía sin la connotación de error del
   rojo puro.
4. **Contraste simultáneo.** Sobre un fondo casi negro y azulado, el coral se percibe más cálido y brillante, y el
   teal más luminoso. Por eso funcionan con saturación moderada.

## Proporción 60-30-10

| % | Color | Dónde |
|---|---|---|
| **60 %** | Tinta / Papel (neutros) | Fondo de página, superficies de tarjetas, texto |
| **30 %** | Teal | Estructura e información: enlaces, etiquetas, navegación activa, bordes de foco del diagrama, línea de tiempo, logos del kicker `$` |
| **10 %** | Coral | Solo acción y estado actual: botón **Descargar CV**, **Ver proyectos**, **Reproducir** del diagrama, paquete animado, nodo activo, "hoy" en la línea de tiempo |

Regla práctica: si en una pantalla hay más de 2 o 3 elementos coral, alguno sobra.

## Jerarquía y distribución de la página

1. **Hero (arriba del pliegue):** quién soy y qué busco (H1 grande), y un CTA coral principal (*Ver proyectos*) con
   secundarios en contorno teal (*CV*, *Contacto*). A la derecha, la terminal interactiva como "gancho" visual.
2. **Proyectos destacados:** 3 tarjetas. El ojo recorre imagen → nombre → resumen → logos (lectura en Z).
3. **Página de proyectos:** filtros (chips) → contador → cuadrícula 1/2/3 columnas según el ancho.
4. **Detalle:** resumen + enlaces → **diagrama interactivo** (lo más llamativo, arriba) → stack → demo → desafíos
   (acordeón) → logros.
5. **Contacto:** bloque al final de **todas** las páginas, para que el CTA nunca quede lejos.

## Contraste WCAG 2.2 (verificado)

| Par | Ratio | Nivel |
|---|---|---|
| Papel `#EEF2F6` sobre Tinta `#0D1626` | 16.1 : 1 | AAA |
| Tinta sobre Papel `#F5F7FA` | 16.9 : 1 | AAA |
| Texto secundario `#A9B4C4` sobre superficie `#16223A` | 7.6 : 1 | AAA |
| Texto secundario `#4A5568` sobre blanco | 7.5 : 1 | AAA |
| Teal `#2DD4BF` sobre Tinta | 9.7 : 1 | AAA |
| Teal oscuro `#0F766E` sobre Papel | 5.1 : 1 | AA |
| Coral `#FF8A65` sobre Tinta | 7.8 : 1 | AAA |
| Tinta sobre botón Coral | 7.8 : 1 | AAA |
| Coral oscuro `#B93C1D` sobre Papel | 5.3 : 1 | AA |
| Etiqueta teal (modo claro, fondo translúcido) | 4.75 : 1 | AA |
| Etiqueta coral (modo claro, fondo translúcido) | 4.86 : 1 | AA |
| Etiqueta coral (modo oscuro) | 5.0 : 1 | AA |

Nota: el texto blanco sobre coral **no** pasa (≈ 2.3 : 1). Por eso los botones coral llevan texto Tinta.

Los tokens están en `src/styles/main.scss` (`:root` / `[data-bs-theme='dark']`).
