import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'

// Línea de tiempo filtrable: de gestión ambiental a desarrollo
export default function Timeline() {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  // En el JSON van en orden cronológico; se muestran al revés: lo más reciente primero
  const items = [...t('about.timeline')].reverse().filter((it) => filter === 'all' || it.type === filter)
  return (
    <>
      <ToggleButtonGroup type="radio" name="tl-filter" value={filter} onChange={setFilter} className="tl-filter mb-4 flex-wrap" aria-label={t('about.timelineTitle')}>
        <ToggleButton id="tl-all" value="all" variant="outline-secondary">{t('about.filterAll')}</ToggleButton>
        <ToggleButton id="tl-env" value="env" variant="outline-secondary">{t('about.filterEnv')}</ToggleButton>
        <ToggleButton id="tl-dev" value="dev" variant="outline-secondary">{t('about.filterDev')}</ToggleButton>
      </ToggleButtonGroup>
      <ol className="timeline">
        {items.map((it) => (
          <li key={it.title} className={`${it.type} ${it.now ? 'now' : ''}`}>
            <span className="marker" aria-hidden="true" />
            <div className="card-tl">
              <div className="period">{it.period}</div>
              <h3 className="h6 mb-0 mt-1">{it.title}</h3>
              <div className="small text-brand fw-semibold mb-1">{it.org}</div>
              <p className="small mb-0 text-muted-2">{it.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
