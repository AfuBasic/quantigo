import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <Link to="/dashboard" className="text-xl font-semibold text-slate-950">
            Quantigo
          </Link>
          <p className="mt-1 text-sm text-slate-500">Merchant procurement coordination</p>
        </div>
        <Outlet />
      </section>
    </main>
  )
}
