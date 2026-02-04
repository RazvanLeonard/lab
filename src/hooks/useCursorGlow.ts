import { useEffect } from 'react'

export function useCursorGlow() {
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let fadeTimer: ReturnType<typeof setTimeout>

    const handleMove = (e: PointerEvent) => {
      root.style.setProperty('--mx', `${e.clientX}px`)
      root.style.setProperty('--my', `${e.clientY}px`)
      root.style.setProperty('--glow', '1')
      clearTimeout(fadeTimer)
      fadeTimer = setTimeout(() => root.style.setProperty('--glow', '0'), 900)
    }

    const handleLeave = () => root.style.setProperty('--glow', '0')

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerleave', handleLeave)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
      clearTimeout(fadeTimer)
    }
  }, [])
}
