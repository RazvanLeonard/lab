import { useState, useEffect, useRef } from 'react'

export function ProjectGallery({
  imageUrls,
  imageErrors,
  onImageError,
}: {
  imageUrls: string[]
  imageErrors: Record<number, boolean>
  onImageError: (i: number) => void
}) {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredKey, setHoveredKey] = useState<number | null>(null)
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [marqueeDuration, setMarqueeDuration] = useState(25)

  const validImages = imageUrls
    .map((url, i) => ({ url, i }))
    .filter(({ i }) => !imageErrors[i])

  useEffect(() => {
    if (!lightboxUrl) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      e.stopPropagation()
      setLightboxUrl(null)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [lightboxUrl])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const PX_PER_SEC = 42

    const compute = () => {
      const w = el.getBoundingClientRect().width
      if (!w || w <= 0) return

      const distance = w / 2
      const duration = distance / PX_PER_SEC
      const clamped = Math.min(45, Math.max(14, duration))
      setMarqueeDuration(clamped)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [validImages.length])

  const imageEl = (url: string, i: number, key: number) => {
    const isHovered = hoveredKey === key
    const shouldBlurOthers = hoveredKey !== null && hoveredKey !== key
    const baseWidth = 400
    const activeWidth = 520

    return (
      <div
        key={key}
        role="button"
        tabIndex={0}
        aria-label="Open image larger"
        className="relative flex-shrink-0 cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-slate-950/40 shadow-lg outline-none ring-offset-2 ring-offset-slate-950 transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-accent"
        style={{
          width: isHovered ? activeWidth : baseWidth,
          aspectRatio: '1 / 1',
          transition: 'width 250ms ease-out',
        }}
        onPointerEnter={() => {
          setIsPaused(true)
          setHoveredKey(key)
        }}
        onPointerLeave={() => {
          setIsPaused(false)
          setHoveredKey(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          setLightboxUrl(url)
          setIsPaused(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            setLightboxUrl(url)
            setIsPaused(true)
          }
        }}
      >
        <img
          src={url}
          alt=""
          onError={() => onImageError(i)}
          className={[
            'h-full w-full rounded-xl object-cover',
            'transition-[filter,opacity,transform] duration-250 ease-out',
            isHovered ? 'transform scale-[1.04]' : 'transform scale-[1.0]',
            shouldBlurOthers ? 'blur-[4px] opacity-35 saturate-85' : 'blur-0 opacity-100',
          ].join(' ')}
        />
      </div>
    )
  }

  if (validImages.length === 0) return null

  return (
    <>
      <div className="mb-10" style={{ animation: 'projectFadeInUp 0.5s ease-out 0.35s both' }}>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Gallery
        </h3>
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className={`gallery-marquee-track flex gap-8 ${isPaused ? 'paused' : ''}`}
            style={{ width: 'max-content', animationDuration: `${marqueeDuration}s` }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {validImages.map(({ url, i }) => imageEl(url, i, i))}
            {validImages.map(({ url, i }) => imageEl(url, i, i + 100))}
          </div>
        </div>
      </div>

      {lightboxUrl ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            className="gallery-lightbox-backdrop absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setLightboxUrl(null)}
            aria-label="Close preview"
          />
          <div
            className="gallery-lightbox-panel relative z-10 flex max-h-[min(88vmin,88vw)] max-w-[min(88vmin,88vw)] flex-col"
            style={{ width: 'min(88vmin, 88vw)', height: 'min(88vmin, 88vw)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxUrl}
              alt=""
              className="h-full w-full rounded-2xl border border-white/15 object-cover shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setLightboxUrl(null)}
              className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-900/90 text-lg text-white shadow-lg transition hover:scale-105 hover:bg-slate-800"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
