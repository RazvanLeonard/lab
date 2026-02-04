import { type ReactNode, useRef, useEffect, useState } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
}

export function FadeIn({ children, className = '' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-1.5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
