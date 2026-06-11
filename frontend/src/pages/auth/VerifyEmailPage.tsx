import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import * as authService from '@/services/authService'
import { motion } from 'framer-motion'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('Verifying your email address, please wait...')

  useEffect(() => {
    const id = searchParams.get('id')
    const hash = searchParams.get('hash')
    const expires = searchParams.get('expires') ?? undefined
    const signature = searchParams.get('signature') ?? undefined

    if (!id || !hash) {
      setStatus('error')
      setMessage('Invalid or broken email verification link.')
      return
    }

    async function triggerVerification() {
      try {
        await authService.verifyEmail(id!, hash!, expires, signature)
        setStatus('success')
        setMessage('Your email has been successfully verified! You can now access your dashboard.')
      } catch (err: any) {
        setStatus('error')
        setMessage(
          err.response?.data?.message ??
          'Verification failed. The link may have expired or been modified.'
        )
      }
    }

    triggerVerification()
  }, [searchParams])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-6 space-y-6"
    >
      {status === 'verifying' && (
        <>
          <div className="relative">
            <Loader2 className="h-16 w-16 text-q-blue animate-spin" />
            <div className="absolute inset-0 bg-q-blue/20 rounded-full blur-[10px] scale-150 -z-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">Verifying Email</h2>
            <p className="text-sm text-white/50 font-medium max-w-xs mx-auto">
              {message}
            </p>
          </div>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="relative">
            <CheckCircle className="h-16 w-16 text-q-green animate-bounce" />
            <div className="absolute inset-0 bg-q-green/20 rounded-full blur-[10px] scale-150 -z-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Verification Success</h2>
            <p className="text-sm text-white/50 font-medium max-w-xs mx-auto">
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full relative group rounded-2xl py-4 px-6 text-sm font-semibold text-white overflow-hidden transition-all flex items-center justify-center gap-2 mt-4"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
          >
            <span className="relative z-10">Enter Dashboard</span>
            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          </button>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="relative">
            <AlertCircle className="h-16 w-16 text-red-500 animate-pulse" />
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-[10px] scale-150 -z-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">Verification Failed</h2>
            <p className="text-sm text-red-400 font-medium max-w-xs mx-auto">
              {message}
            </p>
          </div>
          <Link
            to="/login"
            className="w-full text-center rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm font-semibold text-white hover:bg-white/10 transition-all"
          >
            Back to Sign In
          </Link>
        </>
      )}
    </motion.div>
  )
}
