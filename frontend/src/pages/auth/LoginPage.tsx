import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login({ email, password })
      const from = (location.state as { from?: Location } | null)?.from?.pathname ?? '/dashboard'
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? 
        'Invalid credentials. Please verify your email and password.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-white">Welcome Back</h2>
        <p className="mt-2 text-sm text-white/50 font-medium">
          Access your Quantigo commerce command center.
        </p>
      </div>

      {error && (
        <div className="flex gap-2 items-center bg-red-500/10 border border-red-500/25 text-red-400 p-4 rounded-2xl text-xs font-bold leading-normal">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-white/50 mb-3">
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
              placeholder="name@business.com"
              required
              disabled={isLoading}
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-xs font-bold text-white/50">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs font-bold text-q-blue hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full relative group rounded-2xl py-4 px-6 text-sm font-semibold text-white overflow-hidden transition-all flex items-center justify-center gap-2 mt-2"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
          disabled={isLoading}
        >
          <span className="relative z-10">{isLoading ? 'Signing In...' : 'Sign In'}</span>
          {!isLoading && <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
        </button>
      </form>

      {/* Footer link */}
      <div className="border-t border-white/5 pt-4 text-center">
        <p className="text-sm text-white/50 font-medium">
          New merchant?{' '}
          <Link className="font-bold text-q-green hover:underline" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
