import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { createUser } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import FormField from '../components/FormField'
import { inputClass, isValidEmail } from '../utils/format'

export default function Register() {
  useDocumentTitle('Registrarse')

  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ nickName: false, email: false })
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  // Si ya hay sesión iniciada, no tiene sentido registrarse
  if (user) return <Navigate to="/" replace />

  const nickError = !nickName.trim()
    ? 'Ingresá un nickname'
    : nickName.trim().length < 3
      ? 'El nickname debe tener al menos 3 caracteres'
      : ''

  const emailError = !email.trim()
    ? 'Ingresá tu email'
    : !isValidEmail(email.trim())
      ? 'El email no es válido'
      : ''

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ nickName: true, email: true })
    setServerError('')
    if (nickError || emailError) return

    setLoading(true)
    try {
      await createUser(nickName.trim(), email.trim())
      showToast('Cuenta creada. Ya podés iniciar sesión con la contraseña 123456', 'success')
      navigate('/login', { replace: true })
    } catch (err) {
      // Acá llega el mensaje del backend (ej. "No se pudo crear el usuario")
      setServerError(err instanceof Error ? err.message : 'No se pudo crear el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card card shadow-sm p-4">
      <h1 className="h3 text-center mb-4">Crear cuenta</h1>

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
            placeholder="Ej: maria"
            autoComplete="username"
            aria-invalid={touched.nickName && !!nickError}
            aria-describedby={touched.nickName && nickError ? 'nickName-error' : undefined}
          />
        </FormField>

        <FormField id="email" label="Email" error={touched.email ? emailError : ''}>
          <input
            id="email"
            type="email"
            className={inputClass(touched.email ? emailError : '')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            placeholder="maria@mail.com"
            autoComplete="email"
            aria-invalid={touched.email && !!emailError}
            aria-describedby={touched.email && emailError ? 'email-error' : undefined}
          />
        </FormField>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Creando cuenta…' : 'Registrarme'}
        </button>
      </form>

      <p className="text-center text-muted mt-3 mb-0">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  )
}