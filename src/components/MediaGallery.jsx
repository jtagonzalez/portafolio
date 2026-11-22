import { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'
import { External, Play } from './Icons.jsx'

// Galería de demos. Tipos:
//  - image: captura (webp/png/svg)
//  - video: clip corto con póster; se descarga solo al abrirlo (preload="none")
//  - html:  reporte HTML real; miniatura en vivo (iframe escalado) y vista completa en el modal
// Los iframes van con sandbox="allow-same-origin": sin scripts, formularios ni popups; solo HTML estático del mismo sitio.
export default function MediaGallery({ media, captions = [] }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(null)
  const isPlaceholder = media.some((m) => m.src.endsWith('.svg'))
  const current = open != null ? media[open] : null

  const thumb = (m) => {
    if (m.type === 'video')
      return (
        <>
          <img src={m.poster} alt="" loading="lazy" />
          <span className="play" aria-hidden="true"><span><Play /></span></span>
        </>
      )
    if (m.type === 'html')
      return (
        <>
          <span className="html-thumb" aria-hidden="true">
            <iframe src={m.src} title="" tabIndex={-1} loading="lazy" scrolling="no" sandbox="allow-same-origin" />
          </span>
          <span className="live-badge" aria-hidden="true">{t('detail.liveReport')}</span>
        </>
      )
    // `focus` (opcional) = qué parte de la imagen se ve en la miniatura, p. ej. 'bottom' o 'center top'
    return <img src={m.src} alt="" loading="lazy" style={m.focus ? { objectPosition: m.focus } : undefined} />
  }

  return (
    <>
      {isPlaceholder && <p className="small text-muted-2">{t('detail.mediaPending')}</p>}
      <Row xs={1} sm={2} className="g-3">
        {media.map((m, i) => {
          const alt = captions[i] ?? ''
          return (
            <Col key={m.src}>
              <figure className="mb-0">
                <button type="button" className="media-thumb" onClick={() => setOpen(i)} aria-label={t('detail.openMedia', { alt })}>
                  {thumb(m)}
                </button>
                {alt && <figcaption className="small text-muted-2 mt-2">{alt}</figcaption>}
              </figure>
            </Col>
          )
        })}
      </Row>

      <Modal show={current != null} onHide={() => setOpen(null)} size="xl" centered className="media-modal" aria-labelledby="media-modal-title">
        <Modal.Header closeButton closeLabel={t('detail.close')}>
          <Modal.Title id="media-modal-title" className="h6">{current && (captions[open] ?? '')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          {current?.type === 'video' && (
            <video src={current.src} poster={current.poster} controls autoPlay muted playsInline preload="none" style={{ width: '100%', borderRadius: '0.6rem' }} />
          )}
          {current?.type === 'html' && (
            <>
              <iframe src={current.src} title={captions[open] ?? ''} sandbox="allow-same-origin" className="html-full" />
              <a href={current.src} target="_blank" rel="noopener noreferrer" className="btn btn-brand-outline btn-sm mt-2 d-inline-flex align-items-center gap-2">
                <External /> {t('detail.openReport')}
              </a>
            </>
          )}
          {current?.type === 'image' && <img src={current.src} alt={captions[open] ?? ''} style={{ width: '100%', borderRadius: '0.6rem' }} />}
        </Modal.Body>
      </Modal>
    </>
  )
}
