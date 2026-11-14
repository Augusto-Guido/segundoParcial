import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Post } from '../types';

import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import bannerImg from '../assets/banner-home.jpg'; 

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
      {/* Banner de bienvenida */}
      <div 
        className="p-5 mb-5 text-white rounded-3 shadow text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${bannerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h1 className="display-4 fw-bold mb-3">UnaHur Anti-Social Net</h1>
        <p className="col-md-8 mx-auto fs-5 fw-light">
          El rincón exclusivo para la comunidad de la universidad. Un espacio sin presiones para compartir ideas, interactuar con compañeros y scrollear en paz mientras compila el código.
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Últimas Publicaciones</h2>
      </div>

      <div className="feed">
        {loading ? (
          [1, 2, 3].map((n) => <PostSkeleton key={n} />)
        ) : posts.length === 0 ? (
          <div className="alert alert-info text-center">
            No hay publicaciones todavía. ¡Iniciá sesión y sé el primero en postear!
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </main>
  );
};

export default Home;