import { useState, useEffect } from 'react'
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
      <Card>
        <button
          type="button"
          onClick={onClick}
          className="group w-full text-left"
        >
          <div className="space-y-3">
            {mainImage && !imageError ? (
              <div className="aspect-video overflow-hidden rounded-lg bg-surface-2 transition-transform duration-300 group-hover:scale-[1.02]">
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
                {project.dateStart} — {project.dateEnd}
                {project.location && ` · ${project.location}`}
              </p>
            </div>
            <p className="text-sm text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              View project →
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

  const validImages = imageUrls
    .map((url, i) => ({ url, i }))
    .filter(({ i }) => !imageErrors[i + 1])

  if (validImages.length === 0) return null

  const imageEl = (url: string, i: number, key: number) => (
    <div
      key={key}
      className="flex-shrink-0 overflow-hidden rounded-xl bg-surface-2 shadow-lg"
      style={{ width: 280, aspectRatio: '16/10' }}
    >
      <img
        src={url}
        alt=""
        className="h-full w-full object-cover"
        onError={() => onImageError(i)}
      />
    </div>
  )

  return (
    <div className="mb-10" style={{ animation: 'projectFadeInUp 0.5s ease-out 0.35s both' }}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
        Gallery
      </h3>
      <div className="relative overflow-hidden">
        <div
          className={`gallery-marquee-track flex gap-4 ${isPaused ? 'paused' : ''}`}
          style={{ width: 'max-content' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {validImages.map(({ url, i }) => imageEl(url, i, i))}
          {validImages.map(({ url, i }) => imageEl(url, i, i + 100))}
        </div>
      </div>
    </div>
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
        className="fixed inset-0 bg-bg/95 backdrop-blur-md pointer-events-none"
        style={{ animation: 'projectFadeIn 0.3s ease-out' }}
        aria-hidden
      />

      {/* Content - slide up, click outside to close */}
      <div
        className="relative z-10 min-h-screen"
        style={{ animation: 'projectSlideUp 0.4s ease-out' }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="fixed right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/90 text-muted backdrop-blur-md transition-all duration-200 hover:border-accent hover:text-accent hover:scale-110"
          aria-label="Close"
        >
          <span className="text-xl">×</span>
        </button>

        {/* Hero image */}
        {mainImage && !imageErrors[0] && (
          <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
            <img
              src={mainImage}
              alt=""
              className="h-full w-full object-cover"
              style={{ animation: 'projectScaleIn 0.5s ease-out 0.1s both' }}
              onError={() =>
                setImageErrors((prev) => ({ ...prev, [0]: true }))
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative -mt-16 max-w-3xl mx-auto px-6 pb-20" onClick={(e) => e.stopPropagation()}>
          <article className="rounded-card border border-line bg-surface p-8 shadow-card md:p-12">
            {/* Header */}
            <header className="mb-8" style={{ animation: 'projectFadeInUp 0.5s ease-out 0.2s both' }}>
              <button
                type="button"
                onClick={onClose}
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                ← Back to projects
              </button>
              <h1
                id="project-title"
                className="text-3xl font-extrabold text-text md:text-4xl"
              >
                {project.title}
              </h1>
              <p className="mt-2 text-lg text-accent">@ {project.company}</p>
              <p className="mt-1 text-muted">
                {project.dateStart} — {project.dateEnd}
                {project.location && ` · ${project.location}`}
              </p>
            </header>

            {/* Description */}
            <div className="mb-10" style={{ animation: 'projectFadeInUp 0.5s ease-out 0.3s both' }}>
              <p className="text-text leading-relaxed whitespace-pre-line text-lg">
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
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
                Technologies
              </h3>
              <Tags>
                {project.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </Tags>
            </footer>
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
            A selection of projects I've worked on for various companies.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectPreviewCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </section>

        {projects.length === 0 && (
          <div className="rounded-card border border-line bg-surface p-12 text-center text-muted">
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
