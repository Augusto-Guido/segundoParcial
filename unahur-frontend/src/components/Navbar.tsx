import { Link } from 'react-router'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">UnaHur Anti-Social Net</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">Inicio</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Registro</Link>
        <Link className="nav-link" to="/profile">Perfil</Link>
        <Link className="nav-link" to="/new-post">Nueva publicación</Link>
      </div>
    </nav>
  )
}