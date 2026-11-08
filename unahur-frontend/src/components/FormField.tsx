import type { ReactNode } from 'react'

interface Props {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}

export default function FormField({ id, label, error, hint, children }: Props) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {children}
      {hint && !error && <div className="form-text">{hint}</div>}
      {error && (
        <div className="invalid-feedback d-block" id={`${id}-error`} role="alert">
          {error}
        </div>
      )}
    </div>
  )
}