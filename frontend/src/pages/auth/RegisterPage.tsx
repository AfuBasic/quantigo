import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { 
  Building2, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await register({
        name: businessName,
        email: email,
        password: password
      })
      setIsSuccess(true)
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? 
        'Registration failed. This email may already be in use.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center py-6 space-y-6"
      >
        <div className="relative">
          <CheckCircle className="h-16 w-16 text-q-green" />
          <div className="absolute inset-0 bg-q-green/20 rounded-full blur-[10px] scale-150 -z-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Welcome to Quantigo</h2>
          <p className="text-sm text-white/50 font-medium max-w-xs mx-auto">
            Your merchant account has been created. Please check your email to verify your address.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full relative group rounded-2xl py-4 px-6 text-sm font-semibold text-white overflow-hidden transition-all flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
        >
          <span className="relative z-10">Enter Command Center</span>
          <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
        </button>
      </motion.div>
    )
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
        <h2 className="text-2xl font-extrabold tracking-tight text-white">Create Merchant Account</h2>
        <p className="mt-2 text-sm text-white/50 font-medium">
          Start pooling orders and coordination across your commerce supply chain.
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
        {/* Business Name */}
        <div>
          <label className="block text-xs font-bold text-white/50 mb-3">
            Registered business name
          </label>
          <div className="relative">
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
              placeholder="e.g. Apex Pharmacy Ltd"
              required
              disabled={isLoading}
            />
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
          </div>
        </div>

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
          <label className="block text-xs font-bold text-white/50 mb-3">
            Password
          </label>
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
          <span className="relative z-10">{isLoading ? 'Creating Account...' : 'Create Account'}</span>
          {!isLoading && <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
        </button>
      </form>

      {/* Footer link */}
      <div className="border-t border-white/5 pt-4 text-center">
        <p className="text-sm text-white/50 font-medium">
          Already registered?{' '}
          <Link className="font-bold text-q-blue hover:underline" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
