import { useState, useEffect } from 'react'
import { Card, Tags, Tag, FadeIn } from '@/components/ui'
import { getProjects } from '@/lib/projects'
import type { Project } from '@/types/project'

function ProjectCard({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false)
  const mainImage = project.imageUrls[0]

  return (
    <FadeIn>
      <Card>
        <div className="space-y-4">
          {mainImage && !imageError ? (
            <div className="aspect-video overflow-hidden rounded-lg bg-surface-2">
              <img
                src={mainImage.startsWith('/') ? mainImage : mainImage}
                alt={project.title}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          ) : null}
          <div>
            <div className="mb-1 flex flex-wrap items-baseline gap-2">
              <h3 className="text-lg font-bold text-text">{project.title}</h3>
              <span className="text-accent">@ {project.company}</span>
            </div>
            <p className="text-sm text-muted">
              {project.dateStart} — {project.dateEnd}
              {project.location && ` · ${project.location}`}
            </p>
          </div>
          <p className="text-text leading-relaxed">{project.description}</p>
          <Tags>
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </Tags>
          {project.imageUrls.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {project.imageUrls.slice(1, 5).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="h-16 w-24 shrink-0 rounded object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </FadeIn>
  )
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

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
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>

        {projects.length === 0 && (
          <div className="rounded-card border border-line bg-surface p-12 text-center text-muted">
            No projects yet. Add some from the admin panel.
          </div>
        )}
      </div>
    </main>
  )
}
