import { useState } from 'react'
import type { PostImage } from '../types'

interface Props {
  images: PostImage[]
  large?: boolean
}

export default function ImageGallery({ images, large = false }: Props) {
  // Si una URL está rota, la ocultamos en vez de mostrar el ícono de imagen rota.
  const [failed, setFailed] = useState<number[]>([])
  const visible = images.filter(img => !failed.includes(img.id))

  if (visible.length === 0) return null

  return (
    <div
      className={`gallery ${visible.length > 1 ? 'multi' : 'single'}${large ? ' large' : ''}`}
    >
      {visible.map(img => (
        <img
          key={img.id}
          src={img.url}
          alt="Imagen adjunta a la publicación"
          loading="lazy"
          onError={() => setFailed(prev => [...prev, img.id])}
        />
      ))}
    </div>
  )
}