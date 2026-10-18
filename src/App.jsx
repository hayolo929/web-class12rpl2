import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import { ScrollToTop, ScrollUI, CursorGlow, ClickRipple, Particles, Preloader } from './components/Extras'
import { ThemeProvider } from './lib/theme'
import Home from './pages/Home'
import DaftarSiswa from './pages/DaftarSiswa'
import StrukturKelas from './pages/StrukturKelas'
import WaliKelas from './pages/WaliKelas'
import Galeri from './pages/Galeri'
import Momen from './pages/Momen'
import Prestasi from './pages/Prestasi'
import NotFound from './pages/NotFound'

/** Transisi halus tiap pindah halaman. */
const AnimatedRoutes = () => {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="animate-pageIn">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daftar-siswa" element={<DaftarSiswa />} />
        <Route path="/struktur-kelas" element={<StrukturKelas />} />
        <Route path="/wali-kelas" element={<WaliKelas />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/momen" element={<Momen />} />
        <Route path="/prestasi" element={<Prestasi />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Preloader />
        <ScrollToTop />
        <Particles />
        <CursorGlow />
        <ClickRipple />
        <ScrollUI />
        <CommandPalette />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
