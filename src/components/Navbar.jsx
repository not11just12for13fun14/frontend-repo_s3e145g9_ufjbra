import { Link } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">U</span>
          <span className="font-semibold text-slate-800">UniVerse</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/courses" className="text-slate-600 hover:text-slate-900">Courses</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
              <button onClick={onLogout} className="px-3 py-1.5 rounded bg-slate-900 text-white hover:bg-slate-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
