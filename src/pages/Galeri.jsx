import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import PageHeader from '../components/PageHeader'
import Lightbox from '../components/Lightbox'

const cowok = [
  ['abdi', 'Abdi'], ['abyan', 'Abyan'], ['afdal', 'Afdal'], ['bayu', 'Bayu'], ['fadly', 'Fadly'], ['fahri', 'Fahri'],
  ['nazriel', 'Nazriel'], ['rahman', 'Rahman'], ['rahsya', 'Rahsya'], ['rezky', 'Rezky'], ['umar', 'Umar'],
]
const cewek = [
  ['andini', 'Andini'], ['angie', 'Angie'], ['aura', 'Aura'], ['ayla', 'Ayla'], ['cinta', 'Cinta'], ['desi', 'Desi'],
  ['destrya', 'Destrya'], ['dian', 'Dian'], ['fina', 'Fina'], ['gadiza', 'Gadiza'], ['melinda', 'Melinda'],
  ['nabila', 'Nabila'], ['naura', 'Naura'], ['nayla', 'Nayla'], ['nisa', 'Nisa'], ['puja', 'Puja'],
  ['rizkyta', 'Rizkyta'], ['mutiq', 'Salwa Mutiq'], ['salwa', 'Salwa'], ['sela', 'Sela'], ['shevia', 'Shevia'],
  ['syahkila', 'Syahkila'], ['yuni', 'Yuni'],
]
const kelas = [
  'kenangan (20)', 'gambar (2)', 'gambar (3)', 'kenangan (1)', 'kenangan (15)', 'kenangan (22)', 'kenangan (21)',
  'kenangan (9)', 'kenangan (10)', 'kenangan (11)', 'kenangan (4)', 'kenangan', 'kenangan (30)', 'kenangan (32)',
]

const photos = [
  ...cowok.map(([f, t]) => ({ category: 'cowok', src: `/image/${f}.jpeg`, title: t })),
  ...cewek.map(([f, t]) => ({ category: 'cewek', src: `/image/${f}.jpeg`, title: t })),
  ...kelas.map((f, i) => ({ category: 'kelas', src: `/image/${f}.jpeg`, title: `Momen ${i + 1}` })),
].map((p, i) => ({ ...p, id: i + 1 }))

const categories = [
  { id: 'semua', label: 'Semua', icon: 'lucide:layout-grid' },
  { id: 'cowok', label: 'Cowo', icon: 'lucide:mars' },
  { id: 'cewek', label: 'Cewe', icon: 'lucide:venus' },
  { id: 'kelas', label: 'Kelas', icon: 'lucide:school' },
]

const Galeri = () => {
  const [filter, setFilter] = useState('semua')
  const [open, setOpen] = useState(null)

  const list = useMemo(() => (filter === 'semua' ? photos : photos.filter((p) => p.category === filter)), [filter])
  const count = (id) => (id === 'semua' ? photos.length : photos.filter((p) => p.category === id).length)

  return (
    <div>
      <PageHeader icon="lucide:images" title="Galeri Foto" subtitle="Kumpulan foto siswa dan momen XII RPL 2" />

      <div className="container-x">
        <div className="mb-10 flex flex-wrap justify-center gap-3" data-aos="fade-up">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={`chip ${filter === c.id ? 'chip-active' : ''}`}>
              <Icon icon={c.icon} className="text-lg" />
              {c.label}
              <span className="rounded-full bg-fg/15 px-2 py-0.5 text-xs">{count(c.id)}</span>
            </button>
          ))}
        </div>

        <div key={filter} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {list.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setOpen(i)}
              style={{ animationDelay: `${Math.min(i, 16) * 35}ms` }}
              className="group relative aspect-square animate-pop overflow-hidden rounded-2xl border border-fg/[0.08] bg-ink-800"
              aria-label={`Perbesar foto ${p.title}`}
            >
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="translate-y-3 font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">{p.title}</p>
                <span className="glass absolute right-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full transition-transform duration-300 group-hover:scale-100">
                  <Icon icon="lucide:zoom-in" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox items={list} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  )
}

export default Galeri
