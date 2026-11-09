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
    <main className="container pb-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-primary">Crear Nueva Publicación</h2>

      <form onSubmit={handleSubmit} noValidate className="bg-white p-4 rounded-4 shadow-sm border border-light">
        {serverError && <div className="alert alert-danger" role="alert">{serverError}</div>}

        <FormField id="description" label="Descripción *" error={touched ? descriptionError : ''}>
          <textarea
            id="description"
            className={`form-control ${touched && descriptionError ? 'is-invalid' : ''}`}
            rows={4}
            placeholder="Que estas pensando?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setTouched(true)}
          />
        </FormField>

        <hr className="my-4" />
        <ImageInputList imageUrls={imageUrls} setImageUrls={setImageUrls} />

        <hr className="my-4" />
        <TagSelector selectedTags={selectedTags} toggleTag={toggleTag} />

        <div className="d-grid mt-5">
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Publicando...' : 'Crear Publicación'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewPost;