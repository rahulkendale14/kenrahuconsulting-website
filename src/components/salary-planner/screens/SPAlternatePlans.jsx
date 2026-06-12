import { formatCurrency } from '@/lib/salaryEngine'
import { SPButton }        from '../ui/SPButton'
import { SPCard }          from '../ui/SPCard'

const PLAN_META = {
  boost: {
    icon: '⚡',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-700/40',
    bgColor: 'bg-yellow-900/10',
    label: 'Boost income',
    description: 'Increase take-home pay through freelancing, overtime, or secondary income.',
  },
  extend: {
    icon: '📅',
    color: 'text-sky-400',
    borderColor: 'border-sky-700/40',
    bgColor: 'bg-sky-900/10',
    label: 'Extend timeline',
    description: 'Keep current income — hit your goal by saving for longer.',
  },
  hybrid: {
    icon: '🔀',
    color: 'text-purple-400',
    borderColor: 'border-purple-700/40',
    bgColor: 'bg-purple-900/10',
    label: 'Hybrid approach',
    description: 'A balanced mix: small income boost + slightly longer timeline.',
  },
}

export function SPAlternatePlans({ result, onAccept, onBack }) {
  const { alternates, goalCheck, inputs } = result
  const { gap } = goalCheck

  if (!alternates || alternates.length === 0) {
    return (
      <div className="flex flex-col gap-4 pb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Alternate scenarios</h2>
        <p className="text-muted text-sm">No alternate scenarios are available for your inputs.</p>
        <SPButton variant="secondary" onClick={onBack}>← Back to plan</SPButton>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Alternate scenarios</h2>
        <p className="text-muted text-sm">
          Your goal has a <span className="text-red-400 font-semibold">{formatCurrency(gap)} shortfall</span>. Here are three paths to close it.
        </p>
      </div>

      {alternates.map((plan, i) => {
        const meta = PLAN_META[plan.id] || PLAN_META.hybrid
        const monthlySavings = plan.allocation?.savings ?? plan.monthlySavingsNeeded
        return (
          <SPCard key={i} className={`${meta.borderColor} ${meta.bgColor}`}>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl leading-none mt-0.5">{meta.icon}</span>
              <div>
                <p className={`font-bold text-base ${meta.color}`}>{meta.label}</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">{plan.description || meta.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {plan.monthsNeeded && plan.monthsNeeded !== 12 && (
                <div>
                  <p className="text-xs text-muted">Timeline needed</p>
                  <p className={`text-lg font-bold ${meta.color}`}>{plan.monthsNeeded} months</p>
                  {plan.monthsNeeded > 12 && <p className="text-xs text-muted/60">+{plan.monthsNeeded - 12} extra</p>}
                </div>
              )}
              <div>
                <p className="text-xs text-muted">Monthly savings</p>
                <p className="text-base font-bold text-white">{formatCurrency(monthlySavings)}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Hits goal</p>
                <p className="text-base font-bold text-emerald-400">{formatCurrency(inputs.annualGoal)}</p>
              </div>
            </div>
          </SPCard>
        )
      })}

      <div className="flex flex-col gap-3 pt-2">
        <SPButton onClick={onAccept}>Accept recommended plan anyway →</SPButton>
        <SPButton variant="ghost" onClick={onBack}>← Back to plan</SPButton>
      </div>
    </div>
  )
}
