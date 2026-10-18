import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useTheme } from '../lib/theme'

export const navLinks = [
  { name: 'Beranda', path: '/', icon: 'lucide:home' },
  { name: 'Daftar Siswa', path: '/daftar-siswa', icon: 'lucide:users' },
  { name: 'Struktur Kelas', path: '/struktur-kelas', icon: 'lucide:network' },
  { name: 'Wali Kelas', path: '/wali-kelas', icon: 'lucide:graduation-cap' },
  { name: 'Galeri', path: '/galeri', icon: 'lucide:images' },
  { name: 'Momen', path: '/momen', icon: 'lucide:camera' },
  { name: 'Prestasi', path: '/prestasi', icon: 'lucide:trophy' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled || open
              ? 'glass shadow-[0_10px_40px_-15px_rgba(234,88,12,0.5)]'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <Link to="/" className="group flex items-center gap-3 pl-1">
            <div
              className="icon-tile h-11 w-11 rounded-full transition-transform duration-500 group-hover:rotate-[360deg]"
              style={{ '--c1': '#ff7a1a', '--c2': '#ffb020' }}
            >
              <Icon icon="lucide:code" className="text-xl" />
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="font-display text-base font-extrabold tracking-tight">XII RPL 2</p>
              <p className="text-[11px] text-fg/50">SMKN 2 Kota Tebing Tinggi</p>
            </div>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const active = pathname === l.path
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                    active ? 'text-white' : 'text-fg/65 hover:text-fg'
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#ff7a1a]/80 to-[#ffb020]/80 shadow-[0_6px_24px_-6px_rgba(255,122,26,0.9)]" />
                  )}
                  <Icon icon={l.icon} className="text-base" />
                  {l.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.dispatchEvent(new Event('open-palette'))}
              className="hidden items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.04] px-3 py-2 text-xs font-semibold text-fg/60 transition hover:border-[#ff7a1a]/50 hover:text-fg sm:flex"
              aria-label="Cari (Ctrl K)"
            >
              <Icon icon="lucide:search" className="text-base" />
              <span className="hidden xl:inline">Cari</span>
              <kbd className="hidden rounded border border-fg/15 px-1.5 text-[10px] xl:inline">Ctrl K</kbd>
            </button>
            <button
              onClick={() => window.dispatchEvent(new Event('open-palette'))}
              className="grid h-11 w-11 place-items-center rounded-full text-xl transition hover:bg-fg/10 sm:hidden"
              aria-label="Cari"
            >
              <Icon icon="lucide:search" />
            </button>
            <button
              onClick={toggle}
              className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full text-xl transition hover:bg-fg/10"
              aria-label={dark ? 'Mode terang' : 'Mode gelap'}
              title={dark ? 'Mode terang' : 'Mode gelap'}
            >
              <Icon icon="lucide:sun" className={`absolute transition-all duration-500 ${dark ? 'rotate-0 scale-100 text-[#ffc43d]' : '-rotate-90 scale-0'}`} />
              <Icon icon="lucide:moon" className={`absolute transition-all duration-500 ${dark ? 'rotate-90 scale-0' : 'rotate-0 scale-100 text-accent'}`} />
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-full text-2xl transition hover:bg-fg/10 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
            >
              <Icon icon={open ? 'lucide:x' : 'lucide:menu'} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile layar penuh */}
      <div
        className={`fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="aurora-blob -right-20 top-20 h-64 w-64 bg-[#ff7a1a]" />
        <div className="aurora-blob -left-20 bottom-20 h-64 w-64 bg-[#ffb020]" />
        <div className="relative flex h-full flex-col justify-center gap-2 px-8 pt-16">
          {navLinks.map((l, i) => (
            <Link
              key={l.path}
              to={l.path}
              style={{ transitionDelay: open ? `${i * 55}ms` : '0ms' }}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 font-display text-2xl font-bold transition-all duration-500 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              } ${pathname === l.path ? 'bg-fg/10 text-fg' : 'text-fg/60 hover:text-fg'}`}
            >
              <span
                className="icon-tile h-11 w-11 text-xl"
                style={{ '--c1': pathname === l.path ? '#ff7a1a' : '#f3cfae', '--c2': pathname === l.path ? '#ffb020' : '#f3cfae' }}
              >
                <Icon icon={l.icon} />
              </span>
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
