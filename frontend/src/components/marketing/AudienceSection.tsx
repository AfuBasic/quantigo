import { SectionWrapper } from '@/components/marketing/SectionWrapper'
import { Store, ShoppingCart, Pill, Utensils, Truck, Building2 } from 'lucide-react'

const audiences = [
  {
    title: 'Market Traders',
    description: 'Stall owners and open-market vendors who buy and resell consumer goods daily.',
    icon: Store,
    color: 'border-q-blue/20 hover:border-q-blue/40',
    bg: 'bg-q-blue-50 text-q-blue',
  },
  {
    title: 'Retail Stores',
    description: 'Brick-and-mortar shops stocking everyday essentials, electronics, and household goods.',
    icon: ShoppingCart,
    color: 'border-q-green/20 hover:border-q-green/40',
    bg: 'bg-q-green-50 text-q-green',
  },
  {
    title: 'Pharmacies',
    description: 'Independent and chain pharmacies sourcing pharmaceutical products and health supplies.',
    icon: Pill,
    color: 'border-q-blue/20 hover:border-q-blue/40',
    bg: 'bg-q-blue-50 text-q-blue',
  },
  {
    title: 'Restaurants & Hospitality',
    description: 'Eateries, cafés, and food businesses procuring ingredients, packaging, and supplies.',
    icon: Utensils,
    color: 'border-q-green/20 hover:border-q-green/40',
    bg: 'bg-q-green-50 text-q-green',
  },
  {
    title: 'Distributors',
    description: 'Regional and local distributors scaling their supply chain with better upstream pricing.',
    icon: Truck,
    color: 'border-q-blue/20 hover:border-q-blue/40',
    bg: 'bg-q-blue-50 text-q-blue',
  },
  {
    title: 'SMEs & Wholesalers',
    description: 'Growing small and medium enterprises seeking infrastructure-grade procurement capabilities.',
    icon: Building2,
    color: 'border-q-green/20 hover:border-q-green/40',
    bg: 'bg-q-green-50 text-q-green',
  },
]

export function AudienceSection() {
  return (
    <section id="audience" className="relative py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionWrapper className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-flex items-center rounded-full bg-q-green-50 border border-q-green-100 px-4 py-1.5 text-xs font-semibold text-q-green-600 mb-5">
            Who It's For
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-q-text">
            Built for the businesses that{' '}
            <span className="gradient-text">power Africa's economy</span>
          </h2>
          <p className="mt-5 text-lg text-q-text-secondary font-medium max-w-2xl mx-auto">
            From market stalls to pharmacy chains — Quantigo serves any business 
            that buys inventory and wants to pay less for it.
          </p>
        </SectionWrapper>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => {
            const Icon = item.icon
            return (
              <SectionWrapper key={i} delay={i * 0.08}>
                <div className={`group rounded-3xl border-2 ${item.color} bg-white p-8 transition-all duration-500 hover:shadow-lg h-full`}>
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} group-hover:scale-110 transition-transform`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-q-text">{item.title}</h3>
                  <p className="mt-3 text-sm text-q-text-secondary leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </SectionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
