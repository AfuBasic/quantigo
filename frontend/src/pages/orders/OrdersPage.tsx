import { PageHeader } from '@/components/PageHeader'

export function OrdersPage() {
  const orders = [
    {
      id: 'QT-2940',
      date: 'June 05, 2026',
      poolName: 'Bulk Samsung OLED Panels Q3',
      amount: '$45,000',
      units: '678 units',
      status: 'In Production',
      statusColor: 'text-brand-secondary-dark bg-brand-secondary/10',
    },
    {
      id: 'QT-2811',
      date: 'May 12, 2026',
      poolName: 'Custom Biodegradable Mailers Vol 2',
      amount: '$12,800',
      units: '10,000 units',
      status: 'Shipped',
      statusColor: 'text-brand-success bg-brand-success/10',
    },
    {
      id: 'QT-2655',
      date: 'April 02, 2026',
      poolName: 'Micro-USB Controller Chips Sourcing',
      amount: '$65,000',
      units: '15,000 units',
      status: 'Delivered',
      statusColor: 'text-slate-600 bg-slate-100',
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Orders & Shipments" eyebrow="Merchant Sourcing Orders" />

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Order Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Procurement Pool</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Amount / Volume</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Sourcing Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm font-medium text-slate-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-brand-primary">{order.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-brand-primary">{order.poolName}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>{order.amount}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{order.units}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
