import { SectionWrapper } from '@/components/marketing/SectionWrapper'
import { ProcurementFlowModel } from '@/components/marketing/3d/ProcurementFlowModel'

const steps = [
  {
    number: '01',
    title: 'Merchants Sign Up',
    description: 'Pharmacies, groceries, restaurants, and retail shops join the network and state their weekly inventory requirements.',
    bgColor: 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
  },
  {
    number: '02',
    title: 'Demand Aggregates',
    description: 'Quantigo pools individual demands automatically. This builds immense collective volume to negotiate directly with major suppliers.',
    bgColor: 'bg-q-blue/10 text-q-blue border border-q-blue/20'
  },
  {
    number: '03',
    title: 'Direct Supplier Sourcing',
    description: 'Bulk procurement orders are sent directly to factories and warehouses, bypassing multiple layers of intermediaries.',
    bgColor: 'bg-q-green/10 text-q-green border border-q-green/20'
  },
  {
    number: '04',
    title: 'Optimized Delivery Flow',
    description: 'Goods move seamlessly through our consolidated network to local hubs and final retail shops, saving up to 35% on costs.',
    bgColor: 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-q-dark noise-bg overflow-hidden border-t border-white/5">
      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-q-blue/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-q-green/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionWrapper className="max-w-3xl mb-16 md:mb-20">
          <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/60 mb-5 backdrop-blur-md">
            How Quantigo Works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            From fragmented buying to{' '}
            <span className="gradient-text">coordinated commerce</span>
          </h2>
          <p className="mt-5 text-lg text-white/50 font-medium max-w-2xl">
            See how isolated purchasing converts into collective economic power.
          </p>
        </SectionWrapper>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Step timeline */}
          <div className="lg:col-span-6 space-y-8 relative">
            <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-white/5 z-0" />
            
            {steps.map((step, i) => (
              <SectionWrapper key={step.number} delay={i * 0.1}>
                <div className="group relative flex gap-6 md:gap-8 items-start z-10">
                  {/* Number badge */}
                  <div className="shrink-0">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bgColor} transition-transform group-hover:scale-105 font-extrabold text-lg shadow-lg`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass-card rounded-2xl p-6 md:p-8 flex-1 backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 transition-all">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>

          {/* Right Column: Visual narration */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 mt-6 lg:mt-0">
            <div className="glass-card rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Interactive Sandbox</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-q-green/10 border border-q-green/20 px-2.5 py-0.5 text-[10px] font-bold text-q-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-q-green animate-pulse" /> Live Flow Simulation
                </span>
              </div>
              <ProcurementFlowModel />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
