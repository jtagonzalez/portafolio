import { Container } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'
import { SITE } from '../content/site.js'
import { Download, GitHub, LinkedIn } from './Icons.jsx'

export default function ContactSection() {
  const { t } = useI18n()
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <Container>
        <div className="contact-card">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <p className="kicker mb-2">$ contact --now</p>
              <h2 id="contact-title" className="section-title">{t('contact.title')}</h2>
              <p className="text-muted-2 mb-1">{t('contact.text')}</p>
              <p className="small text-muted-2 mb-0">{t('contact.location')}</p>
            </div>
            <div className="col-lg-6">
              <div className="d-grid gap-2 d-sm-flex flex-wrap justify-content-lg-end">
                <a className="btn btn-brand-outline btn-lg d-inline-flex align-items-center justify-content-center gap-2" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedIn /> {t('contact.linkedin')}
                </a>
                <a className="btn btn-brand-outline btn-lg d-inline-flex align-items-center justify-content-center gap-2" href={SITE.github} target="_blank" rel="noopener noreferrer">
                  <GitHub /> {t('contact.github')}
                </a>
                <a className="btn btn-accent btn-lg d-inline-flex align-items-center justify-content-center gap-2" href={SITE.cv} download>
                  <Download /> {t('contact.cv')}
                </a>
                {SITE.email && (
                  <a className="btn btn-ghost border btn-lg" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
