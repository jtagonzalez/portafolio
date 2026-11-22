# Hosting: recomendación

**Recomendado: Vercel (plan Hobby, gratis) con las imágenes y los videos dentro de `public/media/`.**
Cloudinary solo si algún día los videos pasan de unos 20–30 MB en total.

> Los límites de los planes gratuitos cambian seguido. Revísalos en la página de precios de cada servicio antes de
> decidir; aquí van como referencia.

| | Vercel | Netlify | GitHub Pages | Cloudinary |
|---|---|---|---|---|
| Rutas `/es/...` y `/en/...` (SPA) | ✅ `vercel.json` (ya incluido) | ✅ `public/_redirects` (ya incluido) | ⚠️ No soporta rewrites; toca usar el truco del `404.html` | — (no sirve la web) |
| Deploy desde GitHub | ✅ automático en cada push + previews por PR | ✅ igual | ✅ con GitHub Actions | — |
| CDN global y HTTPS | ✅ | ✅ | ✅ | ✅ (para medios) |
| Imágenes y videos livianos | ✅ desde `public/` | ✅ | ✅ (repo < 1 GB) | ✅ optimiza y transcodifica |
| Dominio propio gratis | ✅ (subdominio `*.vercel.app`) | ✅ (`*.netlify.app`) | ✅ (`*.github.io`) | — |
| Fricción | Mínima con Vite | Mínima | Media | Requiere cuenta y URLs externas |

**Por qué Vercel:**
- Detecta Vite solo (build `npm run build`, salida `dist`).
- `vercel.json` ya reescribe cualquier ruta a `index.html`, así que `/es/projects/kamasmarket` funciona si se abre
  directo o se recarga. También cachea `/assets` un año.
- Cada push genera una URL de preview: útil para revisar cambios antes de publicarlos.
- El plan Hobby es para uso personal y no comercial; un portafolio entra ahí.

**Medios:** con capturas en WebP (~100–300 KB) y clips MP4/WebM cortos (< 3–4 MB cada uno), todo cabe en el repo y
sale por la CDN de Vercel. Pásate a Cloudinary (o YouTube sin listar, como respaldo) solo si los videos crecen.

## Publicar (cuando decidas)

1. Crear el repositorio en GitHub y subir el código (`git push`).
2. Entrar a vercel.com → *Add New Project* → importar el repo → *Deploy* (sin configurar nada).
3. Copiar la URL final a `src/content/site.js` → `url` (se usa en canonical y hreflang).
4. Opcional: agregar un dominio propio en *Settings → Domains*.

## Lighthouse

Corre Lighthouse sobre el **build de producción**, no sobre `npm run dev`:

```powershell
npm run build
npm run preview
```

Luego abre `http://localhost:4173/es` en Chrome → DevTools (F12) → pestaña **Lighthouse** → *Mobile* → *Analyze*.
