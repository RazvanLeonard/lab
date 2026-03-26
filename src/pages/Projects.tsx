import { useState, useEffect, useRef } from 'react'
import { Card, Tags, Tag, FadeIn } from '@/components/ui'
import { getProjects } from '@/lib/projects'
import type { Project } from '@/types/project'

function ProjectPreviewCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  const [imageError, setImageError] = useState(false)
  const mainImage = project.imageUrls[0]

  return (
    <FadeIn>
      <Card className="h-full">
        <button
          type="button"
          onClick={onClick}
          className="group flex h-full w-full flex-col text-left"
        >
          <div className="flex h-full flex-col space-y-3">
            {mainImage && !imageError ? (
              <div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-slate-950/65 transition-transform duration-300 group-hover:scale-[1.08]">
                <img
                  src={mainImage}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : null}
            <div>
              <h3 className="text-lg font-bold text-text transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <p className="text-sm text-accent">@ {project.company}</p>
              <p className="mt-1 text-sm text-muted">
                {project.dateStart} to {project.dateEnd}
                {project.location && ` · ${project.location}`}
              </p>
            </div>
            <p className="mt-auto pt-2 text-sm text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Open project details →
            </p>
          </div>
        </button>
      </Card>
    </FadeIn>
  )
}

function ProjectGallery({
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
    .filter(({ i }) => !imageErrors[i + 1])

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

    // Normalize marquee speed: keep roughly constant px/sec across different projects.
    // (Animation is translateX(-50%), so distance ~ half of track width.)
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
        className="panel-dark relative flex-shrink-0 cursor-zoom-in overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 outline-none ring-offset-2 ring-offset-slate-950 focus-visible:ring-2 focus-visible:ring-accent"
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

function ProjectDetailPage({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const mainImage = project.imageUrls[0]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      data-lenis-prevent
    >
      {/* Backdrop - fade in */}
      <div
        className="fixed inset-0 bg-slate-950/78 backdrop-blur-xl pointer-events-none"
        style={{ animation: 'projectFadeIn 0.3s ease-out' }}
        aria-hidden
      />

      {/* Content - slide up, click outside to close */}
      <div
        className="relative z-10 min-h-screen p-4 md:p-8"
        style={{ animation: 'projectSlideUp 0.4s ease-out' }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="fixed right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-slate-900/75 text-slate-200 backdrop-blur-xl transition-all duration-200 hover:scale-110 hover:border-white/45 hover:text-white"
          aria-label="Close"
        >
          <span className="text-xl">×</span>
        </button>

        <div
          className="project-sheet-scroll panel-dark relative mx-auto h-[calc(100vh-2rem)] max-w-[1320px] overflow-y-auto rounded-[28px] p-4 md:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <article className="panel-dark overflow-hidden rounded-[22px] p-0">
            {/* Hero image */}
            {mainImage && !imageErrors[0] && (
              <div className="group relative h-[46vh] min-h-[300px] w-full overflow-hidden">
                <img
                  src={mainImage}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.08]"
                  style={{ animation: 'projectScaleIn 0.5s ease-out 0.1s both' }}
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [0]: true }))
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-slate-950/55 to-slate-950/90" />
              </div>
            )}

            {/* Content */}
            <div className="project-content-reveal relative -mt-8 rounded-t-[24px] border-t border-white/10 bg-slate-900/24 px-6 pb-10 pt-8 backdrop-blur-xl md:-mt-10 md:px-10 md:pb-12 md:pt-10">
            {/* Header */}
            <header className="mb-8" style={{ animation: 'projectFadeInUp 0.5s ease-out 0.2s both' }}>
              <button
                type="button"
                onClick={onClose}
                className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
              >
                ← Back to project list
              </button>
              <h1
                id="project-title"
                className="text-3xl font-extrabold text-text md:text-5xl"
              >
                {project.title}
              </h1>
              <p className="mt-2 text-lg text-accent">@ {project.company}</p>
              <p className="mt-1 text-slate-300">
                {project.dateStart} to {project.dateEnd}
                {project.location && ` · ${project.location}`}
              </p>
            </header>

            {/* Description */}
            <div className="mb-10" style={{ animation: 'projectFadeInUp 0.5s ease-out 0.3s both' }}>
              <p className="whitespace-pre-line text-lg leading-relaxed text-slate-100 md:text-xl">
                {project.description}
              </p>
            </div>

            {/* Gallery */}
            {project.imageUrls.length > 1 && (
              <ProjectGallery
                imageUrls={project.imageUrls.slice(1)}
                imageErrors={imageErrors}
                onImageError={(i) =>
                  setImageErrors((prev) => ({ ...prev, [i + 1]: true }))
                }
              />
            )}

            {/* Tags */}
            <footer style={{ animation: 'projectFadeInUp 0.5s ease-out 0.4s both' }}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
                Technologies
              </h3>
              <Tags>
                {project.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </Tags>
            </footer>
            </div>
          </article>
        </div>
      </div>

    </div>
  )
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  return (
    <main className="page bg-transparent py-11 shadow-none">
      <div className="container mx-auto max-w-[1100px] px-5">
        <section className="mb-10">
          <h1 className="mb-2 text-3xl font-extrabold text-text md:text-4xl">
            Projects
          </h1>
          <p className="text-muted">
            Real projects I worked on in internships and client environments.
          </p>
        </section>

        <section className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectPreviewCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </section>

        {projects.length === 0 && (
          <div className="panel-dark rounded-card p-12 text-center text-muted">
            No projects yet. Add some from the admin panel.
          </div>
        )}

        {selectedProject && (
          <ProjectDetailPage
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </main>
  )
}
