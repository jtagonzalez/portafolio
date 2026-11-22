import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LANGS, swapLangInPath, useI18n } from '../context/i18n.jsx'
import { useTheme } from '../context/theme.jsx'
import { SITE } from '../content/site.js'
import { Download, Moon, Sun } from './Icons.jsx'

export function LangSwitch() {
  const { lang, t } = useI18n()
  const { pathname, search, hash } = useLocation()
  return (
    <div className="lang-switch btn-group" role="group" aria-label={t('nav.langLabel')}>
      {LANGS.map((l) => (
        <Link
          key={l}
          to={`${swapLangInPath(pathname, l)}${search}${hash}`}
          className="btn btn-ghost border"
          hrefLang={l}
          lang={l}
          aria-pressed={l === lang}
          aria-label={l === 'es' ? 'Español' : 'English'}
          // Mantener la posición de scroll al cambiar idioma
          state={{ keepScroll: true }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const label = theme === 'dark' ? t('nav.toLight') : t('nav.toDark')
  return (
    <button type="button" className="btn btn-ghost border" onClick={toggle} aria-label={label} title={label}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}

export default function SiteNavbar() {
  const { lang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Navbar expand="md" sticky="top" className="site-nav" expanded={open} onToggle={setOpen}>
      <Container>
        <Navbar.Brand as={Link} to={`/${lang}`} onClick={close} aria-label={`${SITE.shortName} · ${t('nav.home')}`}>
          <img src="/favicon.svg" alt="" width="28" height="28" />
          <span className="brand-name">{SITE.shortName}</span>
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-2 order-md-last">
          <LangSwitch />
          <ThemeToggle />
          <Navbar.Toggle aria-controls="main-nav" aria-label={t('nav.menu')} />
        </div>
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-md-auto my-2 my-md-0">
            <Nav.Link as={NavLink} to={`/${lang}`} end onClick={close}>{t('nav.home')}</Nav.Link>
            <Nav.Link as={NavLink} to={`/${lang}/projects`} onClick={close}>{t('nav.projects')}</Nav.Link>
            <Nav.Link as={NavLink} to={`/${lang}/about`} onClick={close}>{t('nav.about')}</Nav.Link>
            <Nav.Link href="#contact" onClick={close}>{t('nav.contact')}</Nav.Link>
          </Nav>
          <a className="btn btn-accent btn-sm d-inline-flex align-items-center gap-1 mb-2 mb-md-0 me-md-2" href={SITE.cv} download onClick={close}>
            <Download /> {t('nav.cv')}
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
