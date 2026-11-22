import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/i18n.jsx'
import { useMeta } from '../hooks/useMeta.js'
import { PROJECTS } from '../content/projects.js'
import { SITE } from '../content/site.js'
import ProjectCard from '../components/ProjectCard.jsx'
import Terminal from '../components/Terminal.jsx'
import { Arrow, Download } from '../components/Icons.jsx'

export default function Home() {
  const { t, lang } = useI18n()
  useMeta()
  const featured = PROJECTS.filter((p) => p.featured)

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={7}>
              <p className="kicker mb-3">{t('hero.kicker')}</p>
              <p className="fs-5 fw-semibold mb-2">{t('hero.hello')}</p>
              <h1 id="hero-title" className="hero-title mb-4">
                {t('hero.titleA')}
                <span className="hl">{t('hero.titleHl')}</span>
                {t('hero.titleB')}
              </h1>
              <p className="lead-pitch mb-3">{t('hero.pitch')}</p>
              <p className="fw-semibold mb-4">
                <span className="status-dot" aria-hidden="true" />
                {t('hero.seeking')}
              </p>
              <div className="d-flex flex-wrap gap-2 mb-5">
                <Link to={`/${lang}/projects`} className="btn btn-accent btn-lg d-inline-flex align-items-center gap-2">
                  {t('hero.ctaProjects')} <Arrow />
                </Link>
                <a href={SITE.cv} download className="btn btn-brand-outline btn-lg d-inline-flex align-items-center gap-2">
                  <Download /> {t('hero.ctaCv')}
                </a>
                <a href="#contact" className="btn btn-ghost btn-lg">{t('hero.ctaContact')}</a>
              </div>
              <Row as="ul" xs={3} className="list-unstyled g-3 mb-0">
                {t('hero.stats').map((s) => (
                  <Col as="li" key={s.lbl}>
                    <div className="stat">
                      <div className="num">{s.num}</div>
                      <div className="lbl">{s.lbl}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={5}>
              <Terminal key={lang} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section pt-3" aria-labelledby="featured-title">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
            <div>
              <p className="kicker mb-1">$ ls ./projects --featured</p>
              <h2 id="featured-title" className="section-title mb-0">{t('projects.featured')}</h2>
            </div>
            <Link to={`/${lang}/projects`} className="btn btn-brand-outline d-inline-flex align-items-center gap-2">
              {t('projects.seeAll')} <Arrow />
            </Link>
          </div>
          <Row xs={1} md={2} lg={3} className="g-4">
            {featured.map((p, i) => (
              <Col key={p.slug}>
                <ProjectCard project={p} index={i} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}
