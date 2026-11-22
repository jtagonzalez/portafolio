# Portafolio · José Fernando González Lozano

Portafolio bilingüe (ES/EN) de proyectos de backend, automatización e IA.

**Stack:** React 19 + Vite · React Router (rutas `/es/...` y `/en/...`) · React-Bootstrap + Sass · simple-icons.

## Lo que incluye

- **Rutas por idioma** con un botón ES/EN que conserva la página, los filtros y el scroll. Textos en
  `src/i18n/{es,en}.json`.
- **Tarjetas de proyecto** con portada, resumen, etiquetas y logos de tecnologías abajo. **Filtros** por tecnología
  (cualquiera/todas) que se guardan en la URL (`?tech=python,react`).
- **Detalle de proyecto:** descripción, **diagrama de arquitectura animado** (un paquete viaja paso a paso, se maneja
  con botones, teclado o clic en los nodos y se reacomoda en vertical en móvil), stack, galería de capturas y videos
  (modal), desafíos (acordeón) y logros.
- **Terminal interactiva** en la portada (`help`, `projects`, `open <proyecto>`, `skills`, `contact`, `cv`, `theme`,
  `lang en`), con historial (↑/↓) y autocompletado (Tab).
- **Sobre mí** con una línea de tiempo filtrable (gestión ambiental → desarrollo) y el stack.
- **Modo claro/oscuro** (respeta la preferencia del sistema y no parpadea al cargar), contacto en todas las páginas y
  descarga del CV.
- **Accesibilidad:** skip link, foco visible, `lang` dinámico, `aria-live` en el diagrama y la terminal, respeta
  `prefers-reduced-motion` y contraste AA o superior (ver `docs/PALETA.md`).

## Correr en local

```powershell
npm install
npm run dev
```

Abre http://localhost:5173 (redirige a `/es` o `/en` según el idioma del navegador).

```powershell
npm run build      # build de producción en dist/
npm run preview    # sirve dist/ en http://localhost:4173
npm run placeholders   # genera imágenes de relleno para proyectos sin capturas
```

## Documentación

- [docs/GUIA-CONTENIDO.md](docs/GUIA-CONTENIDO.md): cómo agregar proyectos, capturas, videos y tecnologías.
- [docs/PALETA.md](docs/PALETA.md): paleta de 4 colores, justificación, regla 60-30-10, jerarquía y contraste WCAG.
- [docs/HOSTING.md](docs/HOSTING.md): comparación de hosting (Vercel recomendado) y pasos para publicar.

## Estructura

```
src/
  content/      projects.js (datos y diagramas) · techs.js (logos) · site.js (enlaces)
  i18n/         es.json · en.json (todos los textos)
  components/   ArchitectureDiagram, Terminal, ProjectCard, TechFilter, MediaGallery, Timeline…
  pages/        Home, Projects, ProjectDetail, About, NotFound
  styles/       main.scss (tokens de color + Bootstrap)
public/
  media/<slug>/ portadas, capturas y videos de cada proyecto
  cv/           hoja de vida en PDF
```
