import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, FadeIn } from '@/components/ui'
import { getProjects } from '@/lib/projects'
import type { Project } from '@/types/project'

function ProjectPreviewCard({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false)
  const mainImage = project.imageUrls[0]

  return (
    <FadeIn>
      <Card className="h-full">
        <Link
          to={`/projects/${project.id}`}
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
              View project →
            </p>
          </div>
        </Link>
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
            Real projects I worked on in internships and client environments.
          </p>
        </section>

        <section className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectPreviewCard key={project.id} project={project} />
          ))}
        </section>

        {projects.length === 0 && (
          <div className="rounded-card border border-white/10 bg-slate-950/40 p-12 text-center text-muted">
            No projects yet. Add some from the admin panel.
          </div>
        )}
      </div>
    </main>
  )
}
