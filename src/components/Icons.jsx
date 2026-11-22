import { siGithub } from 'simple-icons'

const Svg = ({ children, label, ...p }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label} focusable="false" {...p}>
    {children}
  </svg>
)
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Sun = (p) => (
  <Svg {...p}><g style={stroke}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g></Svg>
)
export const Moon = (p) => (
  <Svg {...p}><path style={stroke} d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Svg>
)
export const Download = (p) => (
  <Svg {...p}><path style={stroke} d="M12 3v12M7 10l5 5 5-5M5 21h14" /></Svg>
)
export const Arrow = (p) => (
  <Svg {...p}><path style={stroke} d="M5 12h14M13 6l6 6-6 6" /></Svg>
)
export const ArrowLeft = (p) => (
  <Svg {...p}><path style={stroke} d="M19 12H5M11 6l-6 6 6 6" /></Svg>
)
export const External = (p) => (
  <Svg {...p}><path style={stroke} d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>
)
export const Lock = (p) => (
  <Svg {...p}><g style={stroke}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></g></Svg>
)
export const Play = (p) => (
  <Svg {...p}><path d="M8 5v14l11-7z" /></Svg>
)
export const Pause = (p) => (
  <Svg {...p}><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></Svg>
)
export const Next = (p) => (
  <Svg {...p}><path style={stroke} d="M9 6l6 6-6 6" /></Svg>
)
export const Prev = (p) => (
  <Svg {...p}><path style={stroke} d="M15 6l-6 6 6 6" /></Svg>
)
export const Restart = (p) => (
  <Svg {...p}><path style={stroke} d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" /></Svg>
)
export const GitHub = (p) => (
  <Svg {...p}><path d={siGithub.path} /></Svg>
)
export const LinkedIn = (p) => (
  <Svg {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </Svg>
)
