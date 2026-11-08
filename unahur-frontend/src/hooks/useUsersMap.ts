import { useEffect, useState } from 'react'
import type { User } from '../types'
import { getUsersCached } from '../services/api'
/*
Devuelve { [id]: User }. Sirve cuando la API no trae el usuario anidado en un post o comentario y hay que buscar el nickName por UserId.
Con enabled = false no hace ningún pedido.
 */
export function useUsersMap(enabled = true) {
  const [map, setMap] = useState<Record<number, User>>({})

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    getUsersCached()
      .then(list => {
        if (cancelled) return
        const next: Record<number, User> = {}
        list.forEach(u => {
          next[u.id] = u
        })
        setMap(next)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [enabled])

  return map
}