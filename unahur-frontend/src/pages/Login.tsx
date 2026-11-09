import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import FormField from '../components/FormField'
import { inputClass } from '../utils/format'

export default function Login() {
  useDocumentTitle('Iniciar sesión')

  const { user, login } = useAuth()
  const { showToast } = useToast()
  const location = useLocation()
  // ProtectedRoute guarda en "state" la ruta a la que quería ir la persona
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({ nickName: false, password: false })
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  // Si ya hay sesión (o se acaba de iniciar), no tiene sentido mostrar el login
  if (user) return <Navigate to={from} replace />

  const nickError = !nickName.trim() ? 'Ingresá tu nickname' : ''
  const passError = !password ? 'Ingresá tu contraseña' : ''

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ nickName: true, password: true })
    setServerError('')
    if (nickError || passError) return

    setLoading(true)
    try {
      const logged = await login(nickName, password)
      showToast(`¡Hola, ${logged.nickName}!`, 'success')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'No se pudo iniciar sesión')
      setLoading(false)
    }
  }

  return (
    <div className="auth-card card shadow-sm p-4">
      <h1 className="h3 text-center mb-4">Iniciar sesión</h1>

      {serverError && (
        <div className="alert alert-danger py-2" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormField id="nickName" label="Nickname" error={touched.nickName ? nickError : ''}>
          <input
            id="nickName"
            type="text"
            className={inputClass(touched.nickName ? nickError : '')}
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, nickName: true }))}
            placeholder="Tu nickname"
            autoComplete="username"
            aria-invalid={touched.nickName && !!nickError}
            aria-describedby={touched.nickName && nickError ? 'nickName-error' : undefined}
          />
        </FormField>

        <FormField
          id="password"
          label="Contraseña"
          error={touched.password ? passError : ''}
          hint="Contraseña de la demo: 123456"
        >
          <div className="input-group">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={inputClass(touched.password ? passError : '')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              aria-invalid={touched.password && !!passError}
              aria-describedby={touched.password && passError ? 'password-error' : undefined}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(s => !s)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </FormField>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="text-center text-muted mt-3 mb-0">
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
    </div>
  )
}