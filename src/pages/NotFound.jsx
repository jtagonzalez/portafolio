import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/i18n.jsx'
import { useMeta } from '../hooks/useMeta.js'

export default function NotFound() {
  const { t, lang } = useI18n()
  useMeta({ title: t('meta.notFoundTitle') })
  return (
    <section className="section">
      <Container className="text-center py-5">
        <p className="kicker">$ cd ??? → exit 404</p>
        <h1 className="section-title">{t('notFound.title')}</h1>
        <p className="text-muted-2">{t('notFound.text')}</p>
        <div className="d-flex justify-content-center gap-2">
          <Link to={`/${lang}`} className="btn btn-accent">{t('notFound.home')}</Link>
          <Link to={`/${lang}/projects`} className="btn btn-brand-outline">{t('nav.projects')}</Link>
        </div>
      </Container>
    </section>
  )
}
