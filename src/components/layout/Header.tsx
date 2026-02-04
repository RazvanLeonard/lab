import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
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
          ? 'border-b border-line bg-bg/72 shadow-lg backdrop-blur-md backdrop-saturate-[1.15]'
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
        className="hidden h-[34px] w-[38px] flex-col items-center justify-center gap-1.5 rounded-lg border border-line bg-white/5 md:hidden"
        aria-expanded={mobileNavOpen}
        aria-label="Toggle navigation"
        onClick={() => setMobileNavOpen((o) => !o)}
      >
        <span className="h-0.5 w-5 rounded bg-[#d7d9e3]" />
        <span className="h-0.5 w-5 rounded bg-[#d7d9e3]" />
        <span className="h-0.5 w-5 rounded bg-[#d7d9e3]" />
      </button>

      <nav
        className={`nav-z absolute right-4 top-[68px] flex flex-col gap-2.5 rounded-2xl border border-line bg-bg/95 p-3 shadow-xl backdrop-blur-md md:static md:top-auto md:flex md:flex-row md:items-center md:gap-3 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
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
                  ? 'border border-white/14 bg-white/[0.08] text-text'
                  : 'border border-white/[0.06] bg-white/[0.035] text-text hover:border-white/10 hover:bg-white/[0.06]'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
        <a
          href="mailto:moiserazvanleonard@gmail.com"
          className="flex h-10 items-center justify-center rounded-[14px] border-0 bg-accent px-4 font-extrabold text-bg transition-transform active:translate-y-px md:h-10"
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
