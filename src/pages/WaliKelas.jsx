import { useState } from 'react'
import { Icon } from '@iconify/react'
import PageHeader from '../components/PageHeader'
import SpotCard from '../components/SpotCard'

const walikelasData = {
  XII: {
    nama: 'Pak Sadarta Sinuraya, S.Kom',
    nip: '197808152008011001',
    mapel: 'PPB (Pemrograman Perangkat Bergerak)',
    image: '/image/pak_darta.jpeg',
    tentang:
      'Pak Sadarta adalah guru yang sangat berpengalaman di bidang RPL. Dengan dedikasi tinggi, beliau membimbing kami untuk menjadi generasi yang siap menghadapi dunia teknologi.',
    quote:
      'Setiap siswa memiliki potensi luar biasa. Tugas kita adalah membantu mereka menemukan dan mengembangkan potensi tersebut.',
    pesan:
      'Selamat datang di kelas XII RPL 2! Ini adalah tahun terakhir kalian di SMKN 2 Kota Tebing Tinggi. Manfaatkan waktu ini dengan baik untuk belajar, berkarya, dan menciptakan kenangan indah bersama. Saya berkomitmen untuk membimbing kalian menuju kesuksesan. Semangat!',
  },
  XI: {
    nama: 'Bu Nurliza, S.Pd',
    nip: '198505152009012002',
    mapel: 'PKK (Produk Kreatif dan Kewirausahaan)',
    image: '/image/buk_liza.jpeg',
    tentang:
      'Bu Nurliza adalah guru yang sangat kompeten di bidang Produk Kreatif dan Kewirausahaan. Dengan pendekatan yang sistematis, beliau membimbing siswa untuk memahami konsep kewirausahaan dengan mudah.',
    quote: 'Kesuksesan datang kepada mereka yang tidak pernah menyerah dalam belajar.',
    pesan:
      'Halo siswa-siswa XI RPL 2! Tahun ini adalah tahun yang penuh tantangan tapi juga penuh peluang. Tetap semangat belajar dan jangan pernah ragu untuk bertanya. Bersama kita bisa mencapai puncak!',
  },
  X: {
    nama: 'Bu Utami Ningsih, S.Pd',
    nip: '197912032007012003',
    mapel: 'Pemrograman Web dan DPK (Dasar-Dasar Pemrograman Keahlian)',
    image: '/image/buk_tami.jpeg',
    tentang:
      'Bu Utami adalah guru yang penuh semangat dalam mengajarkan dasar-dasar komputer dan jaringan. Dengan kesabaran tinggi, beliau membimbing siswa kelas X untuk memahami fondasi teknologi.',
    quote: 'Mulai dari kecil, raih mimpi besar.',
    pesan:
      'Selamat datang di kelas X RPL 2! Kalian memulai perjalanan baru di dunia RPL. Nikmati setiap proses belajar kalian. Jangan lupa untuk selalu penasaran dan tidak takut mencoba hal baru. Semangat!',
  },
}

const tabs = ['XII', 'XI', 'X']

const WaliKelas = () => {
  const [active, setActive] = useState('XII')
  const w = walikelasData[active]

  return (
    <div>
      <PageHeader icon="lucide:graduation-cap" title="Wali Kelas" subtitle="Perkenalkan wali kelas kami dari kelas X sampai XII" />

      <div className="container-x">
        {/* Tab dengan indikator geser */}
        <div className="mb-12 flex justify-center" data-aos="fade-up">
          <div className="glass relative grid grid-cols-3 rounded-full p-1.5" role="tablist">
            <span
              className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc((100%-0.75rem)/3)] rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ffb020] shadow-[0_8px_26px_-6px_rgba(255,122,26,0.9)] transition-transform duration-500 ease-[cubic-bezier(.3,1.3,.5,1)]"
              style={{ transform: `translateX(${tabs.indexOf(active) * 100}%)` }}
            />
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={active === t}
                onClick={() => setActive(t)}
                className={`relative z-10 px-6 py-3 text-sm font-bold transition-colors sm:px-10 sm:text-base ${
                  active === t ? 'text-white' : 'text-fg/60 hover:text-fg'
                }`}
              >
                Kelas {t}
              </button>
            ))}
          </div>
        </div>

        {/* Profil (key = animasi ulang saat ganti tab) */}
        <div key={active} className="mx-auto grid max-w-6xl animate-pop items-center gap-12 lg:grid-cols-[auto_1fr]">
          <div className="group relative mx-auto">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#ff7a1a] to-[#ff9f1c] opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
            <div className="relative rounded-[2.2rem] bg-gradient-to-br from-[#ff8f3d] via-transparent to-[#ff9f1c] p-[3px]">
              <img
                src={w.image}
                alt={w.nama}
                className="h-80 w-72 rounded-[2rem] border-4 border-ink-900 object-cover sm:h-96 sm:w-80"
              />
            </div>
            <span className="glass absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold">
              <Icon icon="lucide:badge-check" className="text-accent" />
              Wali Kelas {active} RPL 2
            </span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
              <span className="text-gradient">{w.nama}</span>
            </h2>

            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <Icon icon="lucide:book-open" className="text-lg text-accent" />
                {w.mapel}
              </span>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <Icon icon="lucide:id-card" className="text-lg text-accent" />
                NIP {w.nip}
              </span>
            </div>

            <SpotCard className="glass mt-6 rounded-3xl p-6 text-left">
              <h3 className="mb-2 flex items-center gap-2 font-display text-lg font-bold">
                <Icon icon="lucide:user" className="text-accent" /> Tentang
              </h3>
              <p className="leading-relaxed text-fg/65">{w.tentang}</p>
            </SpotCard>

            <div className="relative mt-6 overflow-hidden rounded-3xl border border-[#ff8f3d]/25 bg-gradient-to-r from-[#ff7a1a]/15 to-[#ffb020]/10 p-6 text-left">
              <Icon icon="lucide:quote" className="absolute -right-2 -top-2 text-8xl text-fg/[0.06]" />
              <p className="relative text-lg italic leading-relaxed text-fg/85">"{w.quote}"</p>
              <p className="relative mt-3 text-sm text-fg/50">- {w.nama}</p>
            </div>
          </div>
        </div>

        {/* Pesan */}
        <div key={`pesan-${active}`} className="mx-auto mt-24 max-w-3xl animate-pop">
          <h2 className="section-title mb-8 text-center">Pesan dari Wali Kelas</h2>
          <SpotCard className="glass rounded-[2rem] p-8 sm:p-10">
            <Icon icon="lucide:message-circle-heart" className="mb-4 text-4xl text-[#ff5a36]" />
            <p className="text-lg leading-relaxed text-fg/80">{w.pesan}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-fg/10 pt-5">
              <img src={w.image} alt="" className="h-11 w-11 rounded-full object-cover" />
              <p className="font-semibold text-accent">{w.nama}</p>
            </div>
          </SpotCard>
        </div>
      </div>
    </div>
  )
}

export default WaliKelas
