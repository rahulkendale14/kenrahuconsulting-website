import { formatCurrency } from '@/lib/salaryEngine'
import { SPButton }        from '../ui/SPButton'
import { SPCard }          from '../ui/SPCard'
import { SPAllocationBar } from '../ui/SPAllocationBar'

const ROWS = [
  { key: 'fixedObligations', label: 'Bills & EMI',          icon: '📋' },
  { key: 'household',        label: 'Household',             icon: '🏠' },
  { key: 'medical',          label: 'Medical',               icon: '🏥' },
  { key: 'irregular',        label: 'Irregular / lifestyle', icon: '☕' },
  { key: 'savings',          label: 'Savings',               icon: '💰' },
  { key: 'buffer',           label: 'Emergency buffer',      icon: '🛡️' },
  { key: 'flexible',         label: 'Flexible spend',        icon: '🎯' },
]

export function SPFinalSummary({ result, finalAllocation, onRestart }) {
  const { recommended, goalCheck, inputs } = result
  const plan = finalAllocation || recommended
  const isCustom = !!finalAllocation

  const projectedAnnual = (plan.savings * 12) + inputs.currentSavings
  const gap = inputs.annualGoal - projectedAnnual
  const isAchievable = gap <= 0

  const handlePrint = () => window.print()

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div>
        <div className="w-12 h-12 bg-emerald-900/30 border border-emerald-700/40 rounded-2xl flex items-center justify-center mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Your final plan</h2>
        <p className="text-muted text-sm">
          {isCustom ? 'Custom-adjusted plan' : 'Recommended plan'} · ₹{inputs.salary.toLocaleString('en-IN')} take-home
        </p>
      </div>

      {isAchievable ? (
        <div className="bg-emerald-900/20 border border-emerald-700/40 rounded-xl p-4 flex gap-3">
          <span className="text-xl">🎯</span>
          <div>
            <p className="font-semibold text-emerald-400 text-sm">Goal on track</p>
            <p className="text-emerald-400/80 text-xs mt-0.5">You're projecting {formatCurrency(projectedAnnual)} — <strong>{formatCurrency(Math.abs(gap))} above</strong> your goal.</p>
          </div>
        </div>
      ) : (
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-4 flex gap-3">
          <span className="text-xl">📉</span>
          <div>
            <p className="font-semibold text-red-400 text-sm">Goal has a shortfall</p>
            <p className="text-red-400/80 text-xs mt-0.5">Projecting {formatCurrency(projectedAnnual)} vs {formatCurrency(inputs.annualGoal)} — {formatCurrency(gap)} short.</p>
          </div>
        </div>
      )}

      <SPCard>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Monthly allocation</p>
        <SPAllocationBar allocation={plan} salary={inputs.salary} />
      </SPCard>

      {isCustom && (
        <SPCard>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Recommended vs yours</p>
          <div className="divide-y divide-[#2A2A2A]">
            {ROWS.map(row => {
              const rec = recommended[row.key]
              const final = plan[row.key]
              if (rec <= 0 && final <= 0) return null
              const diff = final - rec
              return (
                <div key={row.key} className="py-3 first:pt-1 grid grid-cols-[1.5rem_1fr_auto_auto_auto] items-center gap-2 text-sm">
                  <span>{row.icon}</span>
                  <span className="text-muted">{row.label}</span>
                  <span className="text-muted/60 text-xs">{formatCurrency(rec)}</span>
                  <span className="text-white font-medium">{formatCurrency(final)}</span>
                  <span className={`text-xs font-medium w-14 text-right ${diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-red-400' : 'text-muted/40'}`}>
                    {diff === 0 ? '—' : `${diff > 0 ? '+' : ''}${formatCurrency(diff)}`}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="pt-3 mt-1 border-t border-[#2A2A2A] flex justify-between">
            <span className="text-xs text-muted">Total</span>
            <span className="text-sm font-bold text-white">{formatCurrency(plan.total)}</span>
          </div>
        </SPCard>
      )}

      <SPCard className="border-accent/20 bg-accent/5">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">12-month projection</p>
        <div className="grid grid-cols-2 gap-3">
          <div><p className="text-xs text-muted">Monthly savings</p><p className="text-xl font-bold text-accent">{formatCurrency(plan.savings)}</p></div>
          <div><p className="text-xs text-muted">Projected total</p><p className="text-xl font-bold text-accent">{formatCurrency(projectedAnnual)}</p></div>
          <div><p className="text-xs text-muted">Starting balance</p><p className="text-base font-bold text-white">{formatCurrency(inputs.currentSavings)}</p></div>
          <div>
            <p className="text-xs text-muted">{gap > 0 ? 'Shortfall' : 'Surplus'}</p>
            <p className={`text-base font-bold ${gap > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {gap > 0 ? '−' : '+'}{formatCurrency(Math.abs(gap))}
            </p>
          </div>
        </div>
      </SPCard>

      <SPCard>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Your inputs</p>
        <div className="flex flex-col gap-1.5 text-sm">
          {[
            ['Take-home salary', formatCurrency(inputs.salary)],
            ['Annual goal', formatCurrency(inputs.annualGoal)],
            ['Current savings', formatCurrency(inputs.currentSavings)],
            ['Preference', inputs.preference],
            ['Dependents', inputs.dependents],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted">{label}</span>
              <span className="text-white font-medium capitalize">{val}</span>
            </div>
          ))}
        </div>
      </SPCard>

      <div className="flex flex-col gap-3 pt-2">
        <SPButton variant="secondary" onClick={handlePrint}>Save / print this plan</SPButton>
        <SPButton variant="ghost" onClick={onRestart}>Start over</SPButton>
      </div>

      <p className="text-center text-xs text-muted/40 pt-2">
        No data was stored. This plan exists only in your browser.
      </p>
    </div>
  )
}
