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
    <main className="container pb-5">
      {/* Cabecera del perfil */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-4 border-bottom">
        <div>
          <h2 className="mb-1 fw-bold text-primary">@{user.nickName}</h2>
          <p className="text-muted mb-0">{user.email}</p>
        </div>
        
        <button 
          className="btn btn-outline-danger mt-3 mt-md-0 shadow-sm" 
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>

      <h4 className="mb-4">Tus Publicaciones ({posts.length})</h4>

      <div className="row g-4">
        {loading ? (
          [1, 2, 3].map((n) => (
            <div className="col-md-6 col-lg-4" key={n}>
              <PostSkeleton />
            </div>
          ))
        ) : posts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-light border text-center p-5">
              <p className="mb-0 fs-5">No tenés ninguna publicación todavía.</p>
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