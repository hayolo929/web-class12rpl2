import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import PageHeader from '../components/PageHeader'
import SpotCard from '../components/SpotCard'
import Lightbox from '../components/Lightbox'
import { students } from '../data/students'
import { fireConfetti } from '../components/Extras'

const filters = [
  { id: 'semua', label: 'Semua', icon: 'lucide:layout-grid' },
  { id: 'Laki-laki', label: 'Laki-laki', icon: 'lucide:mars' },
  { id: 'Perempuan', label: 'Perempuan', icon: 'lucide:venus' },
]

const DaftarSiswa = () => {
  const [filter, setFilter] = useState('semua')
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [preview, setPreview] = useState(null)
  useEffect(() => setQuery(params.get('q') || ''), [params])
  const [sort, setSort] = useState('asli')
  const [view, setView] = useState('grid')

  const list = useMemo(
    () =>
      students
        .filter((s) => (filter === 'semua' || s.jk === filter) && s.nama.toLowerCase().includes(query.trim().toLowerCase()))
        .sort((a, b) => (sort === 'az' ? a.nama.localeCompare(b.nama) : sort === 'za' ? b.nama.localeCompare(a.nama) : 0)),
    [filter, query, sort]
  )

  const pickRandom = (e) => {
    if (!list.length) return
    setPreview(Math.floor(Math.random() * list.length))
    fireConfetti(e.clientX, e.clientY)
  }

  const lightboxItems = list.map((s) => ({ src: s.image, title: s.nama, caption: `${s.jk} - ${s.alamat}` }))
  const count = (id) => (id === 'semua' ? students.length : students.filter((s) => s.jk === id).length)

  return (
    <div>
      <PageHeader
        icon="lucide:users"
        title="Daftar Siswa"
        subtitle="Siswa-siswi XII RPL 2 SMKN 2 Kota Tebing Tinggi"
      >
        <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold">
          <Icon icon="lucide:badge-check" className="text-accent" />
          Total {students.length} siswa
        </span>
      </PageHeader>

      <div className="container-x">
        {/* Pencarian + filter */}
        <div className="mb-10 flex flex-col items-center gap-5" data-aos="fade-up">
          <label className="glass flex w-full max-w-md items-center gap-3 rounded-full px-5 py-3 transition focus-within:border-[#ff9f1c]/60 focus-within:shadow-[0_0_0_4px_rgba(255,159,28,0.12)]">
            <Icon icon="lucide:search" className="text-xl text-fg/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama siswa..."
              className="w-full bg-transparent text-fg outline-none placeholder:text-fg/35"
              aria-label="Cari nama siswa"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Hapus pencarian" className="text-fg/50 hover:text-fg">
                <Icon icon="lucide:x" />
              </button>
            )}
          </label>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`chip ${filter === f.id ? 'chip-active' : ''}`}
              >
                <Icon icon={f.icon} className="text-lg" />
                {f.label}
                <span className="rounded-full bg-fg/15 px-2 py-0.5 text-xs">{count(f.id)}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="glass flex items-center gap-2 rounded-full py-1.5 pl-4 pr-2 text-sm font-semibold">
              <Icon icon="lucide:arrow-down-up" className="text-accent" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer rounded-full bg-transparent py-1.5 pr-2 font-semibold outline-none"
                aria-label="Urutkan"
              >
                <option value="asli" className="bg-ink-900">Urutan absen</option>
                <option value="az" className="bg-ink-900">Nama A → Z</option>
                <option value="za" className="bg-ink-900">Nama Z → A</option>
              </select>
            </label>
            <div className="glass flex rounded-full p-1" role="group" aria-label="Tampilan">
              {[['grid', 'lucide:layout-grid'], ['list', 'lucide:list']].map(([v, ic]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={`Tampilan ${v}`}
                  className={`grid h-9 w-11 place-items-center rounded-full text-lg transition ${view === v ? 'bg-gradient-to-r from-[#ff6a00] to-[#ffa51f] text-white' : 'text-fg/60 hover:text-fg'}`}
                >
                  <Icon icon={ic} />
                </button>
              ))}
            </div>
            <button onClick={pickRandom} className="btn-glow !px-5 !py-2.5 text-sm">
              <Icon icon="lucide:dices" className="text-lg" /> Siswa acak
            </button>
          </div>
        </div>

        {/* Grid */}
        <div
          className={
            view === 'grid'
              ? 'grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'mx-auto grid max-w-3xl gap-3'
          }
        >
          {list.map((s, i) => (
            <SpotCard
              as="button"
              key={s.nama}
              onClick={() => setPreview(i)}
              style={{ animationDelay: `${Math.min(i, 14) * 40}ms` }}
              className={`glass group animate-pop transition-transform duration-300 ${view === 'grid' ? 'rounded-3xl p-5 text-center hover:-translate-y-2' : 'flex items-center gap-4 rounded-2xl p-3 text-left hover:translate-x-2'}`}
              aria-label={`Lihat foto ${s.nama}`}
            >
              <div
                className={`avatar-ring ${view === 'grid' ? 'mx-auto' : 'shrink-0'} w-fit`}
                style={{ '--c': s.jk === 'Perempuan' ? '#ff5a36' : '#ff9f1c' }}
              >
                <img
                  src={s.image}
                  alt={s.nama}
                  loading="lazy"
                  decoding="async"
                  className={`rounded-full border-[3px] border-ink-900 object-cover transition-transform duration-500 group-hover:scale-105 ${view === 'grid' ? 'h-24 w-24 sm:h-28 sm:w-28' : 'h-14 w-14'}`}
                />
              </div>
              <div className={view === 'grid' ? '' : 'min-w-0 flex-1'}>
              <h3 className={`text-sm font-bold leading-snug sm:text-base ${view === 'grid' ? 'mt-4' : ''}`}>
                <span className="mr-2 text-xs font-semibold text-accent">{String(students.indexOf(s) + 1).padStart(2, '0')}</span>
                {s.nama}
              </h3>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-fg/[0.06] px-3 py-1 text-xs text-fg/65">
                <Icon icon={s.jk === 'Perempuan' ? 'lucide:venus' : 'lucide:mars'} />
                {s.jk}
              </p>
            </div>
            </SpotCard>
          ))}
        </div>

        {list.length === 0 && (
          <div className="py-20 text-center">
            <Icon icon="lucide:search-x" className="mx-auto text-5xl text-fg/30" />
            <p className="mt-4 text-lg text-fg/50">Tidak ada siswa dengan nama "{query}"</p>
            <button onClick={() => setQuery('')} className="btn-line mt-6">
              Hapus pencarian
            </button>
          </div>
        )}
      </div>

      <Lightbox items={lightboxItems} index={preview} onClose={() => setPreview(null)} onChange={setPreview} />
    </div>
  )
}

export default DaftarSiswa
