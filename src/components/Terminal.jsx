import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n, useProjectText } from '../context/i18n.jsx'
import { useTheme } from '../context/theme.jsx'
import { PROJECTS } from '../content/projects.js'
import { SITE } from '../content/site.js'

const QUICK = ['help', 'projects', 'skills', 'contact']

export default function Terminal() {
  const { t, lang } = useI18n()
  const projectText = useProjectText()
  const { toggle } = useTheme()
  const navigate = useNavigate()
  const [lines, setLines] = useState(() => [{ kind: 'muted', text: t('terminal.welcome') }])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [hIndex, setHIndex] = useState(-1)
  const screen = useRef(null)
  const input = useRef(null)

  // (Home monta la terminal con key={lang}: al cambiar idioma se reinicia sola)
  useEffect(() => {
    const el = screen.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (raw) => {
    const cmdLine = raw.trim()
    if (!cmdLine) return
    const [cmd, ...args] = cmdLine.split(/\s+/)
    const out = []
    const say = (text, kind = 'out') => out.push({ kind, text })
    switch (cmd.toLowerCase()) {
      case 'help':
      case 'ayuda':
        t('terminal.help').forEach((l) => say(l))
        break
      case 'projects':
      case 'proyectos':
      case 'ls':
        PROJECTS.forEach((p) => say({ slug: p.slug, name: projectText(p.slug).name }, 'project'))
        break
      case 'open':
      case 'abrir':
      case 'cd': {
        const q = (args[0] || '').toLowerCase()
        const p = PROJECTS.find((x) => x.slug === q || x.slug.startsWith(q) || projectText(x.slug).name.toLowerCase().includes(q))
        if (q && p) {
          say(t('terminal.opening', { name: projectText(p.slug).name }), 'accent')
          setTimeout(() => navigate(`/${lang}/projects/${p.slug}`), 350)
        } else say(t('terminal.notFound', { slug: q }), 'accent')
        break
      }
      case 'skills':
      case 'stack':
        Object.entries(t('terminal.skills')).forEach(([k, v]) => say(`${k.padEnd(15, ' ')}${v}`))
        break
      case 'about':
      case 'whoami':
        say(t('terminal.about'))
        break
      case 'contact':
      case 'contacto':
        say({ href: SITE.linkedin, label: 'LinkedIn' }, 'link')
        say({ href: SITE.github, label: 'GitHub' }, 'link')
        say({ href: SITE.cv, label: 'CV (PDF)' }, 'link')
        break
      case 'cv': {
        say(t('terminal.cvDownloading'), 'accent')
        const a = document.createElement('a')
        a.href = SITE.cv
        a.download = ''
        a.click()
        break
      }
      case 'theme':
      case 'tema':
        toggle()
        say(t('terminal.themeChanged'), 'muted')
        break
      case 'lang':
      case 'idioma': {
        const to = (args[0] || (lang === 'es' ? 'en' : 'es')).toLowerCase()
        if (to === 'es' || to === 'en') navigate(`/${to}`, { state: { keepScroll: true } })
        break
      }
      case 'clear':
      case 'cls':
        setLines([])
        return
      case 'sudo':
        say('🙂 nice try.', 'accent')
        break
      default:
        say(t('terminal.unknown', { cmd }), 'accent')
    }
    setLines((prev) => [...prev, { kind: 'cmd', text: cmdLine }, ...out].slice(-80))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    run(value)
    if (value.trim()) setHistory((h) => [value, ...h].slice(0, 30))
    setHIndex(-1)
    setValue('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = Math.min(hIndex + 1, history.length - 1)
      setHIndex(i)
      setValue(history[i])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIndex - 1
      setHIndex(i)
      setValue(i >= 0 ? history[i] : '')
    } else if (e.key === 'Tab' && value.trim()) {
      // autocompletar comandos
      const all = ['help', 'projects', 'open', 'skills', 'about', 'contact', 'cv', 'theme', 'lang', 'clear']
      const m = all.find((c) => c.startsWith(value.trim()))
      if (m) {
        e.preventDefault()
        setValue(m + ' ')
      }
    }
  }

  return (
    <div className="terminal" onClick={() => input.current?.focus({ preventScroll: true })}>
      <div className="bar" aria-hidden="true">
        <span className="dot c" />
        <span className="dot" />
        <span className="dot t" />
        <span className="ms-2">{t('terminal.title')}</span>
      </div>
      <div className="screen" ref={screen} role="log" aria-live="polite" aria-label={t('terminal.label')}>
        {lines.map((l, i) => (
          <div key={i}>
            {l.kind === 'cmd' && (
              <>
                <span className="prompt">❯ </span>
                {l.text}
              </>
            )}
            {l.kind === 'out' && <span style={{ whiteSpace: 'pre-wrap' }}>{l.text}</span>}
            {l.kind === 'muted' && <span className="out-muted">{l.text}</span>}
            {l.kind === 'accent' && <span className="out-accent">{l.text}</span>}
            {l.kind === 'project' && (
              <span>
                <span className="out-muted">▸ </span>
                <Link to={`/${lang}/projects/${l.text.slug}`}>{l.text.name}</Link>
                <span className="out-muted"> ({l.text.slug})</span>
              </span>
            )}
            {l.kind === 'link' && (
              <span>
                <span className="out-muted">→ </span>
                <a href={l.text.href} target={l.text.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{l.text.label}</a>
              </span>
            )}
          </div>
        ))}
        {lines.length <= 1 && (
          <div className="mt-2">
            {QUICK.map((c) => (
              <button key={c} type="button" className="cmd-chip" onClick={(e) => { e.stopPropagation(); run(c) }}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="term-input" className="prompt mb-0">❯<span className="visually-hidden">{t('terminal.label')}</span></label>
        <input
          id="term-input"
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t('terminal.placeholder')}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          enterKeyHint="send"
        />
      </form>
    </div>
  )
}
