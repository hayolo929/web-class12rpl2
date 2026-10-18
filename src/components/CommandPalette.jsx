import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { navLinks } from './Navbar'
import { students } from '../data/students'
import { useTheme } from '../lib/theme'

/** Pencarian cepat: Ctrl/⌘ + K. Cari halaman, siswa, atau ganti tema. */
const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)
  const nav = useNavigate()
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQ('')
      setSel(0)
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 30)
    } else document.body.style.overflow = ''
  }, [open])

  const items = useMemo(() => {
    const all = [
      ...navLinks.map((l) => ({ group: 'Halaman', label: l.name, icon: l.icon, run: () => nav(l.path) })),
      {
        group: 'Aksi',
        label: dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap',
        icon: dark ? 'lucide:sun' : 'lucide:moon',
        run: toggle,
      },
      ...students.map((s) => ({
        group: 'Siswa',
        label: s.nama,
        icon: 'lucide:user',
        image: s.image,
        run: () => nav(`/daftar-siswa?q=${encodeURIComponent(s.nama)}`),
      })),
    ]
    const t = q.trim().toLowerCase()
    return (t ? all.filter((i) => i.label.toLowerCase().includes(t)) : all.filter((i) => i.group !== 'Siswa')).slice(0, 8)
  }, [q, dark, nav, toggle])

  useEffect(() => setSel(0), [q])

  if (!open) return null
  const go = (it) => {
    setOpen(false)
    it.run()
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => (s + 1) % Math.max(items.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => (s - 1 + items.length) % Math.max(items.length, 1))
    } else if (e.key === 'Enter' && items[sel]) go(items[sel])
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex animate-pop items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-md"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian cepat"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-[#ff7a1a]/30 bg-ink-900 shadow-[0_30px_100px_-20px_rgba(255,106,0,0.55)]"
      >
        <div className="flex items-center gap-3 border-b border-fg/10 px-5 py-4">
          <Icon icon="lucide:search" className="text-xl text-accent" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Cari halaman atau nama siswa..."
            className="w-full bg-transparent text-fg outline-none placeholder:text-fg/40"
            aria-label="Cari"
          />
          <kbd className="rounded-md border border-fg/15 px-2 py-0.5 text-[11px] text-fg/50">ESC</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {items.length === 0 && <li className="px-4 py-8 text-center text-fg/50">Tidak ada hasil untuk "{q}"</li>}
          {items.map((it, i) => (
            <li key={it.group + it.label}>
              <button
                onMouseEnter={() => setSel(i)}
                onClick={() => go(it)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                  sel === i ? 'bg-gradient-to-r from-[#ff7a1a] to-[#ffa51f] text-white' : 'text-fg/80'
                }`}
              >
                {it.image ? (
                  <img src={it.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className={`grid h-8 w-8 place-items-center rounded-full ${sel === i ? 'bg-white/25' : 'bg-[#ff7a1a]/15 text-accent'}`}>
                    <Icon icon={it.icon} />
                  </span>
                )}
                <span className="flex-1 font-semibold">{it.label}</span>
                <span className={`text-xs ${sel === i ? 'text-white/80' : 'text-fg/40'}`}>{it.group}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 border-t border-fg/10 px-5 py-3 text-xs text-fg/45">
          <span>↑↓ pilih</span>
          <span>↵ buka</span>
          <span className="ml-auto">Ctrl / ⌘ + K</span>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
