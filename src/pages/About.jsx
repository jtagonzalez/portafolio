import { Col, Container, Row } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'
import { useMeta } from '../hooks/useMeta.js'
import Timeline from '../components/Timeline.jsx'

export default function About() {
  const { t } = useI18n()
  useMeta({ title: t('meta.aboutTitle') })
  const skills = Object.entries(t('terminal.skills'))
  return (
    <>
      <section className="section" aria-labelledby="about-title">
        <Container>
          <Row className="g-5">
            <Col lg={5}>
              <p className="kicker mb-1">$ cat about.md</p>
              <h1 id="about-title" className="section-title mb-3">{t('about.title')}</h1>
              <p className="lead-pitch">{t('about.intro')}</p>
              <h2 className="h5 mt-4 mb-3">{t('about.whatIBring')}</h2>
              <ul className="list-check">
                {t('about.bring').map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="small text-muted-2">{t('about.languages')}</p>
            </Col>
            <Col lg={7}>
              <h2 className="h4 mb-3">{t('about.timelineTitle')}</h2>
              <Timeline />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section pt-0" aria-labelledby="skills-title">
        <Container>
          <h2 id="skills-title" className="section-title mb-4">{t('about.skillsTitle')}</h2>
          <Row xs={1} sm={2} lg={4} className="g-3">
            {skills.map(([group, list]) => (
              <Col key={group}>
                <div className="skill-group">
                  <h3 className="text-brand">{group}</h3>
                  <p className="small mb-0">{list}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}
