// Datos que NO cambian con el idioma: slug, tecnologías, medios, enlaces y la forma del diagrama.
// Los textos (nombre, resumen, descripción, desafíos, logros, pasos del diagrama, textos alternativos)
// viven en src/i18n/es.json y src/i18n/en.json, bajo "projectsContent.<slug>".
//
// Diagrama: lienzo de 840 × 400. Cada nodo es un rectángulo centrado en (x, y).
// Cada paso es un viaje del paquete de un nodo a otro: { from, to }.
// El orden de `steps` debe coincidir con el array de pasos del JSON de idioma.

const ph = (slug, n) => `/media/${slug}/demo-${n}.svg`

export const PROJECTS = [
  {
    slug: 'kamasmarket',
    year: 2026,
    featured: true,
    status: 'production',
    techs: ['python', 'fastapi', 'postgresql', 'supabase', 'solidity', 'bsc', 'usdt', 'wompi', 'nowpayments', 'docker', 'linux', 'javascript', 'bootstrap', 'telegram'],
    cover: '/media/kamasmarket/cover.svg',
    media: [
      { type: 'image', src: ph('kamasmarket', 1) },
      { type: 'image', src: ph('kamasmarket', 2) },
      { type: 'image', src: ph('kamasmarket', 3) },
      // { type: 'video', src: '/media/kamasmarket/compra.mp4', poster: '/media/kamasmarket/compra.webp' },
    ],
    links: { live: 'https://kamasmarket.com/en', repo: null },
    diagram: {
      nodes: [
        { id: 'user', x: 90, y: 200 },
        { id: 'web', x: 262, y: 200 },
        { id: 'api', x: 450, y: 200 },
        { id: 'gw', x: 450, y: 58 },
        { id: 'db', x: 450, y: 342 },
        { id: 'escrow', x: 660, y: 58 },
        { id: 'notify', x: 660, y: 200 },
        { id: 'worker', x: 660, y: 342 },
      ],
      steps: [
        { from: 'user', to: 'web' },
        { from: 'web', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'gw', to: 'api' },
        { from: 'api', to: 'escrow' },
        { from: 'api', to: 'worker' },
        { from: 'worker', to: 'api' },
        { from: 'escrow', to: 'api' },
        { from: 'api', to: 'notify' },
      ],
    },
  },
  {
    slug: 'cruces-interinstitucionales',
    year: 2026,
    featured: true,
    status: 'work',
    techs: ['python', 'fastapi', 'playwright', 'chromium', 'sse', 'postgresql', 'javascript', 'html', 'css', 'docker', 'gcp'],
    cover: '/media/cruces-interinstitucionales/cover.svg',
    media: [
      { type: 'image', src: ph('cruces-interinstitucionales', 1) },
      { type: 'image', src: ph('cruces-interinstitucionales', 2) },
    ],
    links: { live: null, repo: null },
    diagram: {
      nodes: [
        { id: 'user', x: 90, y: 200 },
        { id: 'ui', x: 262, y: 200 },
        { id: 'api', x: 450, y: 200 },
        { id: 'pool', x: 660, y: 200 },
        { id: 'gov', x: 660, y: 58 },
        { id: 'parser', x: 660, y: 342 },
        { id: 'db', x: 450, y: 342 },
        { id: 'report', x: 262, y: 342 },
      ],
      steps: [
        { from: 'user', to: 'ui' },
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'pool' },
        { from: 'pool', to: 'gov' },
        { from: 'pool', to: 'parser' },
        { from: 'parser', to: 'api' },
        { from: 'api', to: 'ui' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'report' },
      ],
    },
  },
  {
    slug: 'agente-ia-territorial',
    year: 2026,
    featured: true,
    status: 'work',
    techs: ['python', 'claude', 'pandas', 'geopandas', 'plotly', 'opentelemetry', 'prometheus', 'docker', 'html'],
    cover: '/media/agente-ia-territorial/cover.svg',
    media: [
      // Reportes HTML reales generados por el agente (datos ficticios), se muestran en vivo
      { type: 'html', src: '/media/agente-ia-territorial/reporte-dashboard.html' },
      { type: 'html', src: '/media/agente-ia-territorial/reporte-distribucion.html' },
    ],
    links: { live: null, repo: 'https://github.com/jtagonzalez/Agente-territorial' },
    diagram: {
      nodes: [
        { id: 'user', x: 90, y: 200 },
        { id: 'agent', x: 262, y: 200 },
        { id: 'skills', x: 262, y: 58 },
        { id: 'claude', x: 450, y: 58 },
        { id: 'tools', x: 450, y: 200 },
        { id: 'data', x: 660, y: 200 },
        { id: 'report', x: 450, y: 342 },
        { id: 'otel', x: 660, y: 342 },
      ],
      steps: [
        { from: 'user', to: 'agent' },
        { from: 'agent', to: 'skills' },
        { from: 'agent', to: 'claude' },
        { from: 'claude', to: 'agent' },
        { from: 'agent', to: 'tools' },
        { from: 'tools', to: 'data' },
        { from: 'tools', to: 'agent' },
        { from: 'agent', to: 'report' },
        { from: 'agent', to: 'otel' },
      ],
    },
  },
  {
    slug: 'bot-trading',
    year: 2026,
    featured: false,
    status: 'personal',
    techs: ['python', 'websocket', 'pandas', 'numpy', 'sqlite', 'react', 'html'],
    cover: '/media/bot-trading/cover.svg',
    media: [{ type: 'image', src: ph('bot-trading', 1) }],
    links: { live: null, repo: 'https://github.com/jtagonzalez/bot-trading' },
    diagram: {
      nodes: [
        { id: 'broker', x: 450, y: 58 },
        { id: 'collector', x: 262, y: 200 },
        { id: 'ta', x: 450, y: 200 },
        { id: 'risk', x: 660, y: 200 },
        { id: 'db', x: 450, y: 342 },
        { id: 'dash', x: 660, y: 342 },
      ],
      steps: [
        { from: 'broker', to: 'collector' },
        { from: 'collector', to: 'ta' },
        { from: 'ta', to: 'risk' },
        { from: 'risk', to: 'broker' },
        { from: 'risk', to: 'db' },
        { from: 'db', to: 'dash' },
      ],
    },
  },
  {
    slug: 'bot-ruleta',
    year: 2026,
    featured: false,
    status: 'personal',
    techs: ['python', 'opencv', 'tesseract', 'pyautogui', 'numpy', 'tkinter', 'playwright'],
    cover: '/media/bot-ruleta/cover.svg',
    media: [{ type: 'image', src: ph('bot-ruleta', 1) }],
    links: { live: null, repo: null },
    diagram: {
      nodes: [
        { id: 'sched', x: 450, y: 58 },
        { id: 'profile', x: 262, y: 58 },
        { id: 'screen', x: 90, y: 200 },
        { id: 'ocr', x: 262, y: 200 },
        { id: 'engine', x: 450, y: 200 },
        { id: 'clicks', x: 660, y: 200 },
        { id: 'stats', x: 450, y: 342 },
        { id: 'control', x: 660, y: 342 },
      ],
      steps: [
        { from: 'sched', to: 'engine' },
        { from: 'profile', to: 'ocr' },
        { from: 'screen', to: 'ocr' },
        { from: 'ocr', to: 'engine' },
        { from: 'engine', to: 'clicks' },
        { from: 'engine', to: 'stats' },
        { from: 'stats', to: 'control' },
      ],
    },
  },
  {
    slug: 'bot-mineria',
    year: 2026,
    featured: false,
    status: 'personal',
    techs: ['python', 'opencv', 'tesseract', 'pyautogui', 'numpy'],
    cover: '/media/bot-mineria/cover.svg',
    media: [{ type: 'image', src: ph('bot-mineria', 1) }],
    links: { live: null, repo: 'https://github.com/jtagonzalez/Bot-mina-venta' },
    diagram: {
      nodes: [
        { id: 'screen', x: 90, y: 200 },
        { id: 'vision', x: 262, y: 200 },
        { id: 'fsm', x: 450, y: 200 },
        { id: 'ocr', x: 450, y: 58 },
        { id: 'actions', x: 660, y: 200 },
        { id: 'watchdog', x: 450, y: 342 },
        { id: 'log', x: 660, y: 342 },
      ],
      steps: [
        { from: 'screen', to: 'vision' },
        { from: 'vision', to: 'fsm' },
        { from: 'fsm', to: 'actions' },
        { from: 'fsm', to: 'ocr' },
        { from: 'ocr', to: 'fsm' },
        { from: 'watchdog', to: 'fsm' },
        { from: 'fsm', to: 'log' },
      ],
    },
  },
]

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug)
