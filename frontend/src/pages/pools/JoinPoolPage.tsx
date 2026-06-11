import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'

export function JoinPoolPage() {
  const { poolId } = useParams()
  const navigate = useNavigate()
  const [amount, setAmount] = useState('5000')
  const [agreed, setAgreed] = useState(false)
  const [success, setSuccess] = useState(false)

  const unitPrice = 66.30
  const estimatedUnits = Math.floor(Number(amount) / unitPrice)
  const retailPrice = 85.00
  const savings = Math.floor(estimatedUnits * (retailPrice - unitPrice))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => {
      navigate(`/pools/${poolId}`)
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader title="Commit Capital" eyebrow={`Pool: ${poolId ?? 'Bulk OLED Panels'}`} />

      {success ? (
        <div className="rounded-2xl bg-brand-success/10 border border-brand-success/20 p-6 text-center space-y-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-success text-white text-xl font-bold">✓</span>
          <h3 className="text-lg font-bold text-brand-primary">Commitment Submitted Successfully!</h3>
          <p className="text-sm text-slate-600 font-medium">Your request to commit ${Number(amount).toLocaleString()} is processed. Redirecting...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm shadow-slate-100/50 space-y-6">
          <div>
            <h3 className="text-base font-bold text-brand-primary">Sourcing Commitment Details</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Funds are held securely in escrow until the pool funding target is achieved.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-brand-primary uppercase tracking-wide">Commitment Amount (USD)</label>
            <div className="relative mt-1 rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-slate-500 font-semibold text-sm">$</span>
              </div>
              <input
                type="number"
                min="2500"
                step="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm font-semibold text-brand-primary focus:border-brand-secondary focus:outline-none"
                placeholder="5000"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Minimum commitment for this pool: $2,500</p>
          </div>

          {/* Calculator Card */}
          <div className="rounded-xl bg-slate-50 p-4 space-y-3 border border-slate-100">
            <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">Estimated Pool Purchase Power</p>
            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-600">
              <div>
                <p className="text-slate-400">Est. Units Procured</p>
                <p className="text-sm font-bold text-brand-primary mt-0.5">{estimatedUnits} Panels</p>
              </div>
              <div>
                <p className="text-slate-400">Est. Savings vs Retail</p>
                <p className="text-sm font-bold text-brand-success mt-0.5">${savings.toLocaleString()} Saved</p>
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
              className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-secondary focus:ring-brand-secondary"
              required
            />
            <label htmlFor="agreement" className="text-xs text-slate-500 leading-normal font-medium">
              I agree to lock this capital for the duration of the pool (ends in 8 days). I understand funds will be fully refunded if the target is not reached.
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
            <Link
              to={`/pools/${poolId}`}
              className="w-1/2 text-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!agreed}
              className="w-1/2 rounded-xl bg-brand-secondary py-3 text-sm font-semibold text-white shadow-lg shadow-brand-secondary/25 hover:bg-brand-secondary-dark transition-all disabled:opacity-50 disabled:shadow-none"
            >
              Submit Commitment
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
