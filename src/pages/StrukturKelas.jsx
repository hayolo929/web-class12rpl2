import { Icon } from '@iconify/react'
import PageHeader from '../components/PageHeader'
import SpotCard from '../components/SpotCard'

// Tiap baris = satu tingkat struktur. Baris berisi 2 orang tampil berdampingan.
const levels = [
  [{ title: 'Wali Kelas', name: 'Pak Sadarta Sinuraya, S.Kom', image: '/image/pak_darta.jpeg', icon: 'lucide:graduation-cap', color: '#e8501f', big: true }],
  [{ title: 'Ketua Kelas', name: 'Rezky Ramadhan Sagala', image: '/image/ketua.jpeg', icon: 'lucide:crown', color: '#ff8f3d', big: true }],
  [{ title: 'Wakil Ketua', name: 'Ayla Kaafi', image: '/image/ayla.jpeg', icon: 'lucide:shield-check', color: '#ff5a36', big: true }],
  [
    { title: 'Sekretaris', name: 'Gadiza Riahma', image: '/image/gadiza.jpeg', icon: 'lucide:pencil', color: '#ff9f1c' },
    { title: 'Wakil Sekretaris', name: 'Nabila Nasution', image: '/image/nabila.jpeg', icon: 'lucide:pen-line', color: '#fdba74' },
  ],
  [
    { title: 'Bendahara', name: 'Desi Duwi Yanti', image: '/image/desi.jpeg', icon: 'lucide:wallet', color: '#ffc43d' },
    { title: 'Wakil Bendahara', name: 'Mutiara Rizkyta', image: '/image/rizkyta.jpeg', icon: 'lucide:piggy-bank', color: '#fb923c' },
  ],
]

const Person = ({ p, delay }) => (
  <SpotCard
    data-aos="fade-up"
    data-aos-delay={delay}
    className={`glass group rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-2 ${
      p.big ? 'w-72' : 'w-64'
    }`}
    style={{ '--c': p.color }}
  >
    <div className="relative mx-auto w-fit">
      <div className="absolute inset-0 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-80" style={{ background: p.color }} />
      <div className="avatar-ring relative">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className={`rounded-full border-4 border-ink-900 object-cover ${p.big ? 'h-32 w-32' : 'h-28 w-28'}`}
        />
      </div>
      <span
        className="absolute -bottom-1 -right-1 grid h-10 w-10 place-items-center rounded-full border-4 border-ink-900 text-lg text-white"
        style={{ background: p.color }}
      >
        <Icon icon={p.icon} />
      </span>
    </div>
    <h3 className="mt-5 font-display text-lg font-bold" style={{ color: p.color }}>
      {p.title}
    </h3>
    <p className="mt-1 font-semibold text-fg/90">{p.name}</p>
  </SpotCard>
)

const Connector = ({ from, to }) => (
  <div className="relative my-3 flex flex-col items-center" data-aos="fade-in">
    <span className="h-12 w-0.5 rounded" style={{ background: `linear-gradient(${from}, ${to})` }} />
    <span className="absolute -bottom-1 h-2.5 w-2.5 rounded-full" style={{ background: to, boxShadow: `0 0 14px ${to}` }} />
  </div>
)

const StrukturKelas = () => (
  <div>
    <PageHeader icon="lucide:network" title="Struktur Kelas" subtitle="Organisasi Kelas XII RPL 2" />

    <div className="container-x pb-6">
      <div className="flex flex-col items-center">
        {levels.map((row, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-6">
              {row.map((p, j) => (
                <Person key={p.title} p={p} delay={j * 120} />
              ))}
            </div>
            {i < levels.length - 1 && <Connector from={row[0].color} to={levels[i + 1][0].color} />}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default StrukturKelas
