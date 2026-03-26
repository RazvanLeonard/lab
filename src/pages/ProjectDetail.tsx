import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Tags, Tag } from '@/components/ui'
import { ProjectGallery } from '@/components/project/ProjectGallery'
import { getProjects } from '@/lib/projects'

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const project = useMemo(() => {
    if (!id) return undefined
    return getProjects().find((p) => p.id === id)
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!id) return <Navigate to="/projects" replace />
  if (!project) return <Navigate to="/projects" replace />

  const mainImage = project.imageUrls[0]

  return (
    <main className="w-full bg-transparent pb-20 pt-0">
      {mainImage && !imageErrors[0] && (
        <div className="relative w-full overflow-hidden">
          <img
            src={mainImage}
            alt=""
            className="h-[min(52vh,620px)] w-full object-cover md:h-[min(56vh,680px)]"
            onError={() => setImageErrors((prev) => ({ ...prev, [0]: true }))}
          />
        </div>
      )}

      <div className="mx-auto max-w-[1100px] space-y-12 px-5 pt-10 md:px-6 md:pt-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          ← Back to projects
        </Link>

        <header>
          <h1 className="text-3xl font-extrabold text-text md:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-accent">@ {project.company}</p>
          <p className="mt-1 text-slate-400">
            {project.dateStart} to {project.dateEnd}
            {project.location && ` · ${project.location}`}
          </p>
        </header>

        <div>
          <p className="whitespace-pre-line text-lg leading-relaxed text-slate-100 md:text-xl">
            {project.description}
          </p>
        </div>

        {project.imageUrls.length > 1 && (
          <ProjectGallery
            imageUrls={project.imageUrls.slice(1)}
            imageErrors={imageErrors}
            onImageError={(i) =>
              setImageErrors((prev) => ({ ...prev, [i + 1]: true }))
            }
          />
        )}

        <footer>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Technologies
          </h3>
          <Tags>
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </Tags>
        </footer>
      </div>
    </main>
  )
}
