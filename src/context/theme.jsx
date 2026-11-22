import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const readInitial = () => {
  // index.html ya aplicó el tema antes de pintar; lo leemos de ahí
  const attr = document.documentElement.getAttribute('data-bs-theme')
  return attr === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial)

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0D1626' : '#F5F7FA')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* almacenamiento bloqueado: el tema igual funciona en la sesión */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
