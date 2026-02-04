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
    </>
  )
}

export default function App() {
  return <AppLayout />
}
