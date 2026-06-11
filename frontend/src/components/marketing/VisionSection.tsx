import { SectionWrapper } from '@/components/marketing/SectionWrapper'
import { VisionModel } from '@/components/marketing/3d/VisionModel'

export function VisionSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-q-dark noise-bg">
      {/* 3D Model Background */}
      <VisionModel />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left: 3D visual area (The canvas is absolute, but this creates space) */}
          <SectionWrapper direction="left">
            <div className="relative aspect-square max-w-lg mx-auto w-full h-[400px] md:h-[500px]">
              {/* WebGL handles the visual here */}
            </div>
          </SectionWrapper>

          {/* Right: Copy */}
          <SectionWrapper direction="right" delay={0.2}>
            <div className="max-w-xl glass-card rounded-3xl p-8 md:p-10 border-white/10 bg-white/5 backdrop-blur-xl">
              <span className="inline-flex items-center rounded-full bg-q-blue-50 border border-q-blue-100 px-4 py-1.5 text-xs font-semibold text-q-blue mb-6">
                Our Vision
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                The infrastructure layer for{' '}
                <span className="gradient-text">African commerce</span>
              </h2>
              <p className="mt-6 text-lg text-white/70 font-medium leading-relaxed">
                We're building more than a procurement platform. Quantigo is becoming the 
                operating system that connects merchants, suppliers, logistics, and capital 
                across the continent.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Smarter supply chains through aggregated intelligence',
                  'Stronger businesses through collective economics',
                  'Coordinated procurement at continental scale',
                  'A self-reinforcing network that grows with every merchant',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-q-green/10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-q-green">
                        <path d="M20 6L9 17L4 12"/>
                      </svg>
                    </span>
                    <p className="text-sm text-white/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}
