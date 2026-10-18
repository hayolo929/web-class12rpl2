import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import PageHeader from '../components/PageHeader'
import SpotCard from '../components/SpotCard'
import { CountUp } from '../lib/hooks'
import { fireConfetti } from '../components/Extras'

const medalStyle = {
  1: { name: 'Emas', c1: '#ffd86b', c2: '#f59e0b' },
  2: { name: 'Perak', c1: '#e5e7eb', c2: '#8b95a7' },
  3: { name: 'Perunggu', c1: '#f0a46a', c2: '#b45f2b' },
}

const achievements = [
  { id: 1, title: 'Juara 2 Classmeet Mobile Legends', level: 'Sekolah', year: '2024', description: 'Prestasi membanggakan dalam Kompetisi Classmeet Mobile Legends.', rank: 2 },
  { id: 2, title: 'Juara 3 Classmeet Mobile Legends', level: 'Sekolah', year: '2024', description: 'Prestasi membanggakan dalam Kompetisi Classmeet Mobile Legends.', rank: 3 },
  { id: 3, title: 'Juara 3 Classmeet Mobile Legends', level: 'Sekolah', year: '2024', description: 'Prestasi membanggakan dalam Kompetisi Classmeet Mobile Legends.', rank: 3 },
]

const countRank = (r) => achievements.filter((a) => a.rank === r).length

const stats = [
  { label: 'Total Prestasi', value: achievements.length, icon: 'lucide:trophy', c1: '#ff7a1a', c2: '#ffb020' },
  { label: 'Juara 1', value: countRank(1), icon: 'lucide:medal', ...medalStyle[1] },
  { label: 'Juara 2', value: countRank(2), icon: 'lucide:medal', ...medalStyle[2] },
  { label: 'Juara 3', value: countRank(3), icon: 'lucide:medal', ...medalStyle[3] },
]

const Prestasi = () => {
  useEffect(() => {
    const t = setTimeout(() => fireConfetti(window.innerWidth / 2, window.innerHeight * 0.3), 700)
    return () => clearTimeout(t)
  }, [])
  return (
  <div>
    <PageHeader icon="lucide:trophy" title="Prestasi Kelas" subtitle="Prestasi yang telah diraih XII RPL 2">
      <button onClick={(e) => fireConfetti(e.clientX, e.clientY)} className="btn-glow">
        <Icon icon="lucide:party-popper" className="text-xl" /> Rayakan!
      </button>
    </PageHeader>

    <div className="container-x">
      <div className="mx-auto mb-14 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <SpotCard
            key={s.label}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className="glass rounded-3xl p-5 text-center transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="icon-tile mx-auto mb-3 h-12 w-12 text-2xl" style={{ '--c1': s.c1, '--c2': s.c2 }}>
              <Icon icon={s.icon} />
            </div>
            <p className="font-display text-3xl font-extrabold">
              <CountUp to={s.value} />
            </p>
            <p className="mt-1 text-sm text-fg/55">{s.label}</p>
          </SpotCard>
        ))}
      </div>

      <div className="mx-auto max-w-3xl space-y-5">
        {achievements.map((a, i) => {
          const m = medalStyle[a.rank]
          return (
            <SpotCard
              key={a.id}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              onClick={(e) => fireConfetti(e.clientX, e.clientY)}
              className="glass group flex cursor-pointer items-center gap-5 rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1 sm:gap-7 sm:p-6"
            >
              <div
                className="icon-tile relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl text-4xl sm:h-24 sm:w-24 sm:text-5xl"
                style={{ '--c1': m.c1, '--c2': m.c2 }}
              >
                <Icon icon="lucide:medal" className="drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <span className="absolute inset-0 w-1/3 animate-sweep bg-white/50 blur-md" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff7a1a]/20 px-3 py-1 text-xs font-bold text-[#c2410c]">
                    <Icon icon="lucide:calendar" /> {a.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffb020]/15 px-3 py-1 text-xs font-bold text-[#b45309]">
                    <Icon icon="lucide:landmark" /> {a.level}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-black/80" style={{ background: m.c1 }}>
                    <Icon icon="lucide:award" /> {m.name}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold sm:text-xl">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fg/55 sm:text-base">{a.description}</p>
              </div>
            </SpotCard>
          )
        })}
      </div>

      <div className="mx-auto mt-20 max-w-3xl" data-aos="fade-up">
        <h2 className="section-title mb-8 text-center">Semangat Prestasi</h2>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#ff8f3d]/25 bg-gradient-to-br from-[#ff7a1a]/20 to-[#ffb020]/10 p-8 sm:p-10">
          <Icon icon="lucide:quote" className="absolute -right-3 -top-3 text-9xl text-fg/[0.06]" />
          <p className="relative text-lg leading-relaxed text-fg/90">
            "Prestasi bukan hanya tentang kemenangan, tetapi tentang usaha, kerja keras, dan tidak pernah menyerah. XII
            RPL 2 terus berusaha untuk menjadi yang terbaik dalam setiap hal yang dilakukan."
          </p>
          <p className="relative mt-5 flex items-center gap-2 border-t border-fg/10 pt-4 font-semibold text-accent">
            <Icon icon="lucide:flame" /> Semangat XII RPL 2
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Prestasi
