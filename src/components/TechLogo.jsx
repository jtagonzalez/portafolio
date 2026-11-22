import { TECHS } from '../content/techs.js'

// Logo de una tecnología. Con `label` muestra el nombre al lado; si no, el nombre queda como texto accesible.
export default function TechLogo({ id, label = false, decorative = false, className = '' }) {
  const tech = TECHS[id]
  if (decorative && tech) label = false
  if (!tech) {
    if (import.meta.env.DEV) console.warn(`[techs] tecnología desconocida: ${id}`)
    return null
  }
  const icon = tech.path ? (
    <svg
      className={`tech-logo ${tech.dark ? 'is-dark' : ''}`}
      viewBox="0 0 24 24"
      fill={tech.color}
      role={label ? undefined : 'img'}
      aria-hidden={label ? true : undefined}
      aria-label={label ? undefined : tech.title}
      focusable="false"
    >
      {!label && <title>{tech.title}</title>}
      <path d={tech.path} />
    </svg>
  ) : (
    <span
      className="tech-mono"
      style={{ background: tech.color }}
      role={label ? undefined : 'img'}
      aria-hidden={label ? true : undefined}
      aria-label={label ? undefined : tech.title}
      title={label ? undefined : tech.title}
    >
      {tech.mono}
    </span>
  )
  if (decorative) return <span className={className} style={{ display: 'inline-flex' }} aria-hidden="true">{icon}</span>
  if (!label) return <span className={className} style={{ display: 'inline-flex' }}>{icon}</span>
  return (
    <span className={`tech-pill ${className}`}>
      {icon}
      {tech.title}
    </span>
  )
}
