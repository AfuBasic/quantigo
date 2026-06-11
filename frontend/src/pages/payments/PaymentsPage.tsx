import { PageHeader } from '@/components/PageHeader'

export function PaymentsPage() {
  const transactions = [
    {
      ref: 'TXN-9381',
      date: 'June 05, 2026',
      type: 'Escrow Lockup',
      description: 'Capital commitment for Samsung OLED Panels Pool',
      amount: '-$45,000.00',
      status: 'Escrow Locked',
      statusClass: 'text-brand-secondary bg-brand-secondary/10',
    },
    {
      ref: 'TXN-8204',
      date: 'May 28, 2026',
      type: 'Refund',
      description: 'Unfilled target refund: Office Desks Pool Q2',
      amount: '+$15,000.00',
      status: 'Refunded',
      statusClass: 'text-brand-success bg-brand-success/10',
    },
    {
      ref: 'TXN-7940',
      date: 'April 15, 2026',
      type: 'Sourcing Payout',
      description: 'Escrow disbursement to factory line (Custom controllers)',
      amount: '-$65,000.00',
      status: 'Released',
      statusClass: 'text-slate-600 bg-slate-100',
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Escrow & Payments" eyebrow="Financial Transactions" />

      {/* Account Info Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Locked in Escrow</p>
          <p className="text-2xl font-bold text-brand-primary mt-2">$45,000.00</p>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold">1 active pool commitment</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Disbursements</p>
          <p className="text-2xl font-bold text-brand-primary mt-2">$77,800.00</p>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold">Across all historical pools</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/50">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Wallet / Credit</p>
          <p className="text-2xl font-bold text-brand-success mt-2">$0.00</p>
          <p className="text-[10px] text-slate-400 mt-1 font-semibold">Connected Account: Bank of America</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50">
          <h3 className="text-sm font-bold text-brand-primary">Escrow History & Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Reference</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-xs font-medium text-slate-700">
              {transactions.map((tx) => (
                <tr key={tx.ref} className="hover:bg-slate-50/50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-brand-primary">{tx.ref}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-500">{tx.date}</td>
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-brand-primary">{tx.type}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{tx.description}</td>
                  <td className={`whitespace-nowrap px-6 py-4 font-bold ${tx.amount.startsWith('+') ? 'text-brand-success' : 'text-brand-primary'}`}>{tx.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${tx.statusClass}`}>
                      {tx.status}
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
