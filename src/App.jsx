import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LangLayout from './components/LangLayout.jsx'
import Home from './pages/Home.jsx'
import { DEFAULT_LANG, LANGS } from './context/i18n.jsx'

const Projects = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// "/" → idioma del navegador si lo soportamos, si no español
function RootRedirect() {
  const { search, hash } = useLocation()
  const nav = (navigator.language || '').slice(0, 2)
  const lang = LANGS.includes(nav) ? nav : DEFAULT_LANG
  return <Navigate to={`/${lang}${search}${hash}`} replace />
}

const Loading = () => (
  <div className="container py-5" role="status" aria-live="polite">
    <span className="visually-hidden">Cargando… / Loading…</span>
  </div>
)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Suspense fallback={<Loading />}><Projects /></Suspense>} />
        <Route path="projects/:slug" element={<Suspense fallback={<Loading />}><ProjectDetail /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<Loading />}><About /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}
