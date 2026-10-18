import { useState } from 'react'
import { Icon } from '@iconify/react'
import PageHeader from '../components/PageHeader'
import SpotCard from '../components/SpotCard'
import Lightbox from '../components/Lightbox'
import { moments } from '../data/moments'

const quotes = [
  { text: 'Kelas yang solid dan kompak, penuh dengan kenangan tak terlupakan.', c1: '#ff7a1a', c2: '#ffb020' },
  { text: 'Terima kasih untuk semua pengalaman dan pembelajaran bersama.', c1: '#ff5a36', c2: '#ffc43d' },
]

const Momen = () => {
  const [open, setOpen] = useState(null)
  const items = moments.map((m) => ({ src: m.image, title: m.title, caption: `${m.description} (${m.date})` }))

  return (
    <div>
      <PageHeader icon="lucide:camera" title="Momen Berkesan" subtitle="Kumpulan kenangan indah bersama XII RPL 2" />

      <div className="container-x">
        <div className="relative mx-auto max-w-5xl">
          {/* garis waktu */}
          <div className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#ff8f3d]/60 to-transparent md:left-1/2" />

          {moments.map((m, i) => {
            const flip = i % 2 === 1
            return (
              <div key={m.id} className="relative mb-14 pl-14 md:mb-20 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                <span
                  className="icon-tile absolute left-5 top-6 z-10 h-11 w-11 -translate-x-1/2 rounded-full border-4 border-ink-950 text-lg md:left-1/2"
                  style={{ '--c1': '#ff7a1a', '--c2': '#ffb020' }}
                >
                  <Icon icon="lucide:camera" />
                </span>

                <button
                  onClick={() => setOpen(i)}
                  data-aos={flip ? 'fade-left' : 'fade-right'}
                  className={`group relative block w-full text-left ${flip ? 'md:order-2' : ''}`}
                  aria-label={`Perbesar foto ${m.title}`}
                >
                  <div className="absolute -inset-2 rounded-[1.7rem] bg-gradient-to-br from-[#ff7a1a] to-[#ffb020] opacity-25 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
                  <div className="relative overflow-hidden rounded-3xl border border-fg/10">
                    <img
                      src={m.image}
                      alt={m.title}
                      loading="lazy"
                      decoding="async"
                      className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-72"
                    />
                    <span className="glass absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                      <Icon icon="lucide:zoom-in" />
                    </span>
                  </div>
                </button>

                <div
                  data-aos={flip ? 'fade-right' : 'fade-left'}
                  className={`mt-5 self-center md:mt-0 ${flip ? 'md:order-1 md:text-right' : ''}`}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-fg/[0.07] px-4 py-1.5 text-sm font-bold text-accent">
                    <Icon icon="lucide:calendar" /> {m.date}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg/60">{m.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <h2 className="section-title mb-10 text-center" data-aos="fade-up">
            Kenangan <span className="text-gradient">terindah</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {quotes.map((q, i) => (
              <SpotCard key={i} data-aos="fade-up" data-aos-delay={i * 120} className="glass rounded-3xl p-8">
                <span className="icon-tile mb-5 h-12 w-12 text-2xl" style={{ '--c1': q.c1, '--c2': q.c2 }}>
                  <Icon icon="lucide:quote" />
                </span>
                <p className="text-lg italic leading-relaxed text-fg/85">"{q.text}"</p>
                <p className="mt-4 font-semibold text-fg/50">- XII RPL 2</p>
              </SpotCard>
            ))}
          </div>
        </div>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  )
}

export default Momen
