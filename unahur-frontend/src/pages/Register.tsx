// src/pages/Register.tsx useContext
import React, { useState,  } from 'react';
import {  Link } from 'react-router';
//import { registerUser } from '../api/client';
//import { AuthContext } from '../context/AuthContext';

export const Register: React.FC = () => {
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState<string | null>(null);
  //const [loading, setLoading] = useState(false);

  //const { login } = useContext(AuthContext);
  //const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nickName.trim()) {
      setError('El nickName es obligatorio.');
      return;
    }

    /*try {
      setLoading(true);
      const newUser = await registerUser(nickName.trim());
      // Loguear automáticamente tras registro exitoso
      login(newUser);
      navigate('/perfil');
    } catch (err: any) {
      setError(err.message || 'No se pudo crear el usuario.');
    } finally {
      setLoading(false);
    }*/
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card bg-dark text-light border-secondary p-4 shadow">
        <h3 className="text-center mb-3">Crear Cuenta</h3>
        {error && <div className="alert alert-danger p-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">NickName</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="Tu nickName único"
            />
          </div>

          
        </form>

        <p className="mt-3 text-center small text-secondary">
          ¿Ya tienes cuenta? <Link to="/login" className="text-info">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;