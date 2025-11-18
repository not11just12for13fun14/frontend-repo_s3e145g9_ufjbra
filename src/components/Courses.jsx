import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Courses({ onEnroll, user }) {
  const [courses, setCourses] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const url = new URL(`${API}/courses`)
    if (q) url.searchParams.set('q', q)
    const res = await fetch(url)
    const data = await res.json()
    setCourses(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Available Courses</h2>
        <div className="flex items-center gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses" className="h-10 px-3 rounded border border-slate-300" />
          <button onClick={load} className="h-10 px-4 rounded bg-slate-900 text-white">Search</button>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({length:6}).map((_,i)=> (
            <div key={i} className="h-40 bg-slate-100 rounded animate-pulse" />
          ))
        ) : courses.length === 0 ? (
          <p className="text-slate-600">No courses found.</p>
        ) : (
          courses.map(c => (
            <div key={c.id} className="rounded-xl border border-slate-200 p-5 hover:shadow-sm transition">
              <div className="text-sm text-slate-500">{c.code}</div>
              <div className="text-lg font-semibold text-slate-900">{c.title}</div>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{c.description || 'No description provided.'}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>Credits: {c.credits}</span>
                <span>Instructor: {c.instructor}</span>
              </div>
              {user && onEnroll && (
                <button onClick={()=>onEnroll(c)} className="mt-4 w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Enroll</button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
