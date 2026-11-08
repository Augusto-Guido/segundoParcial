const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

export function timeAgo(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const diff = (date.getTime() - Date.now()) / 1000
  const abs = Math.abs(diff)
  if (abs < 60) return 'recién'
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute')
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour')
  if (abs < 86400 * 30) return rtf.format(Math.round(diff / 86400), 'day')
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function sortByNewest<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export const plural = (n: number, one: string, many: string) => (n === 1 ? one : many)

/** Clase de Bootstrap para un input según tenga error o no. */
export const inputClass = (error?: string) => `form-control${error ? ' is-invalid' : ''}`