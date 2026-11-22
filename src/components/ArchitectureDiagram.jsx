import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery.js'
import { Next, Pause, Play, Prev, Restart } from './Icons.jsx'

const DESKTOP = { w: 840, h: 400, nodeW: 164, nodeH: 62 }
const MOBILE = { w: 380, nodeW: 230, nodeH: 58, x: 150, gap: 82, top: 40 }
const STEP_MS = 3400
const TRAVEL_MS = 900

const edgeKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`)

/**
 * Diagrama de arquitectura animado: un "paquete" viaja entre componentes paso a paso.
 * - Desktop: posiciones x/y definidas en projects.js
 * - Móvil: columna vertical en el orden en que aparecen los nodos; las conexiones lejanas se curvan a la derecha
 */
export default function ArchitectureDiagram({ diagram, text, name }) {
  const { t } = useI18n()
  const uid = useId()
  // Layout vertical si el contenedor es angosto (no depende solo del viewport)
  const wrapRef = useRef(null)
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => setNarrow(entry.contentRect.width < 620))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const isMobile = narrow
  const reduced = usePrefersReducedMotion()
  const steps = diagram.steps
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const pathRefs = useRef({})
  const packetRef = useRef(null)
  const raf = useRef(0)

  // ---- Layout ----
  const layout = useMemo(() => {
    if (!isMobile) {
      const pos = Object.fromEntries(diagram.nodes.map((n) => [n.id, { x: n.x, y: n.y }]))
      return { ...DESKTOP, pos, order: null }
    }
    const order = []
    for (const s of steps) for (const id of [s.from, s.to]) if (!order.includes(id)) order.push(id)
    for (const n of diagram.nodes) if (!order.includes(n.id)) order.push(n.id)
    const pos = Object.fromEntries(order.map((id, i) => [id, { x: MOBILE.x, y: MOBILE.top + i * MOBILE.gap }]))
    return { w: MOBILE.w, h: MOBILE.top * 2 + (order.length - 1) * MOBILE.gap, nodeW: MOBILE.nodeW, nodeH: MOBILE.nodeH, pos, order }
  }, [isMobile, diagram.nodes, steps])

  const edges = useMemo(() => {
    const seen = new Map()
    steps.forEach((s, i) => {
      const k = edgeKey(s.from, s.to)
      if (!seen.has(k)) seen.set(k, { key: k, a: k.split('|')[0], b: k.split('|')[1], firstStep: i })
    })
    return [...seen.values()].map((e) => {
      const A = layout.pos[e.a]
      const B = layout.pos[e.b]
      let d
      if (!layout.order) {
        d = `M${A.x},${A.y} L${B.x},${B.y}`
      } else {
        const ia = layout.order.indexOf(e.a)
        const ib = layout.order.indexOf(e.b)
        if (Math.abs(ia - ib) === 1) d = `M${A.x},${A.y} L${B.x},${B.y}`
        else {
          const right = A.x + layout.nodeW / 2
          const bulge = Math.min(right + 18 + Math.abs(ia - ib) * 10, layout.w - 6)
          d = `M${right},${A.y} C${bulge},${A.y} ${bulge},${B.y} ${right},${B.y}`
        }
      }
      return { ...e, d }
    })
  }, [steps, layout])

  // ---- Animación del paquete a lo largo del camino ----
  const animate = useCallback(
    (i) => {
      const s = steps[i]
      const path = pathRefs.current[edgeKey(s.from, s.to)]
      const packet = packetRef.current
      if (!path || !packet) return
      const forward = edgeKey(s.from, s.to).split('|')[0] === s.from
      const len = path.getTotalLength()
      const place = (p) => {
        const pt = path.getPointAtLength(forward ? p * len : (1 - p) * len)
        packet.setAttribute('transform', `translate(${pt.x},${pt.y})`)
      }
      cancelAnimationFrame(raf.current)
      if (reduced) {
        place(1)
        return
      }
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / TRAVEL_MS, 1)
        const eased = p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2
        place(eased)
        if (p < 1) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    },
    [steps, reduced],
  )

  useEffect(() => {
    animate(step)
    return () => cancelAnimationFrame(raf.current)
  }, [step, animate, layout])

  // ---- Reproducción automática (con pausa: WCAG 2.2.2) ----
  useEffect(() => {
    if (!playing) return
    if (step >= steps.length - 1) {
      setPlaying(false)
      return
    }
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(id)
  }, [playing, step, steps.length])

  const go = (i) => {
    setPlaying(false)
    setStep(Math.max(0, Math.min(steps.length - 1, i)))
  }
  const togglePlay = () => {
    if (!playing && step >= steps.length - 1) setStep(0)
    setPlaying((p) => !p)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(step + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(step - 1)
    }
  }
  const focusNode = (id) => {
    const i = steps.findIndex((s) => s.to === id || s.from === id)
    if (i >= 0) go(i)
  }

  const cur = steps[step]
  const info = text.steps[step] ?? {}
  const visited = new Set(steps.slice(0, step + 1).flatMap((s) => [s.from, s.to]))
  const doneEdges = new Set(steps.slice(0, step).map((s) => edgeKey(s.from, s.to)))
  const panelId = `${uid}-panel`

  return (
    <div className="arch" onKeyDown={onKeyDown} ref={wrapRef}>
      <p className="small text-muted-2 mb-3">{t('diagram.intro')}</p>
      <svg className="arch-canvas" viewBox={`0 0 ${layout.w} ${layout.h}`} role="group" aria-label={t('diagram.svgLabel', { name })} aria-describedby={panelId}>
        {edges.map((e) => (
          <path
            key={e.key}
            ref={(el) => (pathRefs.current[e.key] = el)}
            d={e.d}
            className={`edge ${e.key === edgeKey(cur.from, cur.to) ? 'active' : doneEdges.has(e.key) ? 'done' : ''}`}
          />
        ))}
        {Object.entries(layout.pos).map(([id, p]) => {
          const [label, sub] = text.nodes[id] ?? [id, '']
          const active = id === cur.to
          const from = id === cur.from
          return (
            <g
              key={id}
              className={`node ${active || from ? 'active' : visited.has(id) ? 'visited' : ''}`}
              transform={`translate(${p.x - layout.nodeW / 2},${p.y - layout.nodeH / 2})`}
              tabIndex={0}
              role="button"
              aria-label={`${t('diagram.nodeInfo')}: ${label}${sub ? ` (${sub})` : ''}`}
              aria-pressed={active}
              onClick={() => focusNode(id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  focusNode(id)
                }
              }}
            >
              <rect width={layout.nodeW} height={layout.nodeH} rx="12" />
              <text x={layout.nodeW / 2} y={sub ? layout.nodeH / 2 - 3 : layout.nodeH / 2 + 5} textAnchor="middle">{label}</text>
              {sub && (
                <text className="sub" x={layout.nodeW / 2} y={layout.nodeH / 2 + 15} textAnchor="middle">{sub}</text>
              )}
            </g>
          )
        })}
        <g ref={packetRef} aria-hidden="true" style={{ pointerEvents: 'none' }}>
          <circle className="packet" r="8" />
        </g>
      </svg>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3">
        <ButtonGroup aria-label="Controles">
          <Button variant="outline-secondary" onClick={() => go(step - 1)} disabled={step === 0} aria-label={t('diagram.prev')} title={t('diagram.prev')}>
            <Prev />
          </Button>
          <Button className="btn-accent" onClick={togglePlay} aria-label={playing ? t('diagram.pause') : t('diagram.play')}>
            {playing ? <Pause /> : <Play />} <span className="d-none d-sm-inline ms-1">{playing ? t('diagram.pause') : t('diagram.play')}</span>
          </Button>
          <Button variant="outline-secondary" onClick={() => go(step + 1)} disabled={step === steps.length - 1} aria-label={t('diagram.next')} title={t('diagram.next')}>
            <Next />
          </Button>
          <Button variant="outline-secondary" onClick={() => go(0)} aria-label={t('diagram.restart')} title={t('diagram.restart')}>
            <Restart />
          </Button>
        </ButtonGroup>
        <div className="step-dots d-flex align-items-center" role="group" aria-label={t('diagram.step', { n: step + 1, total: steps.length })}>
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i < step ? 'seen' : ''}
              aria-current={i === step ? 'step' : undefined}
              aria-label={t('diagram.goTo', { n: i + 1 })}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      <div className="step-panel mt-3" id={panelId} aria-live="polite">
        <div className="small text-muted-2 mb-1">{t('diagram.step', { n: step + 1, total: steps.length })}</div>
        <h3 className="h6 mb-1">{info.title}</h3>
        <p className="mb-0 small">{info.text}</p>
        {info.code && <code className="code-hint">{info.code}</code>}
      </div>
    </div>
  )
}
