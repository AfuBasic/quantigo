import { Outlet, Link } from 'react-router-dom'
import { NetworkCanvas } from '@/components/marketing/3d/NetworkCanvas'
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react'

export function AuthLayout() {
  return (
    <main className="flex min-h-screen bg-q-dark overflow-hidden text-white">
      {/* Left Column: 3D Visual & Storytelling (Hidden on mobile/tablet) */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-white/5 bg-q-dark-surface/30">
        {/* Background 3D Network */}
        <NetworkCanvas />

        {/* Top: Logo & Branding */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/quantico-icon.png" className="h-8 w-auto" alt="Quantigo Logo" />
            <span className="text-xl font-extrabold tracking-tight text-white">Quantigo</span>
          </Link>
        </div>

        {/* Center: Hero Value Proposition */}
        <div className="relative z-10 max-w-lg my-auto space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-q-blue/10 border border-q-blue/20 px-3 py-1 text-xs font-semibold text-q-blue">
              Quantigo Cloud Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mt-4">
              Infrastructure Powering <br />
              <span className="gradient-text">African Commerce</span>
            </h1>
            <p className="mt-4 text-base text-white/50 leading-relaxed font-medium">
              We coordinate retail demand to unlock direct manufacturer pricing and consolidate logistics for local retailers.
            </p>
          </div>

          {/* Infrastructure features */}
          <div className="space-y-4">
            {[
              {
                icon: <Zap className="text-q-blue h-5 w-5" />,
                title: 'Pooled Procurement',
                desc: 'Consolidate orders with thousands of merchants to buy at wholesale scale.'
              },
              {
                icon: <ShieldCheck className="text-q-green h-5 w-5" />,
                title: 'KYB Verified Merchants',
                desc: 'Compliant onboarding system protecting supplier and buyer integrity.'
              },
              {
                icon: <TrendingUp className="text-purple-400 h-5 w-5" />,
                title: 'Operational Cost Reduction',
                desc: 'Bypass distributor channels and logistics overheads to save up to 35%.'
              }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                <div className="p-2 rounded-xl bg-white/5 shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{feature.title}</h4>
                  <p className="text-xs text-white/40 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer tag */}
        <div className="relative z-10 text-xs text-white/30 font-semibold">
          © {new Date().getFullYear()} Quantigo Technologies. All rights reserved.
        </div>
      </section>

      {/* Right Column: Form Container */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto bg-q-dark">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-q-blue/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo (visible on mobile/tablet) */}
          <div className="lg:hidden flex flex-col items-center text-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <img src="/quantico-icon.png" className="h-10 w-auto" alt="Quantigo Logo" />
              <span className="text-2xl font-extrabold tracking-tight text-white">Quantigo</span>
            </Link>
            <p className="mt-2 text-xs text-white/40 font-bold uppercase tracking-wider">
              Infrastructure Powering African Commerce
            </p>
          </div>

          {/* Form wrapper card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  )
}
