import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
      if(!res.ok) throw new Error((await res.json()).detail || 'Login failed')
      const data = await res.json()
      onSuccess?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
      <p className="mt-1 text-slate-600">Sign in to continue</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="Email" className="w-full h-11 px-3 rounded border border-slate-300" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="Password" className="w-full h-11 px-3 rounded border border-slate-300" />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button disabled={loading} className="w-full h-11 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">{loading? 'Signing in...' : 'Sign In'}</button>
      </form>
      <Divider label="or" />
      <RegisterInline onSuccess={onSuccess} />
    </div>
  )
}

export function RegisterInline({ onSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) })
      if(!res.ok) throw new Error((await res.json()).detail || 'Registration failed')
      const data = await res.json()
      onSuccess?.({ token: 'registered', user: { id: data.id, name: data.name, email: data.email, role: 'student' } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Full name" className="w-full h-11 px-3 rounded border border-slate-300" />
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="Email" className="w-full h-11 px-3 rounded border border-slate-300" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="Password" className="w-full h-11 px-3 rounded border border-slate-300" />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button disabled={loading} className="w-full h-11 rounded bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-60">{loading? 'Creating account...' : 'Create account'}</button>
    </form>
  )
}

function Divider({ label='or' }) {
  return (
    <div className="my-6 flex items-center gap-3 text-slate-500">
      <span className="h-px flex-1 bg-slate-200" />
      <span className="text-xs uppercase tracking-wide">{label}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  )
}
