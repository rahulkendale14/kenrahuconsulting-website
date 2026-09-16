import { formatCurrency } from '@/lib/salaryEngine'
import { SPButton }         from '../ui/SPButton'
import { SPCard }           from '../ui/SPCard'
import { SPAllocationBar }  from '../ui/SPAllocationBar'

const BREAKDOWN_ROWS = [
  { key: 'fixedObligations', label: 'Bills & EMI',         icon: '📋', note: 'Fixed obligations — treated as immovable.' },
  { key: 'household',        label: 'Household essentials', icon: '🏠', note: 'Adjusted upward for number of dependents.' },
  { key: 'medical',          label: 'Medical reserve',      icon: '🏥', note: 'Minimum ₹500 floor applied.' },
  { key: 'irregular',        label: 'Irregular / lifestyle',icon: '☕', note: 'Minimum 3% of salary floor applied.' },
  { key: 'savings',          label: 'Savings',              icon: '💰', note: 'Calculated from your savings preference.' },
  { key: 'buffer',           label: 'Emergency buffer',     icon: '🛡️', note: 'Reserve for unexpected expenses.' },
  { key: 'flexible',         label: 'Flexible spend',       icon: '🎯', note: 'Discretionary — yours to use freely.' },
]

const PREF_LABELS = { conservative: 'conservative', balanced: 'balanced', aggressive: 'aggressive' }

export function SPRecommendedPlan({ result, onAdjust, onAlternates, onAccept }) {
  const { recommended, goalCheck, inputs } = result
  const { isAchievable, isStressed, gap, projectedAnnual } = goalCheck

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Your recommended plan</h2>
        <p className="text-muted text-sm mb-4">
          Based on {PREF_LABELS[inputs.preference]} savings preference and ₹{inputs.salary.toLocaleString('en-IN')} take-home.
        </p>

        {isStressed && (
          <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-xl p-4 mb-3 flex gap-3">
            <span className="text-xl leading-none mt-0.5">⚠️</span>
            <div>
              <p className="font-semibold text-yellow-300 text-sm">High financial load</p>
              <p className="text-yellow-400/80 text-xs mt-0.5 leading-relaxed">Your fixed obligations exceed 85% of income. The plan prioritizes essentials — savings room is limited.</p>
            </div>
          </div>
        )}

        {isAchievable ? (
          <div className="bg-emerald-900/20 border border-emerald-700/40 rounded-xl p-4 mb-3 flex gap-3">
            <span className="text-xl leading-none mt-0.5">✅</span>
            <div>
              <p className="font-semibold text-emerald-400 text-sm">Goal is achievable!</p>
              <p className="text-emerald-400/80 text-xs mt-0.5">Projected savings in 12 months: <strong>{formatCurrency(projectedAnnual)}</strong> — surplus of {formatCurrency(Math.abs(gap))}.</p>
            </div>
          </div>
        ) : (
          <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-4 mb-3 flex gap-3">
            <span className="text-xl leading-none mt-0.5">📉</span>
            <div>
              <p className="font-semibold text-red-400 text-sm">Goal has a shortfall</p>
              <p className="text-red-400/80 text-xs mt-0.5">Projected {formatCurrency(projectedAnnual)} vs goal of {formatCurrency(inputs.annualGoal)} — {formatCurrency(gap)} short.</p>
            </div>
          </div>
        )}
      </div>

      <SPCard>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Monthly allocation</p>
        <SPAllocationBar allocation={recommended} salary={inputs.salary} />
      </SPCard>

      <SPCard>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Breakdown</p>
        <div className="divide-y divide-[#2A2A2A]">
          {BREAKDOWN_ROWS.map(row => {
            const value = recommended[row.key]
            if (value <= 0) return null
            return (
              <div key={row.key} className="py-3 first:pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{row.icon}</span>
                    <span className="text-sm font-medium text-white">{row.label}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{formatCurrency(value)}</span>
                </div>
                <p className="text-xs text-muted mt-0.5 ml-7">{row.note}</p>
              </div>
            )
          })}
        </div>
        <div className="pt-3 mt-1 border-t border-[#2A2A2A] flex justify-between items-center">
          <span className="text-sm font-semibold text-muted">Total allocated</span>
          <span className="text-base font-bold text-white">{formatCurrency(recommended.total)}</span>
        </div>
      </SPCard>

      <SPCard className="border-accent/20 bg-accent/5">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">12-month projection</p>
        <div className="grid grid-cols-2 gap-3">
          <div><p className="text-xs text-muted">Monthly savings</p><p className="text-xl font-bold text-accent">{formatCurrency(recommended.savings)}</p></div>
          <div><p className="text-xs text-muted">Projected total</p><p className="text-xl font-bold text-accent">{formatCurrency(projectedAnnual)}</p></div>
          <div><p className="text-xs text-muted">Your goal</p><p className="text-lg font-bold text-white">{formatCurrency(inputs.annualGoal)}</p></div>
          <div>
            <p className="text-xs text-muted">{gap > 0 ? 'Shortfall' : 'Surplus'}</p>
            <p className={`text-lg font-bold ${gap > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {gap > 0 ? '−' : '+'}{formatCurrency(Math.abs(gap))}
            </p>
          </div>
        </div>
      </SPCard>

      <div className="flex flex-col gap-3 pt-2">
        <SPButton onClick={onAccept}>Accept this plan →</SPButton>
        <SPButton variant="secondary" onClick={onAdjust}>Adjust manually</SPButton>
        {!isAchievable && <SPButton variant="secondary" onClick={onAlternates}>View alternate scenarios</SPButton>}
      </div>
    </div>
  )
}
