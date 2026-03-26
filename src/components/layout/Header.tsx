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
        className={`sticky top-0 z-50 h-11 pt-[env(safe-area-inset-top,0)] transition-all duration-200 ${
          scrolled || mobileMenuOpen
            ? 'border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl'
            : 'bg-slate-950/62 backdrop-blur-2xl'
        }`}
      >
        <div className="mx-auto flex h-11 w-full max-w-[1200px] items-center justify-between px-4 md:px-6">
        <NavLink
          to="/"
          className="brand-z text-sm font-semibold tracking-tight text-white/95 transition-opacity hover:opacity-80"
        >
          Moise <span className="text-accent">Razvan</span>
        </NavLink>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/95 md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="text-xl leading-none">⋯</span>
        </button>

        <nav className="nav-z hidden items-center gap-7 md:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-xs font-medium tracking-wide transition-opacity ${
                  isActive
                    ? 'text-white'
                    : 'text-white/78 hover:text-white/95'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="mailto:moiserazvanleonard@gmail.com"
            className="text-xs font-medium tracking-wide text-white/78 transition-opacity hover:text-white/95"
          >
            Contact
          </a>
        </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="apple-menu-root fixed inset-0 z-[120] md:hidden" role="dialog" aria-modal="true">
          <button
            className="apple-menu-backdrop absolute inset-0 bg-black/72 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <div className="apple-menu-panel absolute inset-x-0 top-0 border-b border-white/10 bg-slate-950/95 px-5 pb-8 pt-[max(18px,env(safe-area-inset-top))] backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-tight text-white/90">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                aria-label="Close navigation menu"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            <nav className="apple-menu-list flex flex-col">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex h-14 items-center border-b border-white/[0.08] px-1 text-[1.05rem] font-medium tracking-tight transition-opacity ${
                      isActive
                        ? 'text-white'
                        : 'text-white/85'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="mailto:moiserazvanleonard@gmail.com"
                className="mt-4 flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] text-base font-semibold text-white"
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
