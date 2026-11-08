import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from '../types'
import { getUsers } from '../services/api'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'user'
const DEMO_PASSWORD = '123456' // Login simulado: la contraseña se valida localmente

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.id === 'number' && typeof parsed.nickName === 'string') {
      return parsed as User
    }
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser)

  // Si se inicia o cierra sesión en otra pestaña, esta se entera.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) setUser(readStoredUser())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const login = useCallback(async (nickName: string, password: string) => {
    const users = await getUsers()
    const wanted = nickName.trim().toLowerCase()
    const found = users.find(u => u.nickName.toLowerCase() === wanted)
    if (!found) throw new Error('No existe un usuario con ese nickname')
    if (password !== DEMO_PASSWORD) throw new Error('La contraseña es incorrecta')
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
    } catch {
      // Si el navegador bloquea localStorage, la sesión dura mientras la pestaña esté abierta
    }
    setUser(found)
    return found
  }, [])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // nada que hacer
    }
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}