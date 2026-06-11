import { useState, useEffect, type FormEvent } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'
import * as authService from '@/services/authService'
import { motion } from 'framer-motion'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [token, setToken] = useState('')

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const tokenParam = searchParams.get('token') ?? ''
    const emailParam = searchParams.get('email') ?? ''
    setToken(tokenParam)
    setEmail(emailParam)

    if (!tokenParam) {
      setError('Invalid or expired password reset token.')
    }
  }, [searchParams])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      await authService.resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      setSuccess('Your password has been successfully reset. Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
        'Failed to reset password. Please check your inputs or request a new reset link.'
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
        <h2 className="text-2xl font-extrabold tracking-tight text-white">Create New Password</h2>
        <p className="mt-2 text-sm text-white/50 font-medium">
          Enter your email and choose a secure new password for your account.
        </p>
      </div>

      {error && (
        <div className="flex gap-2 items-center bg-red-500/10 border border-red-500/25 text-red-400 p-4 rounded-2xl text-xs font-bold leading-normal">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex gap-2 items-center bg-green-500/10 border border-green-500/25 text-green-400 p-4 rounded-2xl text-xs font-bold leading-normal">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{success}</span>
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
              className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
              placeholder="name@business.com"
              required
              disabled={isLoading || Boolean(success)}
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-white/50 mb-3">
            New password
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
              placeholder="••••••••"
              required
              disabled={isLoading || Boolean(success)}
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-white/50 mb-3">
            Confirm password
          </label>
          <div className="relative">
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
              placeholder="••••••••"
              required
              disabled={isLoading || Boolean(success)}
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full relative group rounded-2xl py-4 px-6 text-sm font-semibold text-white overflow-hidden transition-all flex items-center justify-center gap-2 mt-2"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
          disabled={isLoading || !token || Boolean(success)}
        >
          <span className="relative z-10">{isLoading ? 'Resetting...' : 'Reset Password'}</span>
          {!isLoading && <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
        </button>
      </form>

      {/* Footer link */}
      <div className="border-t border-white/5 pt-4 text-center">
        <p className="text-sm text-white/50 font-medium">
          Remember your password?{' '}
          <Link className="font-bold text-q-blue hover:underline" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
