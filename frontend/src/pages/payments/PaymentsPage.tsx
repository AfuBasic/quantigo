import { PageHeader } from '@/components/PageHeader'
import { useTranslation } from '@/hooks/useTranslation'

export function PaymentsPage() {
  const { t } = useTranslation()

  const transactions = [
    {
      ref: 'TXN-9381',
      date: 'June 05, 2026',
      type: t('paymentHeldType'),
      description: 'Money held for Samsung OLED Panels Group Buy',
      amount: '-₦45,000.00',
      status: t('heldSafelyStatus'),
      statusClass: 'text-q-blue bg-q-blue/10 border border-q-blue/20',
    },
    {
      ref: 'TXN-8204',
      date: 'May 28, 2026',
      type: t('refundType'),
      description: 'Refund for unfilled group buy: Office Desks Q2',
      amount: '+₦15,000.00',
      status: t('refundedStatus'),
      statusClass: 'text-q-green bg-q-green/10 border border-q-green/20',
    },
    {
      ref: 'TXN-7940',
      date: 'April 15, 2026',
      type: t('paidToFactoryType'),
      description: 'Money sent to factory for custom screen panels',
      amount: '-₦65,000.00',
      status: t('sentStatus'),
      statusClass: 'text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-color)]',
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title={t('payments')} eyebrow={t('paymentHistoryEyebrow')} />

      {/* Account Info Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
          <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider">{t('moneyHeldSafely')}</p>
          <p className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">₦45,000.00</p>
          <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-semibold">{t('activeGroupBuyPayment')}</p>
        </div>
        <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
          <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider">{t('totalPaidToFactories')}</p>
          <p className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">₦77,800.00</p>
          <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-semibold">{t('acrossAllHistorical')}</p>
        </div>
        <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
          <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider">{t('availableCredit')}</p>
          <p className="text-2xl font-extrabold text-q-green mt-2">₦0.00</p>
          <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-semibold">{t('connectedBankAccount')}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border-color)]">
          <h3 className="text-sm font-bold text-q-blue">{t('paymentHistoryHeader')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border-color)]">
            <thead className="bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">{t('referenceIdCol')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">{t('orderDateCol')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">{t('typeCol')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">{t('detailsCol')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">{t('amountQtyCol')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">{t('deliveryStatusCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-secondary)]">
              {transactions.map((tx) => (
                <tr key={tx.ref} className="hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-q-blue">{tx.ref}</td>
                  <td className="whitespace-nowrap px-6 py-4">{tx.date}</td>
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-[var(--text-primary)]">{tx.type}</td>
                  <td className="px-6 py-4 font-medium">{tx.description}</td>
                  <td className={`whitespace-nowrap px-6 py-4 font-bold ${tx.amount.startsWith('+') ? 'text-q-green' : 'text-[var(--text-primary)]'}`}>{tx.amount}</td>
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
