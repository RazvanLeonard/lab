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
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-text/95">
      {children}
    </span>
  )
}
