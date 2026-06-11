import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionWrapper } from '@/components/marketing/SectionWrapper'

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-q-dark noise-bg">
      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-q-blue/15 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[400px] bg-q-green/10 rounded-full blur-[160px]" />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            background: i % 2 === 0 ? 'rgba(37, 99, 235, 0.3)' : 'rgba(34, 197, 94, 0.3)',
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <SectionWrapper>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Join the future of{' '}
            <span className="gradient-text">African commerce</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/50 font-medium max-w-2xl mx-auto">
            Thousands of merchants are already buying smarter. Your competitors won't wait —{' '}
            and neither should you.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="group relative w-full sm:w-auto rounded-2xl px-10 py-4.5 text-base font-semibold text-white overflow-hidden transition-all shadow-xl shadow-q-blue/20"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
            >
              <span className="relative z-10">Create Free Account</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto rounded-2xl border border-white/15 px-10 py-4.5 text-base font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all text-center"
            >
              Log In
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/30 font-medium">
            No credit card required • Free to join • Start saving immediately
          </p>
        </SectionWrapper>
      </div>
    </section>
  )
}
