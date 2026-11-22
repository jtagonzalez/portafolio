import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LANGS, swapLangInPath, useI18n } from '../context/i18n.jsx'
import { SITE } from '../content/site.js'

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

// Título, descripción, idioma del <html>, canonical y hreflang por página
export function useMeta({ title, description } = {}) {
  const { t, lang } = useI18n()
  const { pathname } = useLocation()

  useEffect(() => {
    const site = t('meta.siteTitle')
    document.title = title ? `${title} · ${SITE.shortName}` : site
    const desc = description || t('meta.description')
    upsert('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' })).setAttribute('content', desc)
    upsert('meta[property="og:title"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:title')
      return m
    }).setAttribute('content', document.title)
    upsert('meta[property="og:description"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:description')
      return m
    }).setAttribute('content', desc)

    upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).setAttribute('href', SITE.url + pathname)
    for (const l of LANGS) {
      upsert(`link[rel="alternate"][hreflang="${l}"]`, () => {
        const el = document.createElement('link')
        el.rel = 'alternate'
        el.hreflang = l
        return el
      }).setAttribute('href', SITE.url + swapLangInPath(pathname, l))
    }
  }, [title, description, t, lang, pathname])
}
