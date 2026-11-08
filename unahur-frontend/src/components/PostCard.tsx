import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Post, PostImage } from '../types'
import { getComments, getPostImages } from '../services/api'
import { useUsersMap } from '../hooks/useUsersMap'
import { plural, timeAgo } from '../utils/format'
import Avatar from './Avatar'
import ImageGallery from './ImageGallery'
import TagList from './TagList'

interface Props {
  post: Post
  compact?: boolean
  featured?: boolean
}

export default function PostCard({ post, compact = false, featured = false }: Props) {
  const [commentCount, setCommentCount] = useState<number | null>(null)
  const [images, setImages] = useState<PostImage[]>([])

  // Solo pedimos usuarios si la API no trajo al autor dentro del post
  const users = useUsersMap(!post.User)
  const authorName = post.User?.nickName ?? users[post.UserId]?.nickName

  useEffect(() => {
    let cancelled = false
    getComments(post.id)
      .then(list => {
        if (!cancelled) setCommentCount(list.length)
      })
      .catch(() => {
        if (!cancelled) setCommentCount(0)
      })
    if (!compact) {
      getPostImages(post.id)
        .then(list => {
          if (!cancelled) setImages(list)
        })
        .catch(() => {})
    }
    return () => {
      cancelled = true
    }
  }, [post.id, compact])

  return (
    <article className={`post-card${featured ? ' featured' : ''}`}>
      <header className="post-meta">
        {authorName && <Avatar name={authorName} />}
        <div>
          {authorName && <div className="post-author">@{authorName}</div>}
          <div className="post-time">{timeAgo(post.createdAt)}</div>
        </div>
      </header>

      <p className="post-text clamp">{post.description}</p>

      {!compact && <ImageGallery images={images} />}
      {!compact && <TagList tags={post.Tags} />}

      <footer className="post-footer">
        <span className="text-muted">
          {commentCount === null
            ? 'Cargando comentarios…'
            : `${commentCount} ${plural(commentCount, 'comentario', 'comentarios')}`}
        </span>
        <Link to={`/post/${post.id}`} className="btn btn-sm btn-outline-primary">
          Ver más
        </Link>
      </footer>
    </article>
  )
}