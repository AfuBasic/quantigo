import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { useTranslation } from '@/hooks/useTranslation'
import { ArrowRight } from 'lucide-react'

export function JoinPoolPage() {
  const { poolId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [amount, setAmount] = useState('150000')
  const [agreed, setAgreed] = useState(false)
  const [success, setSuccess] = useState(false)

  // B2B Commerce Sourcing Calculations in Naira (₦)
  const unitPrice = 15000
  const estimatedUnits = Math.floor(Number(amount) / unitPrice)
  const retailPrice = 20000
  const savings = Math.max(0, Math.floor(estimatedUnits * (retailPrice - unitPrice)))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => {
      navigate(`/pools/${poolId}`)
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader title={t('joinGroupBuyBtn')} eyebrow={`${t('groupBuyRef')}: ${poolId ?? 'Bulk OLED Panels'}`} />

      {success ? (
        <div className="rounded-[24px] border border-q-green/20 bg-q-green/10 p-8 text-center space-y-4 shadow-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-q-green text-white text-xl font-bold">✓</div>
          <h3 className="text-lg font-bold text-white">{t('paymentReqSubmitted')}</h3>
          <p className="text-sm text-[var(--text-secondary)] font-medium">{t('paymentReqProcessed')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold">{t('paymentDetailsLabel')}</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">{t('paymentSafeEscrow')}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">{t('yourPaymentAmount')}</label>
            <div className="relative mt-1 rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-[var(--text-secondary)] font-bold text-sm">₦</span>
              </div>
              <input
                type="number"
                min="50000"
                step="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] py-3 pl-8 pr-4 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-q-blue"
                placeholder="150000"
                required
              />
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] font-medium">{t('minPaymentAmountText')} ₦50,000</p>
          </div>

          {/* Calculator Card */}
          <div className="rounded-2xl bg-[var(--bg-elevated)] p-5 space-y-3 border border-[var(--border-color)]">
            <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{t('estItemsReceive')}</p>
            <div className="grid grid-cols-2 gap-4 text-xs font-medium">
              <div>
                <p className="text-[var(--text-secondary)]">{t('numberOfUnitsLabel')}</p>
                <p className="text-sm font-bold mt-0.5">{estimatedUnits} Units</p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">{t('estimatedSavings')}</p>
                <p className="text-sm font-bold text-q-green mt-0.5">₦{savings.toLocaleString()} Saved</p>
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreement"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[var(--border-color)] bg-[var(--bg-elevated)] text-q-blue focus:ring-q-blue"
              required
            />
            <label htmlFor="agreement" className="text-xs text-[var(--text-secondary)] leading-normal font-medium">
              {t('agreementCheckboxText')}
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)]">
            <Link
              to={`/pools/${poolId}`}
              className="w-1/2 text-center rounded-xl border border-[var(--border-color)] py-3 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              {t('cancelLabel')}
            </Link>
            <button
              type="submit"
              disabled={!agreed}
              className="w-1/2 rounded-xl bg-q-blue py-3 text-sm font-semibold text-white shadow-lg shadow-q-blue/20 hover:bg-q-blue-700 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-1.5"
            >
              {t('confirmPaymentBtn')} <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
