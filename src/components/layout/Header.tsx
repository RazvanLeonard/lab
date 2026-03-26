import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/passions', label: 'Passions' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const SCROLL_TRIGGER = 8
    const update = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop ?? 0
      setScrolled(y > SCROLL_TRIGGER)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    const raf = () => {
      update()
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)
    return () => {
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(id)
    }
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex h-[68px] items-center justify-between px-4 pt-[env(safe-area-inset-top,0)] transition-all duration-200 md:px-5 ${
          scrolled
            ? 'border-b border-white/15 bg-slate-900/35 shadow-lg backdrop-blur-xl backdrop-saturate-150'
            : 'border-b-0 bg-transparent'
        }`}
      >
        <NavLink
          to="/"
          className="brand-z text-sm font-black uppercase tracking-wide text-text hover:text-text md:text-base"
        >
          MOISE <span className="text-accent">RAZVAN</span>
        </NavLink>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-900/40 text-white backdrop-blur-xl md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="text-lg leading-none">⋯</span>
        </button>

        <nav className="nav-z hidden items-center gap-3 md:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex h-10 items-center justify-center rounded-[14px] px-4 font-semibold transition-all duration-150 ${
                  isActive
                    ? 'border border-white/24 bg-white/[0.12] text-text backdrop-blur-md'
                    : 'border border-white/[0.12] bg-white/[0.05] text-text backdrop-blur-md hover:border-white/20 hover:bg-white/[0.10]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="mailto:moiserazvanleonard@gmail.com"
            className="flex h-10 items-center justify-center rounded-[14px] border border-cyan-200/35 bg-cyan-300/80 px-4 font-extrabold text-slate-950 shadow-[0_8px_24px_rgba(34,211,238,0.35)] backdrop-blur-md transition-transform active:translate-y-px md:h-10"
          >
            Contact
          </a>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <div className="absolute inset-x-0 top-0 rounded-b-3xl border-b border-white/15 bg-slate-950/92 px-5 pb-8 pt-[max(18px,env(safe-area-inset-top))] shadow-2xl backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wide text-white/85">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white"
                aria-label="Close navigation menu"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex h-12 items-center rounded-xl px-4 text-base font-semibold transition-all ${
                      isActive
                        ? 'border border-white/30 bg-white/15 text-white'
                        : 'border border-white/15 bg-white/5 text-white/90'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="mailto:moiserazvanleonard@gmail.com"
                className="mt-2 flex h-12 items-center justify-center rounded-xl border border-cyan-200/40 bg-cyan-300/85 text-base font-extrabold text-slate-950"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
