import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · UnaHur Anti-Social Net`
  }, [title])
}