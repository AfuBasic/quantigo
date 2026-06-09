import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const navigation = [
  ['Dashboard', '/dashboard'],
  ['Browse Pools', '/pools'],
  ['Orders', '/orders'],
  ['Payments', '/payments'],
  ['Notifications', '/notifications'],
  ['Profile', '/profile'],
]

export function MerchantLayout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 md:block">
        <p className="text-xl font-semibold">Quantigo</p>
        <p className="mt-1 text-sm text-slate-500">{user?.name ?? 'Merchant'}</p>

        <nav className="mt-8 space-y-1">
          {navigation.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
        >
          Logout
        </button>
      </aside>

      <main className="md:pl-64">
        <header className="border-b border-slate-200 bg-white px-5 py-4 md:hidden">
          <p className="text-lg font-semibold">Quantigo</p>
        </header>
        <section className="p-5">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
