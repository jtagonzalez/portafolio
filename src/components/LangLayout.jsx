import { useEffect, useRef } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { DEFAULT_LANG, I18nProvider, LANGS } from '../context/i18n.jsx'
import SiteNavbar from './SiteNavbar.jsx'
import ContactSection from './ContactSection.jsx'
import SiteFooter from './SiteFooter.jsx'
import { useI18n } from '../context/i18n.jsx'

// Al cambiar de página: sube al inicio (o al #ancla) y mueve el foco al <main> para lectores de pantalla
function ScrollManager() {
  const { pathname, hash, state } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    // Cambio de idioma: misma página, se conserva el scroll
    if (state?.keepScroll) return
    if (hash) {
      // La página puede cargarse en diferido (lazy): reintenta hasta ~1,5 s
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      let timer
      const seek = () => {
        const el = document.getElementById(id)
        // 'instant': el scroll suave se interrumpe si la página sigue cargando
        if (el) el.scrollIntoView({ behavior: 'instant' })
        else if (tries++ < 15) timer = setTimeout(seek, 100)
      }
      seek()
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
    if (first.current) {
      first.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])
  return null
}

function Shell() {
  const { t, lang } = useI18n()
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return (
    <>
      <a className="skip-link" href="#main">{t('nav.skip')}</a>
      <ScrollManager />
      <SiteNavbar />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Outlet />
      </main>
      <ContactSection />
      <SiteFooter />
    </>
  )
}

export default function LangLayout() {
  const { lang } = useParams()
  const { pathname, search, hash } = useLocation()
  if (!LANGS.includes(lang)) {
    // /projects → /es/projects
    return <Navigate to={`/${DEFAULT_LANG}${pathname}${search}${hash}`} replace />
  }
  return (
    <I18nProvider lang={lang}>
      <Shell />
    </I18nProvider>
  )
}
