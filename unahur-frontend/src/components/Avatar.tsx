const COLORS = ['#6f5598', '#2f8a5b', '#486581', '#b5582b', '#23808f', '#a83d66']

interface Props {
  name: string
  size?: number
}

export default function Avatar({ name, size = 36 }: Props) {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0

  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: COLORS[hash % COLORS.length],
      }}
    >
      {name.charAt(0).toUpperCase() || '?'}
    </span>
  )
}