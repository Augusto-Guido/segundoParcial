import type { Tag } from '../types'

export default function TagList({ tags }: { tags?: Tag[] }) {
  if (!tags || tags.length === 0) return null
  return (
    <ul className="tag-list" aria-label="Etiquetas">
      {tags.map(t => (
        <li key={t.id} className="chip">
          #{t.name}
        </li>
      ))}
    </ul>
  )
}