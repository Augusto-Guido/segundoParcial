// src/components/ImageInputList.tsx
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  imageUrls: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
}

export default function ImageInputList({ imageUrls, setImageUrls }: Props) {
  const updateUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addInput = () => setImageUrls((prev) => [...prev, '']);
  const removeInput = (index: number) => setImageUrls((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="mb-4">
      <label className="form-label fw-bold">Imágenes (Opcional)</label>
      <p className="text-muted small mb-2">Pegá las URLs de las imágenes que quieras adjuntar.</p>
      
      {imageUrls.map((url, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            type="url"
            className="form-control"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={url}
            onChange={(e) => updateUrl(index, e.target.value)}
          />
          {imageUrls.length > 1 && (
            <button 
              type="button" 
              className="btn btn-outline-danger"
              onClick={() => removeInput(index)}
              title="Eliminar imagen"
            >
              &times;
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-sm btn-outline-secondary mt-1" onClick={addInput}>
        + Agregar otra imagen
      </button>
    </div>
  );
}