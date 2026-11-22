import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'
import TechLogo from './TechLogo.jsx'
import { TECHS } from '../content/techs.js'

// Chips de tecnologías (multi-selección) + modo "cualquiera / todas" con React-Bootstrap
const VISIBLE = 12

export default function TechFilter({ options, selected, onToggle, onClear, mode, onMode }) {
  const { t } = useI18n()
  const [expanded, setExpanded] = useState(false)
  // Muestra las más usadas + las seleccionadas; el resto tras "ver más"
  const shown = expanded ? options : options.filter((o, i) => i < VISIBLE || selected.includes(o.id))
  const hidden = options.length - shown.length
  return (
    <div className="mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <h2 className="h6 mb-0" id="filter-title">{t('projects.filterLabel')}</h2>
        <div className="d-flex align-items-center gap-2">
          <ToggleButtonGroup type="radio" name="match-mode" value={mode} onChange={onMode} size="sm" aria-label={t('projects.filterLabel')}>
            <ToggleButton id="mode-any" value="any" variant="outline-secondary">{t('projects.matchAny')}</ToggleButton>
            <ToggleButton id="mode-all" value="all" variant="outline-secondary">{t('projects.matchAll')}</ToggleButton>
          </ToggleButtonGroup>
          {selected.length > 0 && (
            <button type="button" className="btn btn-sm btn-link" onClick={onClear}>{t('projects.clear')}</button>
          )}
        </div>
      </div>
      <div className="filter-bar" role="group" aria-labelledby="filter-title">
        {shown.map(({ id, count }) => (
          <button
            key={id}
            type="button"
            className="filter-chip"
            aria-pressed={selected.includes(id)}
            onClick={() => onToggle(id)}
          >
            <TechLogo id={id} decorative />
            <span>{TECHS[id].title}</span>
            <span className="count" aria-hidden="true">{count}</span>
          </button>
        ))}
        {(hidden > 0 || expanded) && (
          <button type="button" className="btn btn-sm btn-link" aria-expanded={expanded} onClick={() => setExpanded((e) => !e)}>
            {expanded ? t('projects.showLess') : t('projects.showMore', { n: hidden })}
          </button>
        )}
      </div>
    </div>
  )
}
