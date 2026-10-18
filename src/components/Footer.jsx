import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { navLinks } from './Navbar'

const socials = [
  { icon: 'simple-icons:tiktok', href: 'https://www.tiktok.com/@anarpelda.skanda', label: 'TikTok' },
  { icon: 'simple-icons:instagram', href: 'https://www.instagram.com/twelvsoft.engineer_skanda/', label: 'Instagram' },
]

const ShareButton = () => {
  const [copied, setCopied] = useState(false)
  const share = async () => {
    const data = { title: 'Kelas XII RPL 2', text: 'Website kelas XII RPL 2 SMKN 2 Kota Tebing Tinggi', url: window.location.origin }
    try {
      if (navigator.share) return await navigator.share(data)
      await navigator.clipboard.writeText(data.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {}
  }
  return (
    <button onClick={share} className="btn-line !px-5 !py-3 text-sm" aria-label="Bagikan website">
      <Icon icon={copied ? 'lucide:check' : 'lucide:share-2'} className="text-lg text-accent" />
      {copied ? 'Tautan disalin!' : 'Bagikan'}
    </button>
  )
}

const Footer = () => (
  <footer className="relative mt-24 overflow-hidden">
    <div className="h-px bg-gradient-to-r from-transparent via-[#ff8f3d] to-transparent" />
    <div className="aurora-blob -bottom-40 left-1/4 h-72 w-96 bg-[#ff7a1a] opacity-25" />

    <div className="container-x relative py-16">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="icon-tile h-14 w-14 rounded-full" style={{ '--c1': '#ff7a1a', '--c2': '#ffb020' }}>
              <Icon icon="lucide:code" className="text-2xl" />
            </div>
            <div>
              <h3 className="font-display text-xl font-extrabold">XII RPL 2</h3>
              <p className="text-sm text-fg/50">SMKN 2 Kota Tebing Tinggi</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-fg/60">
            Kelas XII RPL 2 adalah kelas yang penuh inovasi dan kreativitas. Kami siap menciptakan masa depan cerah di
            dunia teknologi.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="glass grid h-12 w-12 place-items-center rounded-full text-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9f1c] hover:text-accent hover:shadow-[0_10px_30px_-8px_rgba(255,159,28,0.6)]"
              >
                <Icon icon={s.icon} />
              </a>
            ))}
            <ShareButton />
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold">Tautan Cepat</h4>
          <ul className="space-y-3">
            {navLinks.slice(0, 5).map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="group flex items-center gap-3 text-fg/60 transition-colors hover:text-fg"
                >
                  <Icon
                    icon={l.icon}
                    className="text-lg text-accent transition-transform duration-300 group-hover:translate-x-1"
                  />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold">Hubungi Kami</h4>
          <div className="space-y-4 text-fg/60">
            <div className="flex items-start gap-3">
              <span className="icon-tile mt-0.5 h-9 w-9 shrink-0 rounded-xl text-lg" style={{ '--c1': '#ff7a1a', '--c2': '#ff7a1a' }}>
                <Icon icon="lucide:map-pin" />
              </span>
              <p>
                SMKN 2 Kota Tebing Tinggi
                <br />
                Jalan Gunung Leuser
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="icon-tile h-9 w-9 shrink-0 rounded-xl text-lg" style={{ '--c1': '#ffb020', '--c2': '#ffb020' }}>
                <Icon icon="lucide:mail" />
              </span>
              <a href="mailto:12rpl2@gmail.com" className="transition-colors hover:text-fg">
                12rpl2@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="relative border-t border-fg/[0.07]">
      <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-sm text-fg/40 md:flex-row">
        <p>© {new Date().getFullYear()} Kelas XII RPL 2 - SMKN 2 Kota Tebing Tinggi. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Dibuat dengan <Icon icon="lucide:heart" className="animate-pulse text-[#ff5a36]" /> oleh Rezky Ramadhan Sagala
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
