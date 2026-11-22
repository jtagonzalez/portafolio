import { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useI18n } from '../context/i18n.jsx'
import { Play } from './Icons.jsx'

// Galería de capturas y videos. Clic → se abre en un modal (React-Bootstrap).
// Los videos se cargan solo al abrirlos (preload="none") para que la página sea liviana.
export default function MediaGallery({ media, captions = [] }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(null)
  const isPlaceholder = media.some((m) => m.src.endsWith('.svg'))
  const current = open != null ? media[open] : null

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
                  {m.type === 'video' ? (
                    <>
                      <img src={m.poster} alt="" loading="lazy" />
                      <span className="play" aria-hidden="true"><span><Play /></span></span>
                    </>
                  ) : (
                    <img src={m.src} alt="" loading="lazy" />
                  )}
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
          {current?.type === 'video' ? (
            <video src={current.src} poster={current.poster} controls autoPlay muted playsInline preload="none" style={{ width: '100%', borderRadius: '0.6rem' }} />
          ) : (
            current && <img src={current.src} alt={captions[open] ?? ''} style={{ width: '100%', borderRadius: '0.6rem' }} />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
