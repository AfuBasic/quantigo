import { SectionWrapper } from '@/components/marketing/SectionWrapper'
import { InventoryFlowCanvas } from '@/components/marketing/3d/InventoryFlowCanvas'
import { ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react'

export function InventoryFlowSection() {
  return (
    <section className="relative py-24 md:py-32 bg-q-dark overflow-hidden border-t border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-q-blue/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Copy & Bullet points */}
          <div className="lg:col-span-5">
            <SectionWrapper direction="left">
              <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/60 mb-5 backdrop-blur-md">
                Supply Chain Velocity
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Real-time inventory <span className="gradient-text">in motion</span>
              </h2>
              <p className="mt-5 text-lg text-white/50 font-medium leading-relaxed">
                Watch how products flow from manufacturing hubs directly into local community retail networks. We remove middle-tier warehouses, sorting centers, and redundant steps to drive costs to their absolute minimum.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: <Zap className="text-q-blue h-5 w-5" />,
                    title: 'Automated Consolidation',
                    desc: 'Orders from thousands of retailers are packed directly at source, drastically cutting handling times.'
                  },
                  {
                    icon: <ShieldCheck className="text-q-green h-5 w-5" />,
                    title: 'Verifiable Logistics',
                    desc: 'From custom clearings to local hubs, tracking numbers are assigned immediately, ensuring full visibility.'
                  },
                  {
                    icon: <TrendingUp className="text-purple-400 h-5 w-5" />,
                    title: 'High Velocity Turnaround',
                    desc: 'By coordinating procurement pools, we maintain a constant demand pipeline with 3x higher turnover.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-white/40 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>

          {/* Right: 3D Visualization */}
          <div className="lg:col-span-7 mt-6 lg:mt-0">
            <SectionWrapper direction="right" delay={0.2}>
              <div className="relative pb-8 lg:pb-0">
                <InventoryFlowCanvas />
                
                {/* Micro overlays/labels representing the flow stages in 2D */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] bg-q-dark-surface/90 border border-white/10 rounded-2xl p-4 flex justify-between text-center shadow-2xl backdrop-blur-md">
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">Sourcing</p>
                    <p className="text-xs text-white font-extrabold mt-0.5">Factory Price</p>
                  </div>
                  <div className="flex items-center text-white/20">
                    <ArrowRight size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">Transit</p>
                    <p className="text-xs text-white font-extrabold mt-0.5">Bulk Freight</p>
                  </div>
                  <div className="flex items-center text-white/20">
                    <ArrowRight size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">Retail</p>
                    <p className="text-xs text-q-green font-extrabold mt-0.5">35% Saved</p>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
