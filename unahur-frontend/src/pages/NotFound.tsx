// src/pages/NotFound.tsx
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-4">Página no encontrada</h2>
      <p className="lead mb-4">
        La ruta que intentás buscar no existe
      </p>
      <Link to="/" className="btn btn-primary">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;