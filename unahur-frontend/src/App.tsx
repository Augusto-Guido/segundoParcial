import { Routes, Route } from 'react-router'
import './index.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetail from './pages/PostDetail'
import Profile from './pages/Profile'
import NewPost from './pages/NewPost'

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </div>
    </>
  )
}

export default App