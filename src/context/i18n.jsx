import { createContext, useCallback, useContext, useMemo } from 'react'
import es from '../i18n/es.json'
import en from '../i18n/en.json'

export const DICTS = { es, en }
export const LANGS = Object.keys(DICTS)
export const DEFAULT_LANG = 'es'

const I18nContext = createContext(null)

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)

// Reemplaza {var} en un texto
export const fill = (str, vars = {}) =>
  typeof str === 'string' ? str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`)) : str

export function I18nProvider({ lang, children }) {
  const value = useMemo(() => {
    const dict = DICTS[lang] ?? DICTS[DEFAULT_LANG]
    const t = (path, vars) => {
      const v = get(dict, path)
      if (v === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] falta la clave "${path}" en ${lang}.json`)
        return get(DICTS[DEFAULT_LANG], path) ?? path
      }
      return vars ? fill(v, vars) : v
    }
    return { lang, dict, t }
  }, [lang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}

// Texto de un proyecto en el idioma actual
export function useProjectText() {
  const { dict } = useI18n()
  return useCallback((slug) => dict.projectsContent?.[slug] ?? DICTS[DEFAULT_LANG].projectsContent[slug], [dict])
}

// Misma ruta en otro idioma: /es/projects/x?tech=y#z → /en/projects/x?tech=y#z
export const swapLangInPath = (pathname, toLang) => {
  const parts = pathname.split('/')
  if (LANGS.includes(parts[1])) parts[1] = toLang
  else parts.splice(1, 0, toLang)
  return parts.join('/').replace(/\/$/, '') || `/${toLang}`
}
