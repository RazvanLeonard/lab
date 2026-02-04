import { Routes, Route } from 'react-router-dom'
import { Header, Footer } from '@/components/layout'
import { Home, About, Work, Passions } from '@/pages'
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
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return <AppLayout />
}
