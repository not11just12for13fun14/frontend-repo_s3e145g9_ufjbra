import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Learn boldly. Build your future.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Explore curated university courses in technology, business, and design. Create an account, enroll, and track your progress.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link to="/courses" className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Browse Courses</Link>
            <Link to="/login" className="px-5 py-3 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50">Get Started</Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-indigo-200 shadow-inner flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl">🎓</div>
              <p className="mt-2 text-slate-700 font-medium">Clean, modern university portal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
