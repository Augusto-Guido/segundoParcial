import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router'; // 
import { getPostById, getComments, getPostImages } from '../services/api';
import { useUsersMap } from '../hooks/useUsersMap';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { timeAgo } from '../utils/format';
import type { Post, Comment as CommentType, PostImage } from '../types';

import Avatar from '../components/Avatar';
import ImageGallery from '../components/ImageGallery';
import TagList from '../components/TagList';
import CommentForm from '../components/CommentForm';
import PostSkeleton from '../components/PostSkeleton';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  useDocumentTitle('Detalle de Publicación');

  const users = useUsersMap(true); 

  const [post, setPost] = useState<Post | null>(null);
  const [images, setImages] = useState<PostImage[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPostData = useCallback(() => {
    if (!id) return;
    
    Promise.all([
      getPostById(id),
      getPostImages(id).catch(() => []),
      getComments(id).catch(() => [])    
    ])
    .then(([postData, imagesData, commentsData]) => {
      setPost(postData);
      setImages(imagesData);
      setComments(commentsData);
    })
    .catch((err) => {
      showToast(err.message || 'Error al cargar la publicación', 'error');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id, showToast]);

  useEffect(() => {
    loadPostData();
  }, [loadPostData]);

  if (loading) {
    return (
      <main className="container pb-5">
        <PostSkeleton />
      </main>
    );
  }

  if (!post) {
    return (
      <div className="container text-center mt-5">
        <h2>Publicación no encontrada</h2>
        <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
      </div>
    );
  }

  const authorName = post.User?.nickName ?? users[post.UserId]?.nickName ?? 'Usuario desconocido';

  return (
    <main className="container pb-5">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary btn-sm shadow-sm">
          &larr; Volver al Inicio
        </Link>
      </div>

      {/* Contenido principal del Post*/}
      <article className="card shadow-sm border-0 mb-4 bg-light">
        <header className="card-header bg-white border-0 pt-4 pb-0 d-flex align-items-center gap-2">
          <Avatar name={authorName} />
          <div>
            <div className="fw-bold text-primary">@{authorName}</div>
            <div className="text-muted small">{timeAgo(post.createdAt)}</div>
          </div>
        </header>

        <div className="card-body">
          <p className="card-text fs-5">{post.description}</p>
          <ImageGallery images={images} large={true} />
          <TagList tags={post.Tags} />
        </div>
      </article>

      {/* Sección de Comentarios */}
      <section className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <h4 className="mb-4 text-primary">Comentarios ({comments.length})</h4>

        {/* Formulario para comentar*/}
        <CommentForm postId={Number(id)} onCreated={loadPostData} />

        <div className="mt-4">
          {comments.length === 0 ? (
            <div className="alert alert-light text-center border">
              Aún no hay comentarios. ¡Sé el primero en opinar!
            </div>
          ) : (
            comments.map((comment) => {
              const commentAuthor = comment.User?.nickName ?? users[comment.UserId]?.nickName ?? 'Usuario desconocido';
              return (
                <div key={comment.id} className="d-flex mb-3 pb-3 border-bottom">
                  <div className="me-3">
                    <Avatar name={commentAuthor} size={40} />
                  </div>
                  <div>
                    <div className="fw-bold">@{commentAuthor}</div>
                    <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                      {timeAgo(comment.createdAt)}
                    </div>
                    <p className="m-0 mt-1 text-dark">{comment.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
};

export default PostDetail;