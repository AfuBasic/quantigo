import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'
import { type Language } from '@/locales/dictionary'
import { Sun, Moon, LogOut, Menu, X, Globe } from 'lucide-react'

export function MerchantLayout() {
  const { logout, user } = useAuth()
  const { language, setLanguage, t } = useTranslation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)

  const hasVerifiedEmail = user?.email_verified ?? false;
  const isKybApproved = user?.merchant_profile?.verification_status === 'approved';
  const isOnboardingComplete = hasVerifiedEmail && isKybApproved;

  const navigation = isOnboardingComplete
    ? [
        { label: t('dashboard'), href: '/dashboard' },
        { label: t('browsePools'), href: '/pools' },
        { label: t('orders'), href: '/orders' },
        { label: t('payments'), href: '/payments' },
      ]
    : [{ label: t('dashboard'), href: '/dashboard' }];

  // Persistent Theme System
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('quantigo-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('quantigo-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  async function handleLogout() {
    setLogoutConfirmOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Top Application Shell Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-3">
              <img src="/quantico-icon.png" className="h-8 w-auto" alt="Quantigo Logo" />
              <span className="text-lg font-extrabold tracking-tight">Quantigo</span>
            </a>
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-q-blue/10 border border-q-blue/20 text-[10px] font-extrabold text-q-blue uppercase tracking-wider">
              {t('opsConsole')}
            </span>
          </div>

          {/* Center: Main Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-q-blue/10 text-q-blue'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions (Language, Theme, User Profile, Log out) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Custom Smooth Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-all text-xs font-bold cursor-pointer"
                aria-label="Toggle Language Menu"
              >
                <Globe size={14} className="text-[var(--text-secondary)]" />
                <span>
                  {language === 'en' ? 'English' : language === 'yo' ? 'Yorùbá' : language === 'ig' ? 'Igbo' : language === 'pcm' ? 'Pidgin' : 'Hausa'}
                </span>
              </button>
              
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'yo', label: 'Yorùbá' },
                      { code: 'ig', label: 'Igbo' },
                      { code: 'pcm', label: 'Pidgin' },
                      { code: 'ha', label: 'Hausa' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code as Language)
                          setLangMenuOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          language === item.code
                            ? 'bg-q-blue/10 text-q-blue'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-q-blue" />}
            </button>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
              <span className="h-2 w-2 rounded-full bg-q-green" />
              <span className="text-xs font-bold">{user?.name ?? 'Apex Pharmacy'}</span>
            </div>

            {/* Logout */}
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className="p-2.5 rounded-xl border border-[var(--border-color)] text-red-500 hover:bg-red-500/5 transition-all"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex md:hidden items-center gap-2.5">
            {/* Custom Smooth Language Selector (Mobile) */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[11px] font-bold"
                aria-label="Toggle Language Menu"
              >
                <Globe size={13} className="text-[var(--text-secondary)]" />
                <span>{language.toUpperCase()}</span>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-32 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'yo', label: 'Yorùbá' },
                      { code: 'ig', label: 'Igbo' },
                      { code: 'pcm', label: 'Pidgin' },
                      { code: 'ha', label: 'Hausa' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code as Language)
                          setLangMenuOpen(false)
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                          language === item.code
                            ? 'bg-q-blue/10 text-q-blue'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-q-blue" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-[var(--border-color)]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-4 space-y-3">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive ? 'bg-q-blue/10 text-q-blue' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="border-t border-[var(--border-color)] pt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <span className="h-2 w-2 rounded-full bg-q-green" />
                <span className="text-xs font-bold">{user?.name ?? 'Apex Pharmacy'}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setLogoutConfirmOpen(true)
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] py-3 text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-all"
              >
                <LogOut size={16} /> {t('logout')}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Pane */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" onClick={() => setLogoutConfirmOpen(false)} />
          <div className="relative bg-[var(--bg-surface)] border border-[var(--border-color)] w-full max-w-sm rounded-[24px] p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 text-center">
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">Sign out of your shop?</h3>
            <p className="mt-2 text-xs text-[var(--text-secondary)] font-medium">You will need to enter your details again to check your orders.</p>
            
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="w-1/2 rounded-xl border border-[var(--border-color)] py-2.5 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-1/2 rounded-xl bg-red-500 py-2.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors shadow-md shadow-red-500/10 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
