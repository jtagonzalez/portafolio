import { Container } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'
import { SITE } from '../content/site.js'

export default function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="site-footer">
      <Container className="d-flex flex-column flex-md-row justify-content-between gap-2">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>
          {t('footer.built')}
          {SITE.sourceRepo && (
            <>
              {' · '}
              <a href={SITE.sourceRepo} target="_blank" rel="noopener noreferrer">{t('footer.source')}</a>
            </>
          )}
        </span>
      </Container>
    </footer>
  )
}
