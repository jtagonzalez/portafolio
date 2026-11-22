// Registro de tecnologías: id → nombre, logo (simple-icons) o monograma.
// Para agregar una tecnología: importa su icono de 'simple-icons' (busca el slug en simpleicons.org)
// o usa `mono` + `color` si no existe.
import {
  siPython, siFastapi, siPostgresql, siSupabase, siDocker, siGooglecloud, siSolidity,
  siAnthropic, siGrafana, siReact, siJavascript, siHtml5, siCss, siBootstrap, siOpencv,
  siTelegram, siWhatsapp, siPandas, siNumpy, siLinux, siBnbchain, siTether, siOpentelemetry,
  siPrometheus, siSqlite, siPlotly, siSelenium, siGeopandas, siGooglechrome, siVite,
} from 'simple-icons'

const fromSi = (icon, extra = {}) => ({ title: icon.title, path: icon.path, color: `#${icon.hex}`, ...extra })

export const TECHS = {
  python: fromSi(siPython, { cat: 'backend' }),
  fastapi: fromSi(siFastapi, { cat: 'backend' }),
  postgresql: fromSi(siPostgresql, { cat: 'data' }),
  supabase: fromSi(siSupabase, { cat: 'data' }),
  sqlite: fromSi(siSqlite, { cat: 'data' }),
  docker: fromSi(siDocker, { cat: 'cloud' }),
  gcp: fromSi(siGooglecloud, { title: 'Google Cloud', cat: 'cloud' }),
  linux: fromSi(siLinux, { cat: 'cloud' }),
  solidity: fromSi(siSolidity, { cat: 'web3' }),
  bsc: fromSi(siBnbchain, { title: 'BNB Smart Chain', cat: 'web3' }),
  usdt: fromSi(siTether, { title: 'USDT', cat: 'web3' }),
  claude: fromSi(siAnthropic, { title: 'Claude (Anthropic)', cat: 'ai' }),
  opentelemetry: fromSi(siOpentelemetry, { cat: 'data' }),
  prometheus: fromSi(siPrometheus, { cat: 'data' }),
  grafana: fromSi(siGrafana, { cat: 'data' }),
  pandas: fromSi(siPandas, { cat: 'data' }),
  geopandas: fromSi(siGeopandas, { cat: 'data' }),
  numpy: fromSi(siNumpy, { cat: 'data' }),
  plotly: fromSi(siPlotly, { cat: 'data' }),
  playwright: { title: 'Playwright', mono: 'PW', color: '#2EAD33', cat: 'automation' },
  chromium: fromSi(siGooglechrome, { title: 'Chromium headless', cat: 'automation' }),
  selenium: fromSi(siSelenium, { cat: 'automation' }),
  opencv: fromSi(siOpencv, { cat: 'automation' }),
  tesseract: { title: 'Tesseract OCR', mono: 'OCR', color: '#3B6FB6', cat: 'automation' },
  pyautogui: { title: 'PyAutoGUI', mono: 'GUI', color: '#5B6B82', cat: 'automation' },
  sse: { title: 'Server-Sent Events', mono: 'SSE', color: '#0F766E', cat: 'backend' },
  websocket: { title: 'WebSocket', mono: 'WS', color: '#6D5BD0', cat: 'backend' },
  tkinter: { title: 'Tkinter', mono: 'Tk', color: '#2F6EA5', cat: 'frontend' },
  powerbi: { title: 'Power BI', mono: 'BI', color: '#C99A00', cat: 'data' },
  telegram: fromSi(siTelegram, { cat: 'backend' }),
  whatsapp: fromSi(siWhatsapp, { cat: 'backend' }),
  react: fromSi(siReact, { cat: 'frontend' }),
  javascript: fromSi(siJavascript, { cat: 'frontend' }),
  html: fromSi(siHtml5, { title: 'HTML', cat: 'frontend' }),
  css: fromSi(siCss, { title: 'CSS', cat: 'frontend' }),
  bootstrap: fromSi(siBootstrap, { cat: 'frontend' }),
  vite: fromSi(siVite, { cat: 'frontend' }),
  wompi: { title: 'Wompi', mono: 'W', color: '#1F3A93', cat: 'backend' },
  nowpayments: { title: 'NOWPayments', mono: 'NP', color: '#2C7BE5', cat: 'web3' },
}

// Colores de marca casi negros: en modo oscuro se pintan con el color de texto
const luminance = (hex) => {
  const n = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
for (const t of Object.values(TECHS)) t.dark = luminance(t.color) < 0.06
