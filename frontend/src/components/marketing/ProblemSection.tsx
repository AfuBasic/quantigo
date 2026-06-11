import { SectionWrapper } from '@/components/marketing/SectionWrapper'
import { AnimatedCounter } from '@/components/marketing/AnimatedCounter'

const painPoints = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
        <path d="M15 9L9 15"/>
        <path d="M9 9L15 15"/>
      </svg>
    ),
    stat: '40',
    suffix: '%',
    label: 'Higher Prices',
    description: 'African SMEs pay up to 40% more for inventory compared to bulk buyers, eroding already thin profit margins.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
        <path d="M16 16V12L12 8L8 12V16"/>
        <path d="M12 8V2"/>
        <path d="M20 16H4"/>
        <path d="M20 20H4"/>
      </svg>
    ),
    stat: '78',
    suffix: '%',
    label: 'Buy Alone',
    description: 'The vast majority of small merchants procure inventory individually, with no collective bargaining power.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8V12L15 15"/>
      </svg>
    ),
    stat: '3',
    suffix: 'x',
    label: 'Longer Lead Times',
    description: 'Without aggregated demand, merchants face longer wait times from suppliers and inconsistent stock availability.',
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 md:py-32 bg-q-light-bg">
      <div className="mx-auto max-w-7xl px-6">
        <SectionWrapper className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-flex items-center rounded-full bg-red-50 border border-red-100 px-4 py-1.5 text-xs font-semibold text-red-600 mb-5">
            The Challenge
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-q-text">
            Commerce in Africa is{' '}
            <span className="text-red-500">broken</span> at the source
          </h2>
          <p className="mt-5 text-lg text-q-text-secondary font-medium max-w-2xl mx-auto">
            Millions of merchants are trapped in an inefficient procurement cycle — buying alone, paying more, 
            and competing with razor-thin margins against businesses with scale advantages.
          </p>
        </SectionWrapper>

        <div className="grid gap-6 md:grid-cols-3">
          {painPoints.map((point, i) => (
            <SectionWrapper key={i} delay={i * 0.15}>
              <div className="group relative rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-red-50 transition-colors">
                  {point.icon}
                </div>

                {/* Stat */}
                <div className="mt-6">
                  <span className="text-5xl font-extrabold tracking-tight text-q-text">
                    <AnimatedCounter target={parseInt(point.stat)} suffix={point.suffix} />
                  </span>
                  <p className="text-sm font-bold text-red-500 mt-1 uppercase tracking-wider">{point.label}</p>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-q-text-secondary leading-relaxed font-medium">
                  {point.description}
                </p>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
