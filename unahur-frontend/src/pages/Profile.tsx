import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { getPostsByUser } from '../services/api';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Post } from '../types';

import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';

const Profile = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  useDocumentTitle(`Perfil de ${user?.nickName || ''}`);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getPostsByUser(user.id)
      .then((data) => setPosts(data))
      .catch((err) => showToast(err.message || 'Error al cargar tus publicaciones', 'error'))
      .finally(() => setLoading(false));
  }, [user, showToast]);

  const handleLogout = () => {
    logout();
    showToast('Cerraste sesión correctamente', 'info');
    navigate('/login'); 
  };

  if (!user) return null; 

  return (
    <main className="container pb-5 mt-4">
      {/* Cabecera del perfil*/}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
        <div 
          className="bg-primary bg-gradient" 
          style={{ height: '120px' }}
        ></div>
        
        <div className="card-body px-4 pb-4 position-relative">
          <div 
            className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow" 
            style={{ 
              width: '100px', 
              height: '100px', 
              fontSize: '3.5rem', 
              fontWeight: 'bold',
              color: 'var(--bs-primary)',
              marginTop: '-70px',
              border: '4px solid white'
            }}
          >
            {user.nickName.charAt(0).toUpperCase()}
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mt-3">
            <div>
              <h2 className="mb-1 fw-bold text-dark">@{user.nickName}</h2>
              <p className="text-muted mb-0">{user.email}</p>
              <span className="badge bg-light text-dark border mt-2 px-3 py-2 rounded-pill">
                Comunidad UNAHUR
              </span>
            </div>
            
            <button 
              className="btn btn-outline-danger mt-3 mt-md-0 rounded-pill px-4 fw-bold shadow-sm" 
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="m-0 fw-bold">
          Tus Publicaciones <span className="text-muted fs-5">({posts.length})</span>
        </h4>
      </div>

      <div className="row g-4">
        {loading ? (
          [1, 2, 3].map((n) => (
            <div className="col-md-6 col-lg-4" key={n}>
              <PostSkeleton />
            </div>
          ))
        ) : posts.length === 0 ? (
          <div className="col-12">
            <div className="bg-white border-0 shadow-sm rounded-4 text-center p-5">
              <div className="fs-1 mb-3">📭</div>
              <h5 className="fw-bold">No tenés ninguna publicación todavía.</h5>
              <p className="text-muted">¡Animate a compartir algo con la comunidad!</p>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <div className="col-md-6 col-lg-4" key={post.id}>
              <PostCard post={post} compact={true} />
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Profile;