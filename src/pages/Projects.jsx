import { useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../context/i18n.jsx'
import { useMeta } from '../hooks/useMeta.js'
import { PROJECTS } from '../content/projects.js'
import { TECHS } from '../content/techs.js'
import ProjectCard from '../components/ProjectCard.jsx'
import TechFilter from '../components/TechFilter.jsx'

export default function Projects() {
  const { t } = useI18n()
  useMeta({ title: t('meta.projectsTitle') })
  // Los filtros viven en la URL (?tech=python,react&mode=all) para poder compartir el enlace
  const [params, setParams] = useSearchParams()
  const selected = (params.get('tech') || '').split(',').filter((id) => TECHS[id])
  const mode = params.get('mode') === 'all' ? 'all' : 'any'

  const options = useMemo(() => {
    const counts = {}
    PROJECTS.forEach((p) => p.techs.forEach((id) => (counts[id] = (counts[id] || 0) + 1)))
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || TECHS[a[0]].title.localeCompare(TECHS[b[0]].title))
      .map(([id, count]) => ({ id, count }))
  }, [])

  const update = (tech, m = mode) => {
    const next = new URLSearchParams(params)
    if (tech.length) next.set('tech', tech.join(','))
    else next.delete('tech')
    if (m === 'all') next.set('mode', 'all')
    else next.delete('mode')
    setParams(next, { replace: true, preventScrollReset: true, state: { keepScroll: true } })
  }
  const onToggle = (id) => update(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id])

  const visible = PROJECTS.filter((p) => {
    if (!selected.length) return true
    return mode === 'all' ? selected.every((id) => p.techs.includes(id)) : selected.some((id) => p.techs.includes(id))
  })

  return (
    <section className="section" aria-labelledby="projects-title">
      <Container>
        <p className="kicker mb-1">$ ls ./projects</p>
        <h1 id="projects-title" className="section-title">{t('projects.title')}</h1>
        <p className="text-muted-2 mb-4" style={{ maxWidth: '46rem' }}>{t('projects.subtitle')}</p>

        <TechFilter
          options={options}
          selected={selected}
          onToggle={onToggle}
          onClear={() => update([])}
          mode={mode}
          onMode={(m) => update(selected, m)}
        />

        <p className="small text-muted-2" role="status" aria-live="polite">
          {t('projects.showing', { n: visible.length, total: PROJECTS.length })}
        </p>

        {visible.length === 0 ? (
          <div className="surface p-4 text-center text-muted-2">{t('projects.empty')}</div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {visible.map((p, i) => (
              <Col key={p.slug}>
                <ProjectCard project={p} index={i} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  )
}
