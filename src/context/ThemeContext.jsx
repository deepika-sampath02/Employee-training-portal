import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const FONT_ZOOM = { small: 0.9, medium: 1, large: 1.15 }

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('xyz-theme') || 'light')
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('xyz-font-size') || 'medium')
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('xyz-accent-color') || '#2563eb')

  // theme (light/dark) -> data-theme attribute on <html>, picked up in index.css
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('xyz-theme', theme)
  }, [theme])

  // font size -> zoom the whole app (works app-wide without editing every page)
  useEffect(() => {
    document.documentElement.style.zoom = FONT_ZOOM[fontSize] ?? 1
    localStorage.setItem('xyz-font-size', fontSize)
  }, [fontSize])

  // accent color -> CSS variable any component can use via var(--accent-color)
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor)
    localStorage.setItem('xyz-accent-color', accentColor)
  }, [accentColor])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside a ThemeProvider')
  return ctx
}
