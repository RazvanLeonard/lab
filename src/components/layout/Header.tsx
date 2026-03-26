import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/passions', label: 'Passions' },
]

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header
      className={`sticky top-0 z-50 flex h-[68px] items-center justify-between px-5 pt-[env(safe-area-inset-top,0)] transition-all duration-200 ${
        scrolled
          ? 'border-b border-white/15 bg-slate-900/35 shadow-lg backdrop-blur-xl backdrop-saturate-150'
          : 'border-b-0 bg-transparent'
      }`}
    >
      <NavLink
        to="/"
        className="brand-z font-black uppercase tracking-wide text-text hover:text-text"
      >
        MOISE <span className="text-accent">RAZVAN</span>
      </NavLink>

      <button
        type="button"
        className="hidden h-[34px] w-[38px] flex-col items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-slate-900/30 backdrop-blur-md md:hidden"
        aria-expanded={mobileNavOpen}
        aria-label="Toggle navigation"
        onClick={() => setMobileNavOpen((o) => !o)}
      >
        <span className="h-0.5 w-5 rounded bg-[#d7d9e3]" />
        <span className="h-0.5 w-5 rounded bg-[#d7d9e3]" />
        <span className="h-0.5 w-5 rounded bg-[#d7d9e3]" />
      </button>

      <nav
        className={`nav-z absolute right-4 top-[68px] flex flex-col gap-2.5 rounded-2xl border border-white/15 bg-slate-900/38 p-3 shadow-xl backdrop-blur-xl md:static md:top-auto md:flex md:flex-row md:items-center md:gap-3 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
          mobileNavOpen ? 'flex' : 'hidden md:flex'
        }`}
      >
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileNavOpen(false)}
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
  )
}
