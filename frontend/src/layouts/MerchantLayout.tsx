import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

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
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-brand-primary p-6 md:block">
        <div className="flex flex-col gap-1 border-b border-white/10 pb-5">
          <div className="flex items-center gap-2">
            <img src="/quantigo-white.png" className="h-8 w-auto" alt="Quantigo Logo" />
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/40">Merchant Portal</p>
          <p className="text-sm font-medium text-white/90">{user?.name ?? 'Merchant'}</p>
        </div>

        <nav className="mt-8 space-y-1.5">
          {navigation.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/20' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="md:pl-64">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:hidden">
          <img src="/quantigo-white.png" className="h-7 w-auto invert" alt="Quantigo Logo" />
          <span className="text-xs font-semibold text-slate-500">{user?.name ?? 'Merchant'}</span>
        </header>
        <section className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
