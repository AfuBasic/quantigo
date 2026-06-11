import { PageHeader } from '@/components/PageHeader'
import { Link } from 'react-router-dom'

export function DashboardPage() {
  const stats = [
    { label: 'Active Pools Joined', value: '4 Pools', change: '+1 this week', trend: 'up' },
    { label: 'Total Committed Capital', value: '$124,500', change: 'Avg. pool yield: 14.2%', trend: 'up' },
    { label: 'Estimated Procurement Savings', value: '18.4%', change: 'Saved $22,800 total', trend: 'up' },
    { label: 'Pending Shipments', value: '3 Shipments', change: '1 arriving tomorrow', trend: 'neutral' },
  ]

  const activePools = [
    {
      id: 'pool-1',
      title: 'Bulk Samsung OLED Panels Q3',
      category: 'Electronics',
      committed: '$45,000',
      target: '$100,000',
      progress: 75,
      daysLeft: 8,
    },
    {
      id: 'pool-2',
      title: 'Sustainable Packaging Supplies',
      category: 'Logistics',
      committed: '$18,000',
      target: '$25,000',
      progress: 68,
      daysLeft: 14,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader title="Welcome back, Merchant" eyebrow="Dashboard Overview" />
        <Link
          to="/pools"
          className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-secondary/25 hover:bg-brand-secondary-dark transition-all self-start md:self-auto"
        >
          Join a Procurement Pool
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-brand-primary">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-500 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Active Pools */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-brand-primary">Your Active Pools</h2>
            <Link to="/pools" className="text-sm font-semibold text-brand-secondary hover:underline">
              View All
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {activePools.map((pool) => (
              <div key={pool.id} className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 hover:shadow-md transition-all">
                <div>
                  <span className="inline-flex rounded-lg bg-brand-primary/5 px-2.5 py-1 text-xs font-semibold text-brand-primary">
                    {pool.category}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">
                    {pool.title}
                  </h3>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-brand-primary font-semibold">{pool.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-secondary transition-all duration-500"
                        style={{ width: `${pool.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>Committed: {pool.committed}</span>
                      <span>Target: {pool.target}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-xs text-slate-500 font-medium">{pool.daysLeft} days remaining</span>
                  <Link
                    to={`/pools/${pool.id}`}
                    className="text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Notifications */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold tracking-tight text-brand-primary">Recent Notifications</h2>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50 space-y-4">
            <div className="flex items-start gap-3 border-b border-slate-50 pb-3">
              <span className="flex h-2 w-2 mt-1.5 rounded-full bg-brand-secondary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-brand-primary">Bulk OLED Pool Filled</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Galaxy Screen pool reached 100% target cap.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b border-slate-50 pb-3">
              <span className="flex h-2 w-2 mt-1.5 rounded-full bg-brand-secondary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-brand-primary">New Payment Disbursed</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Escrow release for Order #QT-2940.</p>
              </div>
            </div>
            <Link to="/notifications" className="block text-center text-xs font-bold text-brand-secondary hover:underline pt-1">
              View all notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
