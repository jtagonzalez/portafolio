import { Col, Container, Row } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'

// "Cómo trabajo con IA": prácticas concretas, cada una con la evidencia de dónde se aplica.
export default function AIWorkflow() {
  const { t } = useI18n()
  const ai = t('about.aiWorkflow')
  return (
    <section className="section pt-0" aria-labelledby="ai-title">
      <Container>
        <p className="kicker mb-1">{ai.kicker}</p>
        <h2 id="ai-title" className="section-title mb-2">{ai.title}</h2>
        <p className="text-muted-2 mb-4" style={{ maxWidth: '48rem' }}>{ai.intro}</p>
        <Row xs={1} md={2} lg={3} className="g-3">
          {ai.items.map((it) => (
            <Col key={it.title}>
              <article className="ai-card">
                <div className="ai-icon" aria-hidden="true">{it.icon}</div>
                <h3 className="h6 mb-2">{it.title}</h3>
                <p className="small mb-3">{it.text}</p>
                <p className="ai-evidence mb-0">{it.evidence}</p>
              </article>
            </Col>
          ))}
          <Col>
            <article className="ai-card ai-tools">
              <h3 className="h6 mb-3">{ai.toolsLabel}</h3>
              <ul className="list-unstyled d-flex flex-wrap gap-2 mb-3">
                {ai.tools.map((tool) => (
                  <li key={tool} className="tag">{tool}</li>
                ))}
              </ul>
              <p className="small text-muted-2 mb-0">{ai.footnote}</p>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
