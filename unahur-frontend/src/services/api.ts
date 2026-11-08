import type { User, Post, Tag, Comment, PostImage } from '../types'

export const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export class ApiError extends Error {
  status: number

  constructor(message: string, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function fallbackMessage(status: number): string {
  if (status === 400) return 'Los datos enviados no son válidos'
  if (status === 404) return 'No se encontró lo que buscabas'
  if (status >= 500) return 'El servidor tuvo un problema. Probá de nuevo en unos minutos'
  return 'Error en la solicitud'
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    })
  } catch {
    // fetch solo falla acá si no hay conexión (backend apagado, CORS, etc.)
    throw new ApiError(`No se pudo conectar con el servidor (${API_URL}). ¿Está encendida la API?`)
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new ApiError(data?.error || data?.message || fallbackMessage(res.status), res.status)
  }
  return data as T
}

// ---------- Usuarios ----------
export const getUsers = () => request<User[]>('/users')

// La lista de usuarios se usa para completar nombres de autores; la guardamos
// en memoria para no pedirla una vez por cada tarjeta.
let usersCache: Promise<User[]> | null = null
export const getUsersCached = (): Promise<User[]> => {
  if (!usersCache) {
    usersCache = getUsers().catch(err => {
      usersCache = null
      throw err
    })
  }
  return usersCache
}

export const getUserById = (id: number) => request<User>(`/users/${id}`)

export const createUser = (nickName: string, email: string) => {
  usersCache = null
  return request<User>('/users', {
    method: 'POST',
    body: JSON.stringify({ nickName, email }),
  })
}

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