import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Post } from '../types';


import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';

const Home = () => {
  useDocumentTitle('Inicio');
  const { showToast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((err) => showToast(err.message || 'Error al cargar las publicaciones', 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  return (
    <main className="container pb-5">
      {/* Banner de bienvenida*/}
      <div className="p-5 mb-5 bg-dark text-white rounded-3 shadow text-center">
        <h1 className="display-4 fw-bold">UnaHur Anti-Social Net</h1>
        <p className="col-md-8 mx-auto fs-5 mt-3">
          Frase de Bievenida!!
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Últimas Publicaciones</h2>
      </div>

      <div className="row g-4">
        {loading ? (
          <>
            {[1, 2, 3].map((n) => (
              <div className="col-md-6 col-lg-4" key={n}>
                <PostSkeleton />
              </div>
            ))}
          </>
        ) : posts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No hay publicaciones todavía. ¡Iniciá sesión y sé el primero en postear!
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <div className="col-md-6 col-lg-4" key={post.id}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Home;