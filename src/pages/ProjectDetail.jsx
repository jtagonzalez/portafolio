import { Accordion, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useI18n, useProjectText } from '../context/i18n.jsx'
import { useMeta } from '../hooks/useMeta.js'
import { getProject, PROJECTS } from '../content/projects.js'
import TechLogo from '../components/TechLogo.jsx'
import ArchitectureDiagram from '../components/ArchitectureDiagram.jsx'
import MediaGallery from '../components/MediaGallery.jsx'
import StatusTable from '../components/StatusTable.jsx'
import NotFound from './NotFound.jsx'
import { ArrowLeft, Arrow, External, GitHub, Lock } from '../components/Icons.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, lang } = useI18n()
  const getText = useProjectText()
  const project = getProject(slug)
  const text = project ? getText(slug) : null
  useMeta(text ? { title: text.name, description: text.summary } : { title: t('meta.notFoundTitle') })
  if (!project || !text) return <NotFound />

  const idx = PROJECTS.indexOf(project)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  const sections = [
    ['overview', t('detail.overview')],
    ...(text.statusTable ? [['status', t('detail.status')]] : []),
    ['architecture', t('detail.architecture')],
    ['stack', t('detail.stack')],
    ['demo', t('detail.demo')],
    ['challenges', t('detail.challenges')],
    ['achievements', t('detail.achievements')],
  ]

  return (
    <article aria-labelledby="project-title">
      <header className="detail-hero">
        <Container>
          <Link to={`/${lang}/projects`} className="btn btn-ghost btn-sm mb-3 d-inline-flex align-items-center gap-1">
            <ArrowLeft /> {t('detail.back')}
          </Link>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <span className={`tag ${project.status === 'production' ? 'tag-accent' : ''}`}>{t(`projects.status.${project.status}`)}</span>
              <h1 id="project-title" className="display-5 mt-2 mb-3">{text.name}</h1>
              <p className="lead-pitch mb-3">{text.summary}</p>
              <dl className="row small mb-3">
                <dt className="col-sm-3 text-muted-2">{t('detail.role')}</dt>
                <dd className="col-sm-9">{text.role}</dd>
                <dt className="col-sm-3 text-muted-2">{t('detail.period')}</dt>
                <dd className="col-sm-9">{text.period}</dd>
              </dl>
              <div className="d-flex flex-wrap gap-2">
                {project.links.live && (
                  <a href={project.links.live.replace('{lang}', lang)} target="_blank" rel="noopener noreferrer" className="btn btn-accent d-inline-flex align-items-center gap-2">
                    <External /> {t('detail.live')}
                  </a>
                )}
                {project.links.repo ? (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-brand-outline d-inline-flex align-items-center gap-2">
                    <GitHub /> {t('detail.repo')}
                  </a>
                ) : (
                  <span className="btn btn-ghost border disabled d-inline-flex align-items-center gap-2" aria-disabled="true">
                    <Lock /> {t('detail.privateRepo')}
                  </span>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <div className="detail-cover">
                <img src={project.cover} alt="" width="960" height="540" />
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="pb-4">
        <Row className="g-5">
          <Col lg={3} className="d-none d-lg-block">
            <nav className="toc" aria-label={t('detail.onThisPage')}>
              <p className="small fw-bold text-uppercase text-muted-2 mb-2">{t('detail.onThisPage')}</p>
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`}>{label}</a>
              ))}
            </nav>
          </Col>
          <Col lg={9}>
            <section id="overview" className="mb-5" aria-labelledby="h-overview">
              <h2 id="h-overview" className="h3 mb-3">{t('detail.overview')}</h2>
              {text.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {project.status === 'work' && <p className="small text-muted-2 fst-italic">{t('detail.anonymized')}</p>}
            </section>

            {text.statusTable && (
              <section id="status" className="mb-5" aria-labelledby="h-status">
                <h2 id="h-status" className="h3 mb-3">{t('detail.status')}</h2>
                <StatusTable table={text.statusTable} note={t('detail.statusNote')} />
              </section>
            )}

            <section id="architecture" className="mb-5" aria-labelledby="h-arch">
              <h2 id="h-arch" className="h3 mb-3">{t('detail.architecture')}</h2>
              <ArchitectureDiagram key={project.slug} diagram={project.diagram} text={text.diagram} name={text.name} />
            </section>

            <section id="stack" className="mb-5" aria-labelledby="h-stack">
              <h2 id="h-stack" className="h3 mb-3">{t('detail.stack')}</h2>
              <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                {project.techs.map((id) => (
                  <li key={id}>
                    <Link to={`/${lang}/projects?tech=${id}`} className="text-reset">
                      <TechLogo id={id} label />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section id="demo" className="mb-5" aria-labelledby="h-demo">
              <h2 id="h-demo" className="h3 mb-3">{t('detail.demo')}</h2>
              <MediaGallery media={project.media} captions={text.media} />
            </section>

            <section id="challenges" className="mb-5" aria-labelledby="h-challenges">
              <h2 id="h-challenges" className="h3 mb-3">{t('detail.challenges')}</h2>
              <Accordion defaultActiveKey="0" className="challenge-acc" alwaysOpen>
                {text.challenges.map((c, i) => (
                  <Accordion.Item eventKey={String(i)} key={i}>
                    <Accordion.Header>{c.problem}</Accordion.Header>
                    <Accordion.Body>
                      <span className="label text-accent d-block mb-1">{t('detail.solution')}</span>
                      {c.solution}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </section>

            <section id="achievements" className="mb-5" aria-labelledby="h-achievements">
              <h2 id="h-achievements" className="h3 mb-3">{t('detail.achievements')}</h2>
              <ul className="list-check">
                {text.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>

            <nav className="d-flex justify-content-between gap-2 border-top pt-4" aria-label={t('nav.projects')}>
              <Link to={`/${lang}/projects/${prev.slug}`} className="btn btn-ghost d-inline-flex align-items-center gap-2 text-start">
                <ArrowLeft />
                <span>
                  <span className="d-block small text-muted-2">{t('detail.prevProject')}</span>
                  {getText(prev.slug).name}
                </span>
              </Link>
              <Link to={`/${lang}/projects/${next.slug}`} className="btn btn-ghost d-inline-flex align-items-center gap-2 text-end">
                <span>
                  <span className="d-block small text-muted-2">{t('detail.nextProject')}</span>
                  {getText(next.slug).name}
                </span>
                <Arrow />
              </Link>
            </nav>
          </Col>
        </Row>
      </Container>
    </article>
  )
}
