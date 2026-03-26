import { useState, FormEvent, ChangeEvent } from 'react'
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

  const handleFilesPicked = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return

    const mapped = files.map((file) => `/projects/${file.name}`)
    setImageUrls((prev) => {
      const next = [...prev]
      mapped.forEach((url) => {
        if (!next.includes(url)) next.push(url)
      })
      return next
    })

    e.currentTarget.value = ''
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
    'input-dark w-full rounded-lg px-4 py-2.5 text-text placeholder-muted'

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
            type="month"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className={inputClass}
            placeholder="2024-01"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-muted">Date End *</label>
          <input
            type="month"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className={inputClass}
            placeholder="2024-06"
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
        <div className="mb-3 flex flex-col gap-2 md:flex-row">
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
            className="chip-dark shrink-0 rounded-lg px-4 py-2.5 text-text transition-colors hover:bg-slate-800/70 md:min-w-[110px]"
          >
            Add
          </button>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          <label
            htmlFor="project-image-files"
            className="chip-dark cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-slate-800/70"
          >
            Select image files
          </label>
          <input
            id="project-image-files"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFilesPicked}
          />
          <span className="text-xs text-muted">
            Tip: copy selected files to <code className="rounded bg-slate-800/70 px-1">public/projects/</code>.
          </span>
        </div>
        {imageUrls.length > 0 && (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="group panel-dark relative flex items-center gap-3 rounded-lg px-3 py-2">
                <div className="h-14 w-20 overflow-hidden rounded bg-slate-900/55">
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <p className="min-w-0 flex-1 truncate text-xs text-muted">{url}</p>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/85 text-xs text-white opacity-80 transition-opacity hover:opacity-100"
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
          className="rounded-lg bg-accent px-6 py-2.5 font-semibold text-bg transition-colors hover:bg-accent/90"
        >
          {project ? 'Save project' : 'Create project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="chip-dark rounded-lg px-6 py-2.5 text-text transition-colors hover:bg-slate-800/70"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
