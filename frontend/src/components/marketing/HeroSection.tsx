import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NetworkCanvas } from './3d/NetworkCanvas'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-q-dark">
      {/* 3D Background */}
      <NetworkCanvas />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-q-blue/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-q-green/5 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-q-blue/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:py-40 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/70 mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-q-green animate-pulse" />
            Commerce Infrastructure for Africa
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Buy Better.<br />
          <span className="gradient-text">Grow Faster.</span>
        </motion.h1>

        <motion.p
          className="mt-8 text-lg md:text-2xl text-white/60 leading-relaxed max-w-3xl font-medium"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Quantigo aggregates merchant demand to unlock wholesale pricing. 
          Thousands of businesses buy together — so every merchant pays less 
          and grows more.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            to="/register"
            className="group relative rounded-2xl px-8 py-4 text-base font-semibold text-white overflow-hidden transition-all"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
          >
            <span className="relative z-10">Start Buying Smarter</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          </Link>
          <a
            href="#how-it-works"
            className="rounded-2xl border border-white/15 px-8 py-4 text-base font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all backdrop-blur-md"
          >
            Explore Infrastructure
          </a>
        </motion.div>

        {/* Stats row centered */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {[
            { value: '2,400+', label: 'Active Merchants' },
            { value: '35%', label: 'Average Savings' },
            { value: '$4.2M', label: 'Procured Volume' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{stat.value}</p>
              <p className="text-sm md:text-base text-white/40 font-bold mt-2 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-q-light-bg via-q-dark/50 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
