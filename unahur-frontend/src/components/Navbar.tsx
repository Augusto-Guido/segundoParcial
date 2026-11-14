import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import logoImg from '../assets/icono.png' 

const linkClass = ({ isActive }: { isActive: boolean }) => 
  isActive ? 'nav-link active fw-bold' : 'nav-link'

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
      <div className="container">
  
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold fs-4" onClick={close}>
          <img 
            src={logoImg} 
            alt="Logo Anti-Social Net" 
            width="40" 
            height="40" 
            className="d-inline-block align-text-top me-2 rounded" 
          />
          UnaHur Anti-Social Net
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="Alternar navegación"
          onClick={() => setOpen(o => !o)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="main-nav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink to="/" end className={linkClass} onClick={close}>
                Inicio
              </NavLink>
            </li>
            
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/new-post" className={linkClass} onClick={close}>
                    Nueva publicación
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className={linkClass} onClick={close}>
                    Perfil ({user.nickName})
                  </NavLink>
                </li>
                <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm px-4" 
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className={linkClass} onClick={close}>
                    Iniciar sesión
                  </NavLink>
                </li>
                <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                  <Link 
                    to="/register" 
                    className="btn btn-primary btn-sm px-4" 
                    onClick={close}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}