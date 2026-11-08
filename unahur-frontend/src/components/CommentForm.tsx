import { useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { createComment } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { inputClass } from '../utils/format'
import FormField from './FormField'

interface Props {
  postId: number
  onCreated: () => void
}

export default function CommentForm({ postId, onCreated }: Props) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const location = useLocation()
  const [content, setContent] = useState('')
  const [touched, setTouched] = useState(false)
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <p className="text-muted">
        <Link to="/login" state={{ from: location.pathname }}>
          Iniciá sesión
        </Link>{' '}
        para dejar un comentario.
      </p>
    )
  }

  const error = !content.trim() ? 'Escribí algo antes de comentar' : ''

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    setServerError('')
    if (error) return

    setLoading(true)
    try {
      await createComment(content.trim(), user.id, postId)
      setContent('')
      setTouched(false)
      showToast('Comentario publicado', 'success')
      onCreated()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'No se pudo publicar el comentario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mb-4">
      {serverError && (
        <div className="alert alert-danger py-2" role="alert">
          {serverError}
        </div>
      )}
      <FormField id="comment" label="Tu comentario" error={touched ? error : ''}>
        <textarea
          id="comment"
          className={inputClass(touched ? error : '')}
          rows={3}
          value={content}
          onChange={e => setContent(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'comment-error' : undefined}
        />
      </FormField>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Publicando…' : 'Publicar comentario'}
      </button>
    </form>
  )
}