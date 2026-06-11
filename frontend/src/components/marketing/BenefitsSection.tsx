import { SectionWrapper } from '@/components/marketing/SectionWrapper'

const benefits = [
  {
    title: 'Lower Inventory Costs',
    description: 'Pool purchasing power with thousands of merchants to access pricing tiers previously reserved for large-scale distributors.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
        <path d="M2 17L12 22L22 17"/>
        <path d="M2 12L12 17L22 12"/>
      </svg>
    ),
    gradient: 'from-q-blue/10 to-q-green/10',
    iconBg: 'bg-q-blue-50',
    iconColor: 'text-q-blue',
  },
  {
    title: 'Stronger Buying Power',
    description: 'Your demand is amplified. When 500 merchants need the same product, suppliers compete for the contract — not the other way around.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
      </svg>
    ),
    gradient: 'from-q-green/10 to-q-blue/10',
    iconBg: 'bg-q-green-50',
    iconColor: 'text-q-green',
  },
  {
    title: 'Better Supplier Access',
    description: 'Reach manufacturers and distributors who only deal in volume. Quantigo opens doors that individual merchants can\'t knock on alone.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12H22"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"/>
      </svg>
    ),
    gradient: 'from-q-blue/10 to-q-blue/5',
    iconBg: 'bg-q-blue-50',
    iconColor: 'text-q-blue-600',
  },
  {
    title: 'Simplified Procurement',
    description: 'No supplier research. No price negotiations. No logistics headaches. Quantigo handles the entire procurement pipeline end-to-end.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11L12 14L22 4"/>
        <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"/>
      </svg>
    ),
    gradient: 'from-q-green/10 to-q-green/5',
    iconBg: 'bg-q-green-50',
    iconColor: 'text-q-green-600',
  },
  {
    title: 'Improved Profit Margins',
    description: 'When your cost of goods drops by 25-40%, every sale generates more profit. Scale your business without scaling your overhead.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12H18L15 21L9 3L6 12H2"/>
      </svg>
    ),
    gradient: 'from-q-blue/10 to-q-green/10',
    iconBg: 'bg-q-blue-50',
    iconColor: 'text-q-blue',
  },
  {
    title: 'Faster Business Growth',
    description: 'Reinvest savings into expansion. More inventory variety, better stock levels, and stronger competitive positioning in your market.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/>
        <path d="M12 20V4"/>
        <path d="M6 20V14"/>
      </svg>
    ),
    gradient: 'from-q-green/10 to-q-blue/10',
    iconBg: 'bg-q-green-50',
    iconColor: 'text-q-green',
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-24 md:py-32 bg-q-light-bg overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionWrapper className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-flex items-center rounded-full bg-q-blue-50 border border-q-blue-100 px-4 py-1.5 text-xs font-semibold text-q-blue mb-5">
            Benefits
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-q-text">
            Everything your business needs to{' '}
            <span className="gradient-text">compete at scale</span>
          </h2>
          <p className="mt-5 text-lg text-q-text-secondary font-medium max-w-2xl mx-auto">
            Quantigo turns small businesses into collective economic forces. Here's what changes 
            when thousands of merchants buy together.
          </p>
        </SectionWrapper>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <SectionWrapper key={i} delay={i * 0.08}>
              <div className="group relative rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500 h-full gradient-border">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.iconBg} ${benefit.iconColor} group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h3 className="mt-6 text-lg font-bold text-q-text">{benefit.title}</h3>
                <p className="mt-3 text-sm text-q-text-secondary leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
