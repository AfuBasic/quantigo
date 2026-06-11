import { SectionWrapper } from '@/components/marketing/SectionWrapper'

const traditionalItems = [
  { label: 'Buy individually at retail prices', bad: true },
  { label: 'No bargaining power with suppliers', bad: true },
  { label: 'Inconsistent supply and stock-outs', bad: true },
  { label: 'Higher cost of goods sold', bad: true },
  { label: 'Limited to local middlemen', bad: true },
  { label: 'Manual procurement processes', bad: true },
]

const quantigoItems = [
  { label: 'Pool demand for wholesale pricing', good: true },
  { label: 'Collective bargaining as one buyer', good: true },
  { label: 'Reliable, coordinated supply chains', good: true },
  { label: 'Up to 40% lower inventory costs', good: true },
  { label: 'Direct access to manufacturers', good: true },
  { label: 'Fully managed procurement infrastructure', good: true },
]

export function ComparisonSection() {
  return (
    <section id="why" className="relative py-24 md:py-32 bg-q-dark-surface noise-bg overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-q-green/5 rounded-full blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionWrapper className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/60 mb-5">
            Why Quantigo
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            The old way vs.{' '}
            <span className="gradient-text">the Quantigo way</span>
          </h2>
          <p className="mt-5 text-lg text-white/50 font-medium max-w-2xl mx-auto">
            Traditional procurement keeps merchants small. Quantigo's infrastructure 
            gives every business the buying power of a major chain.
          </p>
        </SectionWrapper>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Traditional */}
          <SectionWrapper delay={0.1}>
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400">
                    <path d="M18 6L6 18"/>
                    <path d="M6 6L18 18"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white/60">Traditional Buying</h3>
              </div>
              <div className="space-y-4">
                {traditionalItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-red-400">
                        <path d="M18 6L6 18"/>
                        <path d="M6 6L18 18"/>
                      </svg>
                    </span>
                    <p className="text-sm text-white/40 font-medium line-through decoration-white/20">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* Quantigo */}
          <SectionWrapper delay={0.25}>
            <div className="rounded-3xl p-8 md:p-10 h-full gradient-border" style={{ background: 'rgba(37, 99, 235, 0.04)' }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-q-green/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-q-green">
                    <path d="M20 6L9 17L4 12"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">With Quantigo</h3>
              </div>
              <div className="space-y-4">
                {quantigoItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-q-green/15">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-q-green">
                        <path d="M20 6L9 17L4 12"/>
                      </svg>
                    </span>
                    <p className="text-sm text-white/80 font-medium">{item.label}</p>
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
