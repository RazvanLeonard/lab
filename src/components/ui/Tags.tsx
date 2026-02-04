import { type ReactNode } from 'react'

interface TagsProps {
  children: ReactNode
}

export function Tags({ children }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {children}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface-2 px-3 py-2 text-sm text-text">
      {children}
    </span>
  )
}
