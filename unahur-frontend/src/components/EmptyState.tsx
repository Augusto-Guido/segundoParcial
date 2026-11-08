import type { ReactNode } from 'react'

interface Props {
  title: string
  children?: ReactNode
}

export default function EmptyState({ title, children }: Props) {
  return (
    <div className="empty">
      <p className="fw-semibold mb-1">{title}</p>
      {children && <div>{children}</div>}
    </div>
  )
}