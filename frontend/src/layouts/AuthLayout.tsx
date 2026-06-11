import { Outlet, Link, Navigate } from 'react-router-dom'
import { NetworkCanvas } from '@/components/marketing/3d/NetworkCanvas'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-q-dark flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="h-10 w-10 text-q-blue animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="relative min-h-screen bg-q-dark overflow-hidden text-white flex items-center justify-center p-4">
      {/* Immersive Dimmed 3D Backdrop */}
      <div className="absolute inset-0 z-0 opacity-25">
        <NetworkCanvas />
        <div className="absolute inset-0 bg-gradient-to-tr from-q-dark via-q-dark/95 to-q-blue/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#020617_85%)] pointer-events-none" />
      </div>

      {/* Centered Premium Auth Card Wrapper */}
      <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
        {/* Neon glow effect behind card */}
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-q-blue to-q-green opacity-20 blur-xl pointer-events-none" />

        {/* The Card */}
        <div className="relative w-full rounded-[30px] border border-white/10 bg-[#070b19]/70 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 sm:p-10 space-y-8">
          {/* Logo & Brand Header */}
          <div className="flex flex-col items-center text-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/quantico-icon.png" className="h-9 w-auto" alt="Quantigo Logo" />
              <span className="text-2xl font-extrabold tracking-tight text-white">Quantigo</span>
            </Link>
            <p className="mt-2.5 text-xs text-white/50 font-bold uppercase tracking-widest">
              Secure Access
            </p>
          </div>

          {/* Form Content */}
          <div>
            <Outlet />
          </div>

          {/* Minimal Trust Indicator Footer */}
          <div className="flex items-center justify-center gap-2 border-t border-white/5 pt-5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-q-green" />
            <span>12,400+ verified businesses connected</span>
          </div>
        </div>
      </div>
    </main>
  )
}
