import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Courses from './components/Courses'
import Dashboard from './components/Dashboard'
import { Login } from './components/Auth'
import './index.css'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Home({ user, onEnroll }) {
  return (
    <>
      <Hero />
      <Courses user={user} onEnroll={onEnroll} />
    </>
  )
}

export default function App() {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('uni_session')
    return saved ? JSON.parse(saved) : null
  })

  const navigate = useNavigate()

  const handleLogin = (data) => {
    const s = { token: data.token, user: data.user }
    setSession(s)
    localStorage.setItem('uni_session', JSON.stringify(s))
    navigate('/dashboard')
  }

  const logout = () => {
    setSession(null)
    localStorage.removeItem('uni_session')
    navigate('/')
  }

  const enroll = async (course) => {
    if (!session?.user) {
      navigate('/login')
      return
    }
    const res = await fetch(`${API}/enroll`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id: session.user.id, course_id: course.id }) })
    if (res.ok) {
      navigate('/dashboard')
    } else {
      const err = await res.json()
      alert(err.detail || 'Enrollment failed')
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar user={session?.user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home user={session?.user} onEnroll={enroll} />} />
        <Route path="/courses" element={<Courses user={session?.user} onEnroll={enroll} />} />
        <Route path="/login" element={<Login onSuccess={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard user={session?.user} />} />
        <Route path="*" element={<div className="mx-auto max-w-3xl px-4 py-12"><h2 className="text-2xl font-bold">Not found</h2></div>} />
      </Routes>
      <footer className="border-t mt-16 border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} UniVerse</div>
          <div className="flex gap-4">
            <a className="hover:text-slate-700" href="/test">System Test</a>
            <a className="hover:text-slate-700" href="/">Home</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
