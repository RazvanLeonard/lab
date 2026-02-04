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
      className={`card-hover-glow cursor-pointer overflow-hidden rounded-card border border-line bg-surface p-6 shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card-hover active:translate-y-px active:scale-[0.99] ${className}`}
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
          background: `radial-gradient(240px circle at var(--cx) var(--cy), rgba(0,183,255,0.18), rgba(0,183,255,0) 60%)`,
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
