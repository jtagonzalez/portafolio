// Genera imágenes SVG de relleno (portada y capturas) para cada proyecto que aún no tenga medios reales.
// Uso: npm run placeholders   (no sobrescribe archivos que ya existan)
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PROJECTS } from '../src/content/projects.js'
import { TECHS } from '../src/content/techs.js'
import es from '../src/i18n/es.json' with { type: 'json' }

const OUT = 'public/media'
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const cover = (name, tags, hue) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0D1626"/><stop offset="1" stop-color="#16223A"/>
    </linearGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#2DD4BF" stroke-opacity=".08"/>
    </pattern>
  </defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect width="1280" height="720" fill="url(#p)"/>
  <circle cx="${1000 + hue}" cy="160" r="260" fill="#2DD4BF" fill-opacity=".10"/>
  <circle cx="${1120 - hue}" cy="600" r="170" fill="#FF8A65" fill-opacity=".12"/>
  <rect x="80" y="250" width="72" height="10" rx="5" fill="#FF8A65"/>
  <text x="80" y="350" font-family="Inter, Segoe UI, sans-serif" font-size="76" font-weight="800" fill="#EEF2F6">${esc(name)}</text>
  <text x="80" y="420" font-family="JetBrains Mono, Consolas, monospace" font-size="30" fill="#2DD4BF">${esc(tags)}</text>
</svg>
`

const demo = (name, caption, n) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" width="1280" height="800">
  <rect width="1280" height="800" fill="#16223A"/>
  <rect x="0" y="0" width="1280" height="56" fill="#0D1626"/>
  <circle cx="34" cy="28" r="9" fill="#FF8A65"/><circle cx="64" cy="28" r="9" fill="#3B4A63"/><circle cx="94" cy="28" r="9" fill="#2DD4BF"/>
  <rect x="60" y="110" width="360" height="620" rx="16" fill="#1D2B47"/>
  <rect x="460" y="110" width="760" height="300" rx="16" fill="#1D2B47"/>
  <rect x="460" y="440" width="365" height="290" rx="16" fill="#1D2B47"/>
  <rect x="855" y="440" width="365" height="290" rx="16" fill="#1D2B47"/>
  <polyline points="500,360 600,300 700,330 800,240 900,270 1000,190 1180,220" fill="none" stroke="#2DD4BF" stroke-width="6" stroke-linecap="round"/>
  <text x="640" y="610" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="40" font-weight="700" fill="#EEF2F6">${esc(name)} · demo ${n}</text>
  <text x="640" y="660" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="24" fill="#A9B4C4">${esc(caption)}</text>
  <text x="640" y="700" text-anchor="middle" font-family="JetBrains Mono, Consolas, monospace" font-size="20" fill="#FF8A65">captura pendiente / screenshot pending</text>
</svg>
`

let made = 0
PROJECTS.forEach((p, i) => {
  const text = es.projectsContent[p.slug]
  const dir = join(OUT, p.slug)
  mkdirSync(dir, { recursive: true })
  const write = (file, content) => {
    const f = join(dir, file)
    if (existsSync(f)) return
    writeFileSync(f, content)
    made++
  }
  write('cover.svg', cover(text.name, p.techs.slice(0, 4).map((id) => TECHS[id].title).join('  ·  '), (i * 37) % 120))
  p.media.forEach((m, n) => {
    if (m.src.endsWith('.svg')) write(m.src.split('/').pop(), demo(text.name, text.media[n] ?? '', n + 1))
  })
})
console.log(`Placeholders creados: ${made}`)
