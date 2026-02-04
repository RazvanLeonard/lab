import type { Project } from '@/types/project'
import projectsData from '@/data/projects.json'

const STORAGE_KEY = 'lab-projects-draft'

export function getProjects(): Project[] {
  try {
    const draft = localStorage.getItem(STORAGE_KEY)
    if (draft) {
      const parsed = JSON.parse(draft) as Project[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }
    }
  } catch {
    // ignore
  }
  return (projectsData as Project[]).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function saveProjectsDraft(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function clearProjectsDraft(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function generateId(): string {
  return crypto.randomUUID?.() ?? `p-${Date.now()}-${Math.random().toString(36).slice(2)}`
}
