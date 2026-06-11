import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'

export function PoolDetailsPage() {
  const { poolId } = useParams()

  // Dummy pool data
  const pool = {
    id: poolId ?? 'pool-1',
    title: 'Bulk Samsung OLED Panels Q3',
    category: 'Electronics',
    savings: '22%',
    progress: 75,
    committed: '$75,200',
    target: '$100,000',
    minCommit: '$2,500',
    daysLeft: 8,
    factory: 'Samsung Display Corp (Giheung, KR)',
    description: 'This cooperative procurement pool aggregates orders for mid-size high-refresh-rate OLED panel modules (model SM-OLED-120). By buying directly from factory allocations at the 1,000+ unit tier, merchants bypass local distributor markups.',
    tiers: [
      { quantity: '1-50 units', unitPrice: '$85.00', savings: '0% (Base)' },
      { quantity: '51-200 units', unitPrice: '$76.50', savings: '10% off' },
      { quantity: '201-500 units', unitPrice: '$71.40', savings: '16% off' },
      { quantity: '501+ units (Target)', unitPrice: '$66.30', savings: '22% off' },
    ],
    timeline: [
      { stage: 'Funding Pool Open', date: 'May 15, 2026', done: true },
      { stage: 'Funding Closes & Order Placement', date: 'June 18, 2026', done: false },
      { stage: 'Factory Production & QA', date: 'July 10, 2026', done: false },
      { stage: 'Customs & Port Logistics', date: 'July 28, 2026', done: false },
      { stage: 'Last-mile Local Delivery', date: 'August 05, 2026', done: false },
    ],
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5">
        <PageHeader title={pool.title} eyebrow={`Procurement Pool details`} />
        <Link
          to={`/pools/${pool.id}/join`}
          className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-secondary/25 hover:bg-brand-secondary-dark transition-all self-start md:self-auto"
        >
          Commit Funds to Pool
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Columns */}
        <div className="space-y-8 lg:col-span-2">
          {/* Overview */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
            <h2 className="text-base font-bold text-brand-primary">Pool Overview</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
              {pool.description}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-50 pt-5">
              <div>
                <p className="text-xs text-slate-400 font-medium">Origin Manufacturer</p>
                <p className="text-sm font-bold text-brand-primary mt-1">{pool.factory}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Minimum Commit Size</p>
                <p className="text-sm font-bold text-brand-primary mt-1">{pool.minCommit}</p>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
            <h2 className="text-base font-bold text-brand-primary mb-4">Volume Discount Tiers</h2>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Pool Target Qty</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Est. Unit Price</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Discount Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-xs font-medium text-slate-700">
                  {pool.tiers.map((tier, idx) => (
                    <tr key={idx} className={idx === pool.tiers.length - 1 ? 'bg-brand-secondary/5 font-semibold text-brand-secondary-dark' : ''}>
                      <td className="whitespace-nowrap px-4 py-3">{tier.quantity}</td>
                      <td className="whitespace-nowrap px-4 py-3">{tier.unitPrice}</td>
                      <td className="whitespace-nowrap px-4 py-3">{tier.savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          {/* Tracker Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
            <h2 className="text-base font-bold text-brand-primary mb-4">Funding Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Progress</span>
                <span className="text-brand-secondary-dark font-bold">{pool.progress}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-secondary transition-all"
                  style={{ width: `${pool.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Committed: <b>{pool.committed}</b></span>
                <span>Target: <b>{pool.target}</b></span>
              </div>
              <div className="border-t border-slate-50 pt-4 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500">Days Remaining</span>
                <span className="text-brand-warning font-bold">{pool.daysLeft} Days</span>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
            <h2 className="text-base font-bold text-brand-primary mb-4">Milestones & Timeline</h2>
            <div className="space-y-4">
              {pool.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] font-bold ${step.done ? 'bg-brand-success border-brand-success text-white' : 'border-slate-300 text-slate-400'}`}>
                      {step.done ? '✓' : idx + 1}
                    </span>
                    {idx < pool.timeline.length - 1 && (
                      <span className={`h-8 w-[2px] ${step.done ? 'bg-brand-success' : 'bg-slate-200'}`} />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className={`font-semibold ${step.done ? 'text-brand-primary' : 'text-slate-500'}`}>{step.stage}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
