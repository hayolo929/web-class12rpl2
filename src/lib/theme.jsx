import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext({ dark: false, toggle: () => {} })
const KEY = 'rpl2-theme'

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#160c06' : '#fffbf5')
  }, [dark])

  const toggle = useCallback(() => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    setDark((d) => {
      try {
        localStorage.setItem(KEY, d ? 'light' : 'dark')
      } catch (e) {}
      return !d
    })
    setTimeout(() => root.classList.remove('theme-switching'), 600)
  }, [])

  return <ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
