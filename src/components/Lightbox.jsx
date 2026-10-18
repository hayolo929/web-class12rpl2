import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

/**
 * items: [{ src, title, caption? }]
 * index: nomor foto yang dibuka (null = tertutup)
 * Fitur: panah/keyboard, geser (swipe), zoom, slideshow otomatis, unduh, strip thumbnail.
 */
const Lightbox = ({ items, index, onClose, onChange }) => {
  const open = index !== null && index !== undefined
  const total = items.length
  const [zoom, setZoom] = useState(false)
  const [play, setPlay] = useState(false)
  const touch = useRef(null)
  const strip = useRef(null)

  const next = () => onChange((index + 1) % total)
  const prev = () => onChange((index - 1 + total) % total)

  useEffect(() => setZoom(false), [index])
  useEffect(() => {
    if (!open) setPlay(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % total)
      if (e.key === 'ArrowLeft') onChange((index - 1 + total) % total)
      if (e.key === ' ') {
        e.preventDefault()
        setPlay((p) => !p)
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, index, total, onClose, onChange])

  useEffect(() => {
    if (!open || !play) return
    const t = setTimeout(() => onChange((index + 1) % total), 3500)
    return () => clearTimeout(t)
  }, [open, play, index, total, onChange])

  useEffect(() => {
    strip.current?.querySelector('[data-active="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [index])

  if (!open || !items[index]) return null
  const item = items[index]
  const btn = 'grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-[#ff7a1a]'

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-pop flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null || zoom) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
        touch.current = null
      }}
    >
      <div className="absolute right-4 top-4 z-10 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setPlay(!play)} className={`${btn} ${play ? '!bg-[#ff7a1a]' : ''}`} aria-label={play ? 'Hentikan slideshow' : 'Putar slideshow'}>
          <Icon icon={play ? 'lucide:pause' : 'lucide:play'} />
        </button>
        <button onClick={() => setZoom(!zoom)} className={btn} aria-label="Zoom">
          <Icon icon={zoom ? 'lucide:zoom-out' : 'lucide:zoom-in'} />
        </button>
        <a href={item.src} download={`${item.title}.jpeg`} className={btn} aria-label="Unduh foto">
          <Icon icon="lucide:download" />
        </a>
        <button onClick={onClose} className={`${btn} hover:rotate-90`} aria-label="Tutup">
          <Icon icon="lucide:x" />
        </button>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className={`${btn} absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-8`}
            aria-label="Sebelumnya"
          >
            <Icon icon="lucide:chevron-left" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className={`${btn} absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-8`}
            aria-label="Berikutnya"
          >
            <Icon icon="lucide:chevron-right" />
          </button>
        </>
      )}

      <figure className="flex min-h-0 max-w-5xl flex-1 flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <div className={`flex min-h-0 items-center justify-center ${zoom ? 'max-h-[72vh] max-w-full overflow-auto' : ''}`}>
          <img
            key={item.src}
            src={item.src}
            alt={item.title}
            onClick={() => setZoom(!zoom)}
            className={`animate-pop rounded-2xl object-contain shadow-[0_30px_100px_-20px_rgba(255,106,0,0.65)] transition-all duration-300 ${
              zoom ? 'max-h-none max-w-none cursor-zoom-out' : 'max-h-[64vh] cursor-zoom-in'
            }`}
            style={zoom ? { width: 'min(1500px, 190vw)' } : undefined}
          />
        </div>
        <figcaption className="mt-4 text-center text-white">
          <p className="font-display text-lg font-bold">{item.title}</p>
          {item.caption && <p className="mt-1 max-w-xl text-sm text-white/70">{item.caption}</p>}
          <p className="mt-2 text-xs text-white/50">
            {index + 1} / {total}
            {play && ' · slideshow'}
          </p>
        </figcaption>
      </figure>

      {total > 1 && (
        <div ref={strip} className="mt-3 flex w-full max-w-3xl gap-2 overflow-x-auto px-1 pb-1" onClick={(e) => e.stopPropagation()}>
          {items.map((it, i) => (
            <button
              key={it.src + i}
              data-active={i === index}
              onClick={() => onChange(i)}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                i === index ? 'scale-110 border-[#ff9f1c]' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
              aria-label={`Foto ${i + 1}`}
            >
              <img src={it.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Lightbox
