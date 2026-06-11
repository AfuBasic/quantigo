import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import * as authService from '@/services/authService'
import { motion } from 'framer-motion'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      await authService.forgotPassword(email)
      setSuccess('If that email address exists, a password reset link has been sent.')
      setEmail('')
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? 
        'An error occurred. Please verify your email and try again.'
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
        <h2 className="text-2xl font-extrabold tracking-tight text-white">Reset Password</h2>
        <p className="mt-2 text-sm text-white/50 font-medium">
          Enter your business email address and we'll send you a link to reset your password.
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full relative group rounded-2xl py-4 px-6 text-sm font-semibold text-white overflow-hidden transition-all flex items-center justify-center gap-2 mt-2"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
          disabled={isLoading || Boolean(success)}
        >
          <span className="relative z-10">{isLoading ? 'Sending Link...' : 'Send Reset Link'}</span>
          {!isLoading && <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
        </button>
      </form>

      {/* Footer link */}
      <div className="border-t border-white/5 pt-4 text-center">
        <Link className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-semibold" to="/login">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </motion.div>
  )
}
