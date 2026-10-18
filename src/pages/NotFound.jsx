import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const NotFound = () => (
  <div className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 pt-28 text-center">
    <div className="aurora-blob -left-20 top-20 h-72 w-72 bg-[#ff7a1a]" />
    <div className="aurora-blob -right-20 bottom-10 h-72 w-72 bg-[#ffb020]" style={{ animationDelay: '-8s' }} />
    <div className="relative">
      <div className="icon-tile mx-auto mb-6 h-20 w-20 animate-wiggle rounded-3xl text-4xl">
        <Icon icon="lucide:compass" />
      </div>
      <h1 className="font-display text-8xl font-extrabold sm:text-9xl">
        <span className="text-gradient">404</span>
      </h1>
      <p className="mt-4 text-xl font-semibold">Halaman tidak ditemukan</p>
      <p className="mt-2 text-fg/60">Sepertinya kamu tersesat. Yuk balik ke beranda.</p>
      <Link to="/" className="btn-glow mt-8">
        <Icon icon="lucide:home" className="text-xl" /> Kembali ke Beranda
      </Link>
    </div>
  </div>
)

export default NotFound
