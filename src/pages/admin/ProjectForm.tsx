import { useState, FormEvent } from 'react'
import type { Project } from '@/types/project'
import { generateId } from '@/lib/projects'

interface ProjectFormProps {
  project?: Project | null
  onSubmit: (p: Project) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title ?? '')
  const [company, setCompany] = useState(project?.company ?? '')
  const [dateStart, setDateStart] = useState(project?.dateStart ?? '')
  const [dateEnd, setDateEnd] = useState(project?.dateEnd ?? '')
  const [location, setLocation] = useState(project?.location ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [imageUrls, setImageUrls] = useState<string[]>(project?.imageUrls ?? [])
  const [tags, setTags] = useState(project?.tags?.join(', ') ?? '')
  const [newImageUrl, setNewImageUrl] = useState('')

  const addImage = () => {
    const url = newImageUrl.trim()
    if (url) {
      setImageUrls((prev) => [...prev, url])
      setNewImageUrl('')
    }
  }

  const removeImage = (i: number) => {
    setImageUrls((prev) => prev.filter((_, idx) => idx !== i))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: project?.id ?? generateId(),
      title,
      company,
      dateStart,
      dateEnd,
      location: location || undefined,
      description,
      imageUrls,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: project?.createdAt ?? new Date().toISOString().slice(0, 10),
    })
  }

  const inputClass =
    'w-full rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-text placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="Project title"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-muted">Company *</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
            placeholder="Company name"
            required
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted">Date Start *</label>
          <input
            type="text"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className={inputClass}
            placeholder="e.g. 2024-01"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-muted">Date End *</label>
          <input
            type="text"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className={inputClass}
            placeholder="e.g. 2024-06"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={inputClass}
          placeholder="e.g. Antwerp, Remote"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="Describe the project..."
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted">Images (URLs)</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className={inputClass}
            placeholder="https://... or /projects/image.jpg"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
          />
          <button
            type="button"
            onClick={addImage}
            className="shrink-0 rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-text hover:bg-surface transition-colors"
          >
            Add
          </button>
        </div>
        {imageUrls.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="group relative">
                <img
                  src={url}
                  alt=""
                  className="h-16 w-24 rounded object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/90 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={inputClass}
          placeholder="Networking, Cisco, Linux"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-accent px-6 py-2.5 font-semibold text-bg hover:bg-accent/90 transition-colors"
        >
          {project ? 'Save' : 'Add Project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-line bg-surface-2 px-6 py-2.5 text-text hover:bg-surface transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
