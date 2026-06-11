import { PageHeader } from '@/components/PageHeader'
import { Link } from 'react-router-dom'

export function BrowsePoolsPage() {
  const pools = [
    {
      id: 'pool-1',
      title: 'Bulk Samsung OLED Panels Q3',
      description: 'Cooperative procurement for OLED display panels to leverage tiered volume discounts directly from factory line.',
      category: 'Electronics',
      committed: '$75,200',
      target: '$100,000',
      savings: '22%',
      progress: 75,
      merchantsCount: 14,
      daysLeft: 8,
      status: 'active',
    },
    {
      id: 'pool-2',
      title: 'Sustainable Packaging Supplies',
      description: 'Eco-friendly mailers and customized box packaging raw materials sourcing for eCommerce retail businesses.',
      category: 'Logistics',
      committed: '$17,000',
      target: '$25,000',
      savings: '15%',
      progress: 68,
      merchantsCount: 8,
      daysLeft: 14,
      status: 'active',
    },
    {
      id: 'pool-3',
      title: 'Premium Arabica Coffee Beans Import',
      description: 'Direct trade import from Colombia coffee cooperatives for boutique roasters and cafe chains.',
      category: 'Food & Beverage',
      committed: '$48,000',
      target: '$50,000',
      savings: '28%',
      progress: 96,
      merchantsCount: 22,
      daysLeft: 3,
      status: 'closing-soon',
    },
    {
      id: 'pool-4',
      title: 'Office Ergonomic Seating Sourcing',
      description: 'Factory-direct custom assembly of high-back ergonomic mesh chairs with premium aluminum bases.',
      category: 'Furniture',
      committed: '$12,000',
      target: '$40,000',
      savings: '35%',
      progress: 30,
      merchantsCount: 5,
      daysLeft: 25,
      status: 'active',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <PageHeader title="Browse Procurement Pools" eyebrow="Active Liquidity & Sourcing Pools" />
        <p className="text-sm text-slate-500 max-w-2xl font-medium">
          Join active merchant clusters to combine buying power, unlock lower price tiers, and reduce shipping overheads. Sourcing starts immediately once the pool closes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 hover:shadow-md transition-all hover:border-brand-secondary/35 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-lg bg-brand-primary/5 px-2.5 py-1 text-xs font-semibold text-brand-primary">
                  {pool.category}
                </span>
                <span className="text-sm font-bold text-brand-secondary">
                  Save up to {pool.savings}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">
                {pool.title}
              </h3>
              <p className="mt-2 text-xs text-slate-500 font-medium line-clamp-2">
                {pool.description}
              </p>

              <div className="mt-6 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-500">Capital Committed</span>
                  <span className="text-brand-primary font-bold">{pool.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-secondary transition-all duration-500"
                    style={{ width: `${pool.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>{pool.committed} committed</span>
                  <span>Target: {pool.target}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span>{pool.merchantsCount} Merchants</span>
                <span>•</span>
                <span className={pool.status === 'closing-soon' ? 'text-brand-warning font-bold' : ''}>
                  {pool.daysLeft} days left
                </span>
              </div>
              <Link
                to={`/pools/${pool.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-primary-light transition-colors"
              >
                View Pool
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
