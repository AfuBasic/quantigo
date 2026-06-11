import { PageHeader } from '@/components/PageHeader'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/hooks/useTranslation'

export function BrowsePoolsPage() {
  const { t } = useTranslation()

  const pools = [
    {
      id: 'pool-1',
      title: 'Bulk Samsung OLED Panels Q3',
      description: 'Buy OLED display screens direct from the factory line with other shops to get cheap bulk discounts.',
      category: 'Electronics',
      committed: '₦752,000',
      target: '₦1,000,000',
      savings: '22%',
      progress: 75,
      merchantsCount: 14,
      daysLeft: 8,
      status: 'active',
    },
    {
      id: 'pool-2',
      title: 'Sustainable Packaging Supplies',
      description: 'Get strong packaging boxes and shipping bags at wholesale prices by ordering together.',
      category: 'Logistics',
      committed: '₦170,000',
      target: '₦250,000',
      savings: '15%',
      progress: 68,
      merchantsCount: 8,
      daysLeft: 14,
      status: 'active',
    },
    {
      id: 'pool-3',
      title: 'Premium Arabica Coffee Beans Import',
      description: 'Import fresh coffee beans direct from growers by combining orders with other stores.',
      category: 'Food & Beverage',
      committed: '₦480,000',
      target: '₦500,000',
      savings: '28%',
      progress: 96,
      merchantsCount: 22,
      daysLeft: 3,
      status: 'closing-soon',
    },
    {
      id: 'pool-4',
      title: 'Office Ergonomic Seating Sourcing',
      description: 'Order adjustable office chairs direct from the factory together with other business owners.',
      category: 'Furniture',
      committed: '₦120,000',
      target: '₦400,000',
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
        <PageHeader title={t('groupBuys')} eyebrow={t('buyTogetherToGetCheaper')} />
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl font-medium">
          {t('browseDesc')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="flex flex-col justify-between rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:shadow-md transition-all hover:border-q-blue/35 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-lg bg-q-blue/10 px-2.5 py-1 text-xs font-bold text-q-blue">
                  {pool.category}
                </span>
                <span className="text-sm font-extrabold text-q-green">
                  {t('saveUpTo')} {pool.savings}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-extrabold text-[var(--text-primary)] group-hover:text-q-blue transition-colors">
                {pool.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--text-secondary)] font-medium line-clamp-2">
                {pool.description}
              </p>

              <div className="mt-6 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[var(--text-secondary)]">{t('moneyContributed')}</span>
                  <span className="text-q-blue font-bold">{pool.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-q-blue transition-all duration-500"
                    style={{ width: `${pool.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[var(--text-secondary)] font-medium">
                  <span>{pool.committed} {t('contributedLabel')}</span>
                  <span>{t('target')}: {pool.target}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-4">
              <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-medium">
                <span>{pool.merchantsCount} {t('shopsLabel')}</span>
                <span>•</span>
                <span className={pool.status === 'closing-soon' ? 'text-amber-500 font-bold' : ''}>
                  {pool.daysLeft} {t('daysLeftLabel')}
                </span>
              </div>
              <Link
                to={`/pools/${pool.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-q-blue px-4 py-2.5 text-xs font-semibold text-white hover:bg-q-blue-700 transition-colors"
              >
                {t('viewDetailsLabel')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
