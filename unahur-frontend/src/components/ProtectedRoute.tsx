import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {  // Guardamos a dónde quería ir para volver ahí después del login
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}