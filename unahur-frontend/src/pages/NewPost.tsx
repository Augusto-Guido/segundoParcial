// src/pages/NewPost.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { createPost, createPostImage } from '../services/api';

import FormField from '../components/FormField';
import ImageInputList from '../components/ImageInputList';
import TagSelector from '../components/TagSelector';

const NewPost = () => {
  useDocumentTitle('Nueva Publicación');
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) => 
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const descriptionError = !description.trim() ? 'La descripción es obligatoria' : '';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setServerError('');

    if (descriptionError || !user) return;

    setLoading(true);
    try {
      const newPost = await createPost(description.trim(), user.id, selectedTags);

      const validUrls = imageUrls.filter((url) => url.trim() !== '');
      if (validUrls.length > 0) {
        await Promise.all(validUrls.map((url) => createPostImage(url.trim(), newPost.id)));
      }

      showToast('¡Publicación creada con éxito!', 'success');
      navigate('/profile');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al crear la publicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container pb-5 mt-4" style={{ maxWidth: '650px' }}>
      <h2 className="mb-4 fw-bold text-dark">Crear publicación</h2>

      <form 
        onSubmit={handleSubmit} 
        noValidate 
        className="bg-white p-4 p-md-5 rounded-4 shadow border-0"
      >
        {serverError && (
          <div className="alert alert-danger rounded-3" role="alert">
            {serverError}
          </div>
        )}

        {/* Info del usuario*/}
        {user && (
          <div className="d-flex align-items-center mb-4">
            <div 
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3 shadow-sm" 
              style={{ width: '50px', height: '50px', fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              {user.nickName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h5 className="m-0 fw-bold">{user.nickName}</h5>
              <small className="text-muted">Comunidad UNAHUR</small>
            </div>
          </div>
        )}

        <FormField id="description" label="" error={touched ? descriptionError : ''}>
          <textarea
            id="description"
            className={`form-control form-control-lg bg-light border-0 shadow-none ${touched && descriptionError ? 'is-invalid border border-danger' : ''}`}
            rows={4}
            placeholder={`¿Qué estás pensando, ${user?.nickName}?`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setTouched(true)}
            style={{ resize: 'none' }}
          />
        </FormField>

        <hr className="my-4 text-muted" />
        
        <div className="mb-4">
          <h6 className="fw-bold mb-3">📸 Agregar imágenes</h6>
          <ImageInputList imageUrls={imageUrls} setImageUrls={setImageUrls} />
        </div>

        <hr className="my-4 text-muted" />
        
        <div className="mb-4">
          <h6 className="fw-bold mb-3">🏷️ Etiquetas</h6>
          <TagSelector selectedTags={selectedTags} toggleTag={toggleTag} />
        </div>

        <div className="d-grid mt-5">
          <button 
            type="submit" 
            className="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm" 
            disabled={loading}
          >
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewPost;