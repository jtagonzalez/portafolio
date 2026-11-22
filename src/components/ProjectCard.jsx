import { Link } from 'react-router-dom'
import { useI18n, useProjectText } from '../context/i18n.jsx'
import TechLogo from './TechLogo.jsx'

const MAX_LOGOS = 8

export default function ProjectCard({ project, index = 0 }) {
  const { lang, t } = useI18n()
  const text = useProjectText()(project.slug)
  const extra = project.techs.length - MAX_LOGOS
  return (
    <article className="project-card" style={{ animationDelay: `${index * 60}ms` }} aria-labelledby={`pc-${project.slug}`}>
      <div className="cover">
        <img src={project.cover} alt="" loading={index < 3 ? 'eager' : 'lazy'} width="640" height="360" />
      </div>
      <div className="body">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <span className={`tag ${project.status === 'production' ? 'tag-accent' : ''}`}>{t(`projects.status.${project.status}`)}</span>
          <span className="small text-muted-2">{project.year}</span>
        </div>
        <h3 className="h5 mb-2" id={`pc-${project.slug}`}>
          <Link className="card-title-link" to={`/${lang}/projects/${project.slug}`} aria-label={t('projects.viewDetail', { name: text.name })}>
            {text.name}
          </Link>
        </h3>
        <p className="summary mb-3">{text.summary}</p>
        <div>
          {text.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <ul className="tech-footer list-unstyled mb-0" aria-label={t('detail.stack')}>
        {project.techs.slice(0, MAX_LOGOS).map((id) => (
          <li key={id}><TechLogo id={id} /></li>
        ))}
        {extra > 0 && <li className="small text-muted-2 fw-semibold">+{extra}</li>}
      </ul>
    </article>
  )
}
