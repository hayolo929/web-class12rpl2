import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import SpotCard from '../components/SpotCard'
import { CountUp, useTypewriter } from '../lib/hooks'
import { students } from '../data/students'
import { moments } from '../data/moments'

/** Kartu foto yang miring mengikuti kursor. */
const Tilt = ({ children, className = '' }) => {
  const ref = useRef(null)
  const move = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) scale(1.02)`
  }
  const leave = () => {
    ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)'
  }
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

const typedWords = ['Rekayasa Perangkat Lunak', 'Kreatif & Inovatif', 'Solid & Kompak', 'Siap Menembus Dunia IT']

const features = [
  {
    title: 'Digital Native',
    description: 'Generasi yang tumbuh dengan teknologi, siap menghadapi era digital.',
    icon: 'lucide:rocket',
    c1: '#ff7a1a',
    c2: '#ffb020',
  },
  {
    title: 'Kreatif & Inovatif',
    description: 'Selalu menghadirkan ide-ide baru dalam setiap proyek.',
    icon: 'lucide:lightbulb',
    c1: '#ff5a36',
    c2: '#ffc43d',
  },
  {
    title: 'Solidaritas Tinggi',
    description: 'Komunitas yang saling support dan membangun.',
    icon: 'lucide:handshake',
    c1: '#ffb020',
    c2: '#f59e0b',
  },
]

const explore = [
  { to: '/struktur-kelas', title: 'Struktur Kelas', text: 'Organisasi kelas kami', icon: 'lucide:network', c1: '#ff7a1a', c2: '#ffb020' },
  { to: '/momen', title: 'Momen Berkesan', text: 'Kenangan indah kami', icon: 'lucide:camera', c1: '#ff5a36', c2: '#ff7a1a' },
  { to: '/prestasi', title: 'Prestasi', text: 'Prestasi yang diraih', icon: 'lucide:trophy', c1: '#ffc43d', c2: '#ff5a36' },
]

const Home = () => {
  const typed = useTypewriter(typedWords)
  const stats = [
    { label: 'Siswa', value: students.length, icon: 'lucide:users', c1: '#ff7a1a', c2: '#ffb020' },
    { label: 'Wali Kelas', value: 3, icon: 'lucide:graduation-cap', c1: '#ffb020', c2: '#f59e0b' },
    { label: 'Medali Classmeet', value: 3, icon: 'lucide:medal', c1: '#ffc43d', c2: '#ff5a36' },
    { label: 'Jurusan', text: 'RPL', icon: 'lucide:code', c1: '#ff5a36', c2: '#ff7a1a' },
  ]
  const names = students.map((s) => s.nama.split(' ')[0])

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32">
        <div className="aurora-blob -left-32 top-10 h-[420px] w-[420px] bg-[#ff7a1a]" />
        <div className="aurora-blob -right-24 top-1/3 h-[380px] w-[380px] bg-[#ffb020]" style={{ animationDelay: '-7s' }} />
        <div className="aurora-blob bottom-0 left-1/3 h-72 w-72 bg-[#ff5a36] opacity-30" style={{ animationDelay: '-12s' }} />
        <div className="bg-grid absolute inset-0" />

        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <div
              data-aos="fade-down"
              className="glass inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-5 text-sm font-semibold text-fg/80"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff9f1c] opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff9f1c]" />
              </span>
              <Icon icon="lucide:school" className="text-base text-accent" />
              SMKN 2 Kota Tebing Tinggi
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-6 font-display text-6xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl xl:text-8xl"
            >
              <span className="text-gradient">XII RPL 2</span>
            </h1>

            <p data-aos="fade-up" data-aos-delay="200" className="mt-5 flex min-h-[2.2rem] items-center justify-center text-xl font-medium text-fg/80 sm:text-2xl lg:justify-start">
              <Icon icon="lucide:terminal" className="mr-3 shrink-0 text-accent" />
              <span>{typed}</span>
              <span className="ml-0.5 inline-block h-6 w-[3px] animate-blink bg-[#ff9f1c]" />
            </p>

            <p data-aos="fade-up" data-aos-delay="300" className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg/55 lg:mx-0">
              Kelas penuh semangat dan kreativitas. Kami generasi muda yang siap menghadapi tantangan di era digital.
            </p>

            <div data-aos="fade-up" data-aos-delay="400" className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link to="/daftar-siswa" className="btn-glow">
                <Icon icon="lucide:users" className="text-xl" />
                Lihat Daftar Siswa
                <Icon icon="lucide:arrow-right" className="text-xl" />
              </Link>
              <Link to="/galeri" className="btn-line">
                <Icon icon="lucide:images" className="text-xl" />
                Galeri Foto
              </Link>
            </div>

            <button
              data-aos="fade-up"
              data-aos-delay="450"
              onClick={() => window.dispatchEvent(new Event('open-palette'))}
              className="mt-6 hidden items-center gap-2 text-sm text-fg/50 transition hover:text-accent md:inline-flex"
            >
              <Icon icon="lucide:command" /> Tekan <kbd className="rounded-md border border-fg/20 px-1.5 py-0.5 text-xs">Ctrl K</kbd> untuk pencarian cepat
            </button>

            <div data-aos="fade-up" data-aos-delay="500" className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
              <div className="flex -space-x-3">
                {students.slice(0, 6).map((s) => (
                  <img
                    key={s.image}
                    src={s.image}
                    alt={s.nama}
                    loading="lazy"
                    className="h-11 w-11 rounded-full border-2 border-ink-950 object-cover transition-transform hover:z-10 hover:-translate-y-1"
                  />
                ))}
              </div>
              <p className="text-left text-sm text-fg/55">
                <strong className="text-fg">{students.length} siswa</strong>
                <br />
                satu kelas, satu keluarga
              </p>
            </div>
          </div>

          {/* Foto kelas */}
          <div data-aos="zoom-in" data-aos-delay="300" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Tilt>
              <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-tr from-[#ff7a1a] via-[#ffb020] to-[#ff5a36] opacity-40 blur-2xl" />
              <div className="glass relative rounded-[2rem] p-3">
                <img
                  src="/image/kenangan (17).jpeg"
                  alt="Foto bersama XII RPL 2"
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
                <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-8 bottom-7 text-left" style={{ transform: 'translateZ(40px)' }}>
                  <p className="font-display text-xl font-bold text-white">Satu kelas, satu cerita</p>
                  <p className="text-sm text-white/80">Foto bersama wali kelas X, XI, dan XII</p>
                </div>
              </div>

              <div
                className="glass absolute -left-4 top-10 flex animate-floaty items-center gap-3 rounded-2xl px-4 py-3 sm:-left-10"
                style={{ transform: 'translateZ(70px)' }}
              >
                <span className="icon-tile h-10 w-10 text-xl" style={{ '--c1': '#ff7a1a', '--c2': '#ffb020' }}>
                  <Icon icon="lucide:code" />
                </span>
                <span className="text-sm font-bold">Coding</span>
              </div>
              <div
                className="glass absolute -right-3 top-1/3 flex animate-floaty items-center gap-3 rounded-2xl px-4 py-3 sm:-right-8"
                style={{ animationDelay: '-2s', transform: 'translateZ(90px)' }}
              >
                <span className="icon-tile h-10 w-10 text-xl" style={{ '--c1': '#ffc43d', '--c2': '#ff5a36' }}>
                  <Icon icon="lucide:trophy" />
                </span>
                <span className="text-sm font-bold">Juara Classmeet</span>
              </div>
              <div
                className="glass absolute -bottom-5 left-8 flex animate-floaty items-center gap-3 rounded-2xl px-4 py-3"
                style={{ animationDelay: '-4s', transform: 'translateZ(60px)' }}
              >
                <span className="icon-tile h-10 w-10 text-xl" style={{ '--c1': '#ff5a36', '--c2': '#ff7a1a' }}>
                  <Icon icon="lucide:heart" />
                </span>
                <span className="text-sm font-bold">Solid</span>
              </div>
            </Tilt>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg/40 md:flex">
          <Icon icon="lucide:mouse" className="text-2xl" />
          <Icon icon="lucide:chevrons-down" className="animate-bounce text-lg" />
        </div>
      </section>

      {/* MARQUEE NAMA */}
      <section className="relative overflow-hidden border-y border-fg/[0.07] bg-fg/[0.02] py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10">
          {[...names, ...names].map((n, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl font-bold text-fg/25">
              {n}
              <Icon icon="lucide:sparkles" className="text-accent/60" />
            </span>
          ))}
        </div>
      </section>

      {/* STATISTIK */}
      <section className="container-x py-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s, i) => (
            <SpotCard
              key={s.label}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="glass rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="icon-tile mx-auto mb-4 h-14 w-14 text-2xl" style={{ '--c1': s.c1, '--c2': s.c2 }}>
                <Icon icon={s.icon} />
              </div>
              <p className="font-display text-4xl font-extrabold md:text-5xl">
                {s.text ? s.text : <CountUp to={s.value} />}
              </p>
              <p className="mt-1 text-sm text-fg/55">{s.label}</p>
            </SpotCard>
          ))}
        </div>
      </section>

      {/* TENTANG */}
      <section className="container-x pb-24">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
          <h2 className="section-title">
            Kenalan dengan <span className="text-gradient">kelas kami</span>
          </h2>
          <p className="mt-4 text-lg text-fg/55">
            Kelas XII RPL 2 adalah kelas yang penuh semangat dan kreativitas, dengan generasi muda yang siap menghadapi
            era digital.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <SpotCard
              key={f.title}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="glass group rounded-3xl p-8"
            >
              <div
                className="icon-tile mb-6 h-16 w-16 text-3xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                style={{ '--c1': f.c1, '--c2': f.c2 }}
              >
                <Icon icon={f.icon} />
              </div>
              <h3 className="font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-fg/55">{f.description}</p>
            </SpotCard>
          ))}
        </div>
      </section>

      {/* SEKILAS MOMEN: sabuk foto berjalan */}
      <section className="pb-24">
        <div className="mx-auto mb-10 max-w-2xl px-5 text-center" data-aos="fade-up">
          <h2 className="section-title">
            Sekilas <span className="text-gradient">momen</span>
          </h2>
          <p className="mt-4 text-lg text-fg/60">Potongan kenangan yang bikin kita selalu kangen kelas.</p>
        </div>
        <div className="group relative overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
          <div className="flex w-max animate-slideX gap-5 group-hover:[animation-play-state:paused]">
            {[...moments, ...moments].map((m, i) => (
              <Link
                to="/momen"
                key={i}
                className="holo relative block h-64 w-80 shrink-0 overflow-hidden rounded-3xl border border-[#ff7a1a]/25 shadow-[0_18px_40px_-20px_rgba(234,88,12,0.6)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-1"
              >
                <img src={m.image} alt={m.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <p className="text-xs font-bold text-[#ffc43d]">{m.date}</p>
                  <p className="font-display font-bold leading-tight">{m.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WALI KELAS */}
      <section className="container-x pb-24">
        <SpotCard className="glass rounded-[2.2rem] p-6 sm:p-10" data-aos="fade-up">
          <div className="aurora-blob -right-10 -top-10 h-56 w-56 bg-[#ff7a1a] opacity-30" />
          <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="group relative mx-auto">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#ff7a1a] to-[#ff9f1c] opacity-50 blur-2xl transition-opacity group-hover:opacity-80" />
              <div className="avatar-ring relative" style={{ '--c': '#ff8f3d' }}>
                <img
                  src="/image/pak_darta.jpeg"
                  alt="Wali Kelas"
                  className="h-52 w-52 rounded-full border-4 border-ink-900 object-cover sm:h-60 sm:w-60"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-fg/[0.06] px-4 py-1.5 text-sm font-semibold text-accent">
                <Icon icon="lucide:graduation-cap" /> Wali Kelas XII RPL 2
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Pak Sadarta Sinuraya</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-fg/60">
                Guru pembimbing yang selalu mendukung dan membimbing kami menuju kesuksesan.
              </p>
              <Link to="/wali-kelas" className="btn-glow mt-6">
                Selengkapnya
                <Icon icon="lucide:arrow-right" className="text-xl" />
              </Link>
            </div>
          </div>
        </SpotCard>
      </section>

      {/* JELAJAHI */}
      <section className="container-x pb-10">
        <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
          <h2 className="section-title">Jelajahi lebih jauh</h2>
          <p className="mt-4 text-lg text-fg/55">Temukan lebih banyak tentang kelas kami</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {explore.map((e, i) => (
            <SpotCard
              as={Link}
              to={e.to}
              key={e.to}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="glass group flex flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2"
            >
              <div
                className="icon-tile mb-8 h-16 w-16 text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ '--c1': e.c1, '--c2': e.c2 }}
              >
                <Icon icon={e.icon} />
              </div>
              <h3 className="font-display text-xl font-bold">{e.title}</h3>
              <p className="mt-1 text-fg/55">{e.text}</p>
              <span className="mt-8 flex items-center gap-2 text-sm font-bold text-accent">
                Buka halaman
                <Icon icon="lucide:arrow-right" className="text-lg transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </SpotCard>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
