import type { User, Post, Tag, Comment, PostImage } from '../types'

const API_URL = 'http://localhost:3001'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    // fetch solo falla acá si no hay conexión (backend apagado, CORS, etc.)
    throw new Error('No se pudo conectar con el servidor')
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error || 'Error en la solicitud')
  }
  return data as T
}

// ---------- Usuarios ----------
export const getUsers = () => request<User[]>('/users')

export const getUserById = (id: number) => request<User>(`/users/${id}`)

export const createUser = (nickName: string, email: string) =>
  request<User>('/users', {
    method: 'POST',
    body: JSON.stringify({ nickName, email }),
  })

// ---------- Posts ----------
export const getPosts = () => request<Post[]>('/posts')

export const getPostById = (id: number | string) => request<Post>(`/posts/${id}`)

export const getPostsByUser = (userId: number) =>
  request<Post[]>(`/posts?userId=${userId}`)

export const createPost = (description: string, userId: number, tagIds: number[]) =>
  request<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify({ description, userId, tagIds }),
  })

// ---------- Etiquetas ----------
export const getTags = () => request<Tag[]>('/tags')

// ---------- Comentarios ----------
export const getComments = (postId: number | string) =>
  request<Comment[]>(`/comments/post/${postId}`)

export const createComment = (content: string, userId: number, postId: number) =>
  request<Comment>('/comments', {
    method: 'POST',
    body: JSON.stringify({ content, userId, postId }),
  })

// ---------- Imágenes ----------
export const getPostImages = (postId: number | string) =>
  request<PostImage[]>(`/postimages/post/${postId}`)

export const createPostImage = (url: string, postId: number) =>
  request<PostImage>('/postimages', {
    method: 'POST',
    body: JSON.stringify({ url, postId }),
  })