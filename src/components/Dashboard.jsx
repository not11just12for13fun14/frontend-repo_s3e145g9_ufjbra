import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard({ user }) {
  const [rows, setRows] = useState([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/users/${user.id}/enrollments`)
      const data = await res.json()
      setRows(data)
    }
    if (user) load()
  }, [user])

  if (!user) return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-2xl font-bold text-slate-900">Please login</h2>
      <p className="mt-2 text-slate-600">Sign in to view your dashboard.</p>
    </div>
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-2xl font-bold text-slate-900">Welcome, {user.name}</h2>
      <p className="mt-1 text-slate-600">Here are your current enrollments.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Course</th>
              <th className="py-2">Code</th>
              <th className="py-2">Instructor</th>
              <th className="py-2">Credits</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td className="py-4 text-slate-600" colSpan={5}>No enrollments yet.</td></tr>
            ) : rows.map(r => (
              <tr key={r.enrollment_id} className="border-t border-slate-200">
                <td className="py-3 font-medium text-slate-900">{r.course.title}</td>
                <td className="py-3">{r.course.code}</td>
                <td className="py-3">{r.course.instructor}</td>
                <td className="py-3">{r.course.credits}</td>
                <td className="py-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
