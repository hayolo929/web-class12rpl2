import { Icon } from '@iconify/react'

const PageHeader = ({ icon, title, subtitle, children }) => (
  <header className="relative overflow-hidden pb-12 pt-36 text-center">
    <div className="aurora-blob -left-24 top-0 h-72 w-72 bg-[#ff7a1a]" />
    <div className="aurora-blob -right-24 top-10 h-72 w-72 bg-[#ffb020]" style={{ animationDelay: '-6s' }} />
    <div className="bg-grid absolute inset-0" />

    <div className="container-x relative">
      <div
        data-aos="zoom-in"
        className="icon-tile mx-auto mb-6 h-16 w-16 animate-floaty"
        style={{ '--c1': '#ff7a1a', '--c2': '#ffb020' }}
      >
        <Icon icon={icon} className="text-3xl" />
      </div>
      <h1 data-aos="fade-up" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        <span className="text-gradient">{title}</span>
      </h1>
      <p data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-4 max-w-xl text-base text-fg/60 sm:text-lg">
        {subtitle}
      </p>
      {children && (
        <div data-aos="fade-up" data-aos-delay="200" className="mt-6">
          {children}
        </div>
      )}
    </div>
  </header>
)

export default PageHeader
