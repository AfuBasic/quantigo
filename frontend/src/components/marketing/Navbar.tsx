import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Who It\'s For', href: '#audience' },
  { label: 'Why Quantigo', href: '#why' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-light shadow-lg shadow-black/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img src="/quantico-icon.png" className="h-8 w-auto" alt="Quantigo" />
          <span className={`text-xl font-extrabold tracking-tight transition-colors ${scrolled ? 'text-q-text' : 'text-white'}`}>
            Quantigo
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all hover:bg-white/10 ${
                scrolled ? 'text-q-text-secondary hover:text-q-text hover:bg-slate-100' : 'text-white/75 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="rounded-xl bg-q-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-q-blue/25 transition-all hover:bg-q-blue-700 hover:shadow-q-blue/40"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  scrolled
                    ? 'text-q-text-secondary hover:text-q-text'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-q-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-q-blue/25 transition-all hover:bg-q-blue-700 hover:shadow-q-blue/40"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden rounded-lg p-2 transition ${scrolled ? 'text-q-text' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className={`mx-4 mt-2 rounded-2xl p-4 space-y-1 ${scrolled ? 'bg-white shadow-xl' : 'glass'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    scrolled ? 'text-q-text-secondary hover:bg-slate-50' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-white/10 pt-3 mt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-q-blue px-4 py-3 text-sm font-semibold text-white text-center shadow-lg shadow-q-blue/25"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold text-center ${
                        scrolled ? 'text-q-text border border-slate-200' : 'text-white border border-white/20'
                      }`}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl bg-q-blue px-4 py-3 text-sm font-semibold text-white text-center shadow-lg shadow-q-blue/25"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
