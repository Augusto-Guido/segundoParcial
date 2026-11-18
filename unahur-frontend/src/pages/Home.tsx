import { useEffect, useState, useMemo } from 'react';
import { getPosts } from '../services/api';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { sortByNewest } from '../utils/format';
import type { Post, Tag } from '../types';

import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import QuickPostBox from '../components/PostBox';
import UniversityLinks from '../components/LinksUniversidad';
import bannerImg from '../assets/banner-home.jpg'; 

const PAGE_SIZE = 5;

const Home = () => {
  useDocumentTitle('Inicio');
  const { showToast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(sortByNewest(data));
      })
      .catch((err) => showToast(err.message || 'Error al cargar las publicaciones', 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  const availableTags = useMemo(() => {
  const tagsMap = new Map<number, Tag>();
  posts.forEach((post) => post.Tags?.forEach((tag) => tagsMap.set(tag.id, tag)));
  return Array.from(tagsMap.values());
}, [posts]);

  const filteredPosts = useMemo(() => {
  if (activeTag === null) return posts;
  return posts.filter((post) => post.Tags?.some((tag) => tag.id === activeTag));
}, [posts, activeTag]);
const visiblePosts = filteredPosts.slice(0, visibleCount);

const handleSelectTag = (tagId: number | null) => {
  setActiveTag(tagId);
  setVisibleCount(PAGE_SIZE);
};

  return (
    <main className="container pb-5">
      <div 
        className="p-5 mb-4 text-white rounded-4 shadow-sm text-center"
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

      <UniversityLinks />

      <QuickPostBox />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h3 className="m-0 fw-bold text-nowrap">Últimas Publicaciones</h3>
        
        {availableTags.length > 0 && (
          <div 
            className="d-flex gap-2 overflow-auto pb-2 pb-md-0" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button 
              className={`btn rounded-pill px-4 fw-bold ${activeTag === null ? 'btn-primary shadow-sm' : 'btn-light text-secondary'}`}
              onClick={() => handleSelectTag(null)}
              style={{ whiteSpace: 'nowrap' }}
            >
              Todas
            </button>
            {availableTags.map(tag => (
              <button 
                key={tag.id}
                className={`btn rounded-pill px-3 ${activeTag === tag.id ? 'btn-primary shadow-sm' : 'btn-light text-secondary'}`}
                onClick={() => handleSelectTag(tag.id)}
                style={{ whiteSpace: 'nowrap' }}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="feed">
        {loading ? (
          [1, 2, 3].map((n) => <PostSkeleton key={n} />)
        ) : filteredPosts.length === 0 ? (
          <div className="alert alert-info border-0 shadow-sm rounded-4 text-center p-4">
            {activeTag 
              ? 'No hay publicaciones con esta etiqueta.' 
              : 'No hay publicaciones todavía. ¡Sé el primero en romper el hielo!'}
          </div>
        ) : (
                    <>
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {visibleCount < filteredPosts.length && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                >
                  Cargar más publicaciones
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;