// src/components/TagSelector.tsx
import { useEffect, useState } from 'react';
import { getTags } from '../services/api';
import type { Tag } from '../types';

interface Props {
  selectedTags: number[];
  toggleTag: (tagId: number) => void;
}

export default function TagSelector({ selectedTags, toggleTag }: Props) {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTags()
      .then(setAvailableTags)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="mb-4">
      <label className="form-label fw-bold">Etiquetas</label>
      {error ? (
        <p className="text-danger small">Error al cargar las etiquetas.</p>
      ) : availableTags.length === 0 ? (
        <p className="text-muted small">Cargando etiquetas...</p>
      ) : (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {availableTags.map((tag) => (
            <div key={tag.id} className="form-check form-check-inline m-0">
              <input
                className="btn-check"
                type="checkbox"
                id={`tag-${tag.id}`}
                checked={selectedTags.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
              />
              <label 
                className={`btn btn-sm ${selectedTags.includes(tag.id) ? 'btn-primary' : 'btn-outline-secondary'}`} 
                htmlFor={`tag-${tag.id}`}
              >
                #{tag.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}