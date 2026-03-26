import { Routes, Route, Navigate } from 'react-router-dom'
import { Header, Footer } from '@/components/layout'
import { Home, About, Work, Passions, Projects } from '@/pages'
import { AdminLogin, AdminPanel } from '@/pages/admin'
import { useCursorGlow } from '@/hooks/useCursorGlow'
import { useLenis } from '@/hooks/useLenis'

function AppLayout() {
  useCursorGlow()
  useLenis()

  return (
    <>
      <div className="global-background-layer" aria-hidden="true">
        <span className="animated-orb orb-1" />
        <span className="animated-orb orb-2" />
        <span className="animated-orb orb-3" />

        <span className="particle particle-1" />
        <span className="particle particle-2" />
        <span className="particle particle-3" />
        <span className="particle particle-4" />
        <span className="particle particle-5" />

        <span className="animated-triangle triangle-1" />
        <span className="animated-circle circle-1" />
        <span className="animated-wave wave-1" />
      </div>

      <div className="bg-global-gradient relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/passions" element={<Passions />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return <AppLayout />
}
