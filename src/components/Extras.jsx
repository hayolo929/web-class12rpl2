import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Kembali ke atas setiap pindah halaman. */
export const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/** Garis progres scroll di paling atas + tombol kembali ke atas. */
export const ScrollUI = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? window.scrollY / h : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const circumference = 2 * Math.PI * 22
  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#ff6a00] via-[#ffb020] to-[#ff4d2e]"
        style={{ transform: `scaleX(${progress})`, width: '100%' }}
      />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
        className={`glass fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full transition-all duration-300 hover:-translate-y-1 ${
          progress > 0.08 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,122,26,.15)" strokeWidth="3" />
          <circle
            cx="28"
            cy="28"
            r="22"
            fill="none"
            stroke="url(#g)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff6a00" />
              <stop offset="1" stopColor="#ffb020" />
            </linearGradient>
          </defs>
        </svg>
        <Icon icon="lucide:arrow-up" className="relative text-xl text-accent" />
      </button>
    </>
  )
}

/** Cahaya oranye lembut yang mengikuti kursor. */
export const CursorGlow = () => {
  const ref = useRef(null)
  useEffect(() => {
    if (!finePointer()) return
    const el = ref.current
    let raf
    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let cx = x
    let cy = y
    const move = (e) => {
      x = e.clientX
      y = e.clientY
    }
    const loop = () => {
      cx += (x - cx) * 0.12
      cy += (y - cy) * 0.12
      if (el) el.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full opacity-70 md:block"
      style={{ background: 'radial-gradient(circle, rgba(255,122,26,.2), transparent 65%)' }}
    />
  )
}

/** Riak lingkaran saat klik (efek air). */
export const ClickRipple = () => {
  useEffect(() => {
    if (reduced()) return
    const onClick = (e) => {
      const d = document.createElement('div')
      d.className = 'click-ripple'
      d.style.left = e.clientX + 'px'
      d.style.top = e.clientY + 'px'
      document.body.appendChild(d)
      setTimeout(() => d.remove(), 750)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])
  return null
}

/** Partikel bara api oranye yang melayang naik dan menghindari kursor. */
export const Particles = () => {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const c = ref.current
    const ctx = c.getContext('2d')
    let w, h, raf
    const mouse = { x: -999, y: -999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const colors = ['255,122,26', '255,176,32', '255,90,54', '255,196,61']
    const count = window.innerWidth < 768 ? 22 : 46
    const mk = (init) => ({
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 20,
      r: 1.5 + Math.random() * 3.5,
      vy: 0.18 + Math.random() * 0.5,
      sway: Math.random() * Math.PI * 2,
      col: colors[(Math.random() * colors.length) | 0],
      a: 0.18 + Math.random() * 0.4,
    })
    let ps = []
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      c.width = w * dpr
      c.height = h * dpr
      c.style.width = w + 'px'
      c.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ps = Array.from({ length: count }, () => mk(true))
    }
    const move = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.sway += 0.015
        p.y -= p.vy
        p.x += Math.sin(p.sway) * 0.35
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 130 * 130) {
          const f = (1 - Math.sqrt(d2) / 130) * 2.2
          p.x += (dx / Math.sqrt(d2 + 1)) * f
          p.y += (dy / Math.sqrt(d2 + 1)) * f
        }
        if (p.y < -20) Object.assign(p, mk(false))
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        g.addColorStop(0, `rgba(${p.col},${p.a})`)
        g.addColorStop(1, `rgba(${p.col},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    const vis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(loop)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', move)
    document.addEventListener('visibilitychange', vis)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('visibilitychange', vis)
    }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
}

/** Ledakan konfeti oranye dari titik (x, y). */
export const fireConfetti = (x = window.innerWidth / 2, y = window.innerHeight / 3) => {
  if (reduced()) return
  const c = document.createElement('canvas')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = window.innerWidth
  const h = window.innerHeight
  c.width = w * dpr
  c.height = h * dpr
  c.style.cssText = `position:fixed;inset:0;width:${w}px;height:${h}px;pointer-events:none;z-index:9999`
  document.body.appendChild(c)
  const ctx = c.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const colors = ['#ff6a00', '#ffb020', '#ff4d2e', '#ffc43d', '#ff8f3d', '#ffffff']
  const ps = Array.from({ length: 130 }, () => {
    const a = Math.random() * Math.PI * 2
    const v = 4 + Math.random() * 9
    return {
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5,
      s: 5 + Math.random() * 6, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
      col: colors[(Math.random() * colors.length) | 0], round: Math.random() > 0.6,
    }
  })
  let frames = 0
  const loop = () => {
    ctx.clearRect(0, 0, w, h)
    ps.forEach((p) => {
      p.vy += 0.28
      p.vx *= 0.992
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = Math.max(0, 1 - frames / 150)
      ctx.fillStyle = p.col
      if (p.round) {
        ctx.beginPath()
        ctx.arc(0, 0, p.s / 2, 0, Math.PI * 2)
        ctx.fill()
      } else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2)
      ctx.restore()
    })
    if (++frames < 150) requestAnimationFrame(loop)
    else c.remove()
  }
  loop()
}

/** Layar pembuka singkat: logo + bar loading oranye. Hanya sekali per sesi. */
export const Preloader = () => {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('rpl2-intro')
    } catch (e) {
      return true
    }
  })
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    if (!show) return
    const t1 = setTimeout(() => setLeaving(true), 1500)
    const t2 = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem('rpl2-intro', '1')
      } catch (e) {}
    }, 2100)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [show])
  if (!show) return null
  return (
    <div
      className={`fixed inset-0 z-[10000] grid place-items-center bg-ink-950 transition-all duration-700 ${
        leaving ? 'pointer-events-none -translate-y-full opacity-0' : ''
      }`}
    >
      <div className="aurora-blob left-1/4 top-1/4 h-72 w-72 bg-[#ff7a1a]" />
      <div className="aurora-blob bottom-1/4 right-1/4 h-72 w-72 bg-[#ffb020]" style={{ animationDelay: '-6s' }} />
      <div className="relative text-center">
        <div className="icon-tile mx-auto h-24 w-24 animate-floaty rounded-[2rem]" style={{ '--c1': '#ff6a00', '--c2': '#ffb020' }}>
          <Icon icon="lucide:code" className="text-5xl" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">
          <span className="text-gradient">XII RPL 2</span>
        </h1>
        <p className="mt-1 text-sm text-fg/60">SMKN 2 Kota Tebing Tinggi</p>
        <div className="mx-auto mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-[#ff7a1a]/15">
          <div className="h-full animate-loadbar rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ffb020]" />
        </div>
      </div>
    </div>
  )
}
