import { createContext } from 'react'
import type { User } from '../types'

export interface AuthContextType {
  user: User | null
  login: (nickName: string, password: string) => Promise<User>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)