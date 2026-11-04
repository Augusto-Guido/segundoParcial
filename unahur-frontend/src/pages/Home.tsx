import { useEffect } from 'react'
import { getPosts, getTags, getComments, getPostImages } from '../services/api'

export default function Home() {
  useEffect(() => {
    getPosts().then(data => console.log('POSTS:', data))
    getTags().then(data => console.log('TAGS:', data))
    getComments(1).then(data => console.log('COMENTARIOS post 1:', data))
    getPostImages(1).then(data => console.log('IMAGENES post 1:', data))
  }, [])

  return <h1>Home</h1>
}