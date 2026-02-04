import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjects, saveProjectsDraft, clearProjectsDraft } from '@/lib/projects'
import { isAdminAuthenticated, logoutAdmin } from '@/lib/auth'
import { ProjectForm } from './ProjectForm'
import type { Project } from '@/types/project'

export function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login')
      return
    }
    setProjects(getProjects())
  }, [navigate])

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login')
  }

  const handleSave = (p: Project) => {
    if (editing) {
      setProjects((prev) => prev.map((x) => (x.id === p.id ? p : x)))
      setEditing(null)
    } else {
      setProjects((prev) => [p, ...prev])
    }
    saveProjectsDraft(
      editing
        ? projects.map((x) => (x.id === p.id ? p : x))
        : [p, ...projects]
    )
    setShowForm(false)
  }

  const handleEdit = (p: Project) => {
    setEditing(p)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this project?')) {
      const next = projects.filter((x) => x.id !== id)
      setProjects(next)
      saveProjectsDraft(next)
    }
  }

  const handleExport = () => {
    const json = JSON.stringify(projects, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'projects.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReloadFromStorage = () => {
    setProjects(getProjects())
  }

  const handleLoadFromFile = () => {
    clearProjectsDraft()
    setProjects(getProjects())
  }

  if (!isAdminAuthenticated()) return null

  return (
    <main className="min-h-screen bg-bg py-10">
      <div className="container mx-auto max-w-[900px] px-5">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-text">Admin — Projects</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleLogout}
              className="rounded-lg border border-line bg-surface-2 px-4 py-2 text-sm text-muted hover:bg-surface transition-colors"
            >
              Logout
            </button>
            <a
              href="/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line bg-surface-2 px-4 py-2 text-sm text-text hover:bg-surface transition-colors"
            >
              View Site
            </a>
          </div>
        </div>

        {showForm ? (
          <div className="rounded-card border border-line bg-surface p-6 shadow-card">
            <h2 className="mb-6 text-lg font-semibold text-text">
              {editing ? 'Edit Project' : 'Add Project'}
            </h2>
            <ProjectForm
              project={editing}
              onSubmit={handleSave}
              onCancel={() => {
                setShowForm(false)
                setEditing(null)
              }}
            />
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-bg hover:bg-accent/90 transition-colors"
              >
                + Add Project
              </button>
              <button
                onClick={handleExport}
                className="rounded-lg border border-line bg-surface-2 px-5 py-2.5 text-text hover:bg-surface transition-colors"
              >
                Export JSON
              </button>
              <button
                onClick={handleReloadFromStorage}
                className="rounded-lg border border-line bg-surface-2 px-5 py-2.5 text-sm text-muted hover:bg-surface transition-colors"
              >
                Reload draft
              </button>
              <button
                onClick={handleLoadFromFile}
                className="rounded-lg border border-accent/50 bg-accent-weak/30 px-5 py-2.5 text-sm text-accent hover:bg-accent-weak/50 transition-colors"
              >
                Load from file (reset draft)
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-surface p-4 shadow-card"
                >
                  <div>
                    <h3 className="font-semibold text-text">{p.title}</h3>
                    <p className="text-sm text-muted">
                      {p.company} · {p.dateStart} — {p.dateEnd}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm text-text hover:bg-surface transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="rounded-card border border-line bg-surface p-12 text-center text-muted">
                No projects. Click "Add Project" to get started.
              </div>
            )}

            <div className="mt-8 rounded-lg border border-accent/30 bg-accent-weak/50 p-4 text-sm text-text">
              <p className="font-medium text-accent mb-2">How to publish</p>
              <ol className="list-inside list-decimal space-y-1 text-muted">
                <li>Add your projects and click "Export JSON"</li>
                <li>Replace <code className="rounded bg-surface-2 px-1">src/data/projects.json</code> with the exported file</li>
                <li>Add images to <code className="rounded bg-surface-2 px-1">public/projects/</code> and use <code className="rounded bg-surface-2 px-1">/projects/filename.jpg</code> as image URL</li>
                <li>Commit and push to deploy</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
