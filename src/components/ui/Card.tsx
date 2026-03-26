import { type ReactNode, useCallback } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!matchMedia('(pointer:fine)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--cx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--cy', `${e.clientY - rect.top}px`)
    e.currentTarget.style.setProperty('--spot', '1')
  }, [])

  const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--spot', '0')
  }, [])

  return (
    <div
      className={`card-hover-glow relative h-full cursor-pointer overflow-hidden rounded-card border border-white/10 bg-[#0f1628]/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/35 hover:shadow-[0_22px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(37,99,235,0.22)] active:translate-y-px active:scale-[0.99] ${className}`}
      style={
        {
          '--cx': '50%',
          '--cy': '50%',
          '--spot': 0,
        } as React.CSSProperties
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="pointer-events-none absolute -inset-0.5 mix-blend-screen opacity-[var(--spot)] transition-opacity duration-200"
        style={{
          background: `radial-gradient(260px circle at var(--cx) var(--cy), rgba(59,130,246,0.2), rgba(59,130,246,0) 62%)`,
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
