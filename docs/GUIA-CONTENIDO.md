# Guía rápida: agregar proyectos, capturas y videos

Todo el contenido está en 3 lugares:

| Archivo | Qué tiene |
|---|---|
| `src/content/projects.js` | Lo que **no** depende del idioma: slug, tecnologías, imágenes, enlaces y forma del diagrama |
| `src/i18n/es.json` y `src/i18n/en.json` | Todos los textos. Los de cada proyecto van en `projectsContent.<slug>` |
| `src/content/techs.js` | El registro de tecnologías (nombre y logo) |
| `src/content/site.js` | Tus enlaces: CV, GitHub, LinkedIn, URL final del sitio |

## 1. Agregar un proyecto

1. En `src/content/projects.js`, copia un bloque existente y cambia:
   - `slug`: el identificador en la URL (`/es/projects/<slug>`), en minúsculas y con guiones.
   - `featured: true` si quieres que salga en la portada.
   - `status`: `production`, `work` (empresa) o `personal`.
   - `techs`: ids de `techs.js` (ej. `['python', 'fastapi']`). **El orden importa**: los primeros 8 salen como logos
     en la tarjeta.
   - `links.live` y `links.repo` (`null` si es privado).
2. En **los dos** JSON (`es.json` y `en.json`), dentro de `projectsContent`, agrega un bloque con el mismo `slug`:
   `name`, `summary`, `tags`, `role`, `period`, `description` (lista de párrafos), `challenges` (lista de
   `{problem, solution}`), `achievements`, `media` (pies de foto, uno por imagen) y `diagram`.
3. Corre `npm run placeholders` para generar una portada y capturas de relleno mientras consigues las reales.

## 2. El diagrama de arquitectura

El lienzo mide 840 × 400. Cada nodo se centra en `(x, y)`. Las columnas que ya se usan son x = 90, 262, 450 y 660,
y las filas y = 58, 200 y 342.

```js
diagram: {
  nodes: [ { id: 'user', x: 90, y: 200 }, { id: 'api', x: 450, y: 200 } ],
  steps: [ { from: 'user', to: 'api' } ],   // cada paso = un viaje del paquete
}
```

Y en cada JSON de idioma:

```json
"diagram": {
  "nodes": { "user": ["Usuario", "navegador"], "api": ["FastAPI", "async"] },
  "steps": [ { "title": "…", "text": "…", "code": "opcional: GET /algo" } ]
}
```

`steps` debe tener el **mismo número y orden** en `projects.js` y en los JSON. En celular el diagrama se reacomoda
solo en una columna vertical.

## 3. Capturas y videos

Cada proyecto tiene su carpeta: `public/media/<slug>/`.

**Imágenes:**
1. Toma la captura (ideal 1280–1600 px de ancho, proporción 16:10 o 16:9).
2. Conviértela a **WebP** con calidad ~80 (squoosh.app o `cwebp -q 80 in.png -o out.webp`). Debería quedar en
   100–300 KB.
3. Guárdala como `public/media/<slug>/catalogo.webp` y cambia la ruta en `projects.js`:
   ```js
   media: [ { type: 'image', src: '/media/kamasmarket/catalogo.webp' } ]
   ```
4. Para la portada de la tarjeta, reemplaza `cover: '/media/<slug>/cover.svg'` por tu imagen (16:9).
5. Agrega el pie de foto en `media` de cada JSON, en el mismo orden.

**Videos (clips cortos):**
1. Graba de 10 a 30 segundos (Win + Alt + R en Windows, o OBS).
2. Comprímelo a MP4 H.264 sin audio, máximo 1280 px de ancho:
   ```powershell
   ffmpeg -i grabacion.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart demo.mp4
   ```
   Apunta a menos de 3–4 MB.
3. Saca un fotograma como póster: `ffmpeg -i demo.mp4 -ss 2 -frames:v 1 demo.webp`
4. Agrégalo a `projects.js`:
   ```js
   { type: 'video', src: '/media/kamasmarket/demo.mp4', poster: '/media/kamasmarket/demo.webp' }
   ```
   El video solo se descarga cuando alguien lo abre.

**Datos sensibles:** en lo de Corlide y en Cruces usa datos ficticios o difumina nombres, cédulas y direcciones antes
de capturar. Nunca subas capturas con datos reales de ciudadanos.

## 4. Agregar una tecnología nueva

En `src/content/techs.js`:
- Si existe en [simpleicons.org](https://simpleicons.org): `import { siNombre } from 'simple-icons'` y
  `miid: fromSi(siNombre, { cat: 'backend' })`.
- Si no existe: `miid: { title: 'Nombre', mono: 'AB', color: '#123456', cat: 'data' }` (se pinta un monograma).

## 5. Textos de la interfaz

Cualquier texto fijo (menú, botones, hero, línea de tiempo, terminal) está en `es.json` / `en.json`. Si falta una
clave en inglés, en desarrollo sale un aviso en la consola y se muestra la versión en español.

## 6. CV

Reemplaza `public/cv/Jose-Gonzalez-CV.pdf` por la versión nueva, con el mismo nombre. Ojo: ese PDF queda
**público** e incluye tu teléfono y tu correo.
