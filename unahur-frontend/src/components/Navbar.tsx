import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined)

export default function Navbar() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const handleLogout = () => {
    logout()
    close()
    showToast('Cerraste sesión', 'info')
    navigate('/')
  }

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link to="/" className="brand" onClick={close}>
          UnaHur Anti-Social Net
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>

        <nav id="main-nav" className={`topnav${open ? ' open' : ''}`} aria-label="Principal">
          <NavLink to="/" end className={linkClass} onClick={close}>
            Inicio
          </NavLink>
          {user ? (
            <>
              <NavLink to="/new-post" className={linkClass} onClick={close}>
                Nueva publicación
              </NavLink>
              <NavLink to="/profile" className={linkClass} onClick={close}>
                Perfil ({user.nickName})
              </NavLink>
              <button type="button" className="link-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={close}>
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" className={linkClass} onClick={close}>
                Registrarse
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}