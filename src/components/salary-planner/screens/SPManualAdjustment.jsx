import { useState, useMemo } from 'react'
import { formatCurrency } from '@/lib/salaryEngine'
import { SPButton }       from '../ui/SPButton'
import { SPCard }         from '../ui/SPCard'
import { SPAllocationBar } from '../ui/SPAllocationBar'

const SLIDERS = [
  { key: 'savings',   label: 'Savings',              icon: '💰', min: 0, max: 0.80, step: 0.01 },
  { key: 'household', label: 'Household',             icon: '🏠', min: 0, max: 0.60, step: 0.01 },
  { key: 'irregular', label: 'Irregular / lifestyle', icon: '☕', min: 0, max: 0.40, step: 0.01 },
  { key: 'buffer',    label: 'Emergency buffer',      icon: '🛡️', min: 0, max: 0.30, step: 0.01 },
]

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)) }

function applyOverrides(recommended, salary, rates) {
  const savings   = Math.round(salary * rates.savings)
  const household = Math.round(salary * rates.household)
  const irregular = Math.round(salary * rates.irregular)
  const buffer    = Math.round(salary * rates.buffer)
  const fixed     = recommended.fixedObligations
  const medical   = recommended.medical
  const flexible  = Math.max(salary - fixed - medical - household - irregular - savings - buffer, 0)
  const total     = fixed + medical + household + irregular + savings + buffer + flexible
  return { fixedObligations: fixed, medical, household, irregular, savings, buffer, flexible, total, remaining: salary - total }
}

export function SPManualAdjustment({ result, onAccept, onBack }) {
  const { recommended, inputs } = result

  const initRates = {
    savings:   recommended.savings   / inputs.salary,
    household: recommended.household / inputs.salary,
    irregular: recommended.irregular / inputs.salary,
    buffer:    recommended.buffer    / inputs.salary,
  }

  const [rates, setRates] = useState(initRates)

  const adjusted = useMemo(() => {
    return applyOverrides(recommended, inputs.salary, rates)
  }, [rates, recommended, inputs.salary])

  const projectedAnnual = (adjusted.savings * 12) + inputs.currentSavings
  const gap = inputs.annualGoal - projectedAnnual
  const isAchievable = gap <= 0

  const setRate = (key, val) => {
    setRates(r => ({ ...r, [key]: clamp(Number(val), SLIDERS.find(s => s.key === key).min, SLIDERS.find(s => s.key === key).max) }))
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Adjust your plan</h2>
        <p className="text-muted text-sm">Move the sliders to override allocations. Fixed obligations stay locked.</p>
      </div>

      <SPCard>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Live allocation</p>
        <SPAllocationBar allocation={adjusted} salary={inputs.salary} />
      </SPCard>

      <SPCard>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Adjust</p>
        <div className="flex flex-col gap-5">
          {SLIDERS.map(slider => (
            <div key={slider.key}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white flex items-center gap-2">
                  <span>{slider.icon}</span> {slider.label}
                </label>
                <div className="text-right">
                  <span className="text-sm font-bold text-white">{formatCurrency(adjusted[slider.key])}</span>
                  <span className="text-xs text-muted ml-1">({Math.round(rates[slider.key] * 100)}%)</span>
                </div>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={rates[slider.key]}
                onChange={e => setRate(slider.key, e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#2A2A2A] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          ))}
        </div>
      </SPCard>

      <SPCard className="border-accent/20 bg-accent/5">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Updated projection</p>
        <div className="grid grid-cols-2 gap-3">
          <div><p className="text-xs text-muted">Monthly savings</p><p className="text-xl font-bold text-accent">{formatCurrency(adjusted.savings)}</p></div>
          <div><p className="text-xs text-muted">Projected total</p><p className="text-xl font-bold text-accent">{formatCurrency(projectedAnnual)}</p></div>
          <div><p className="text-xs text-muted">Your goal</p><p className="text-lg font-bold text-white">{formatCurrency(inputs.annualGoal)}</p></div>
          <div>
            <p className="text-xs text-muted">{gap > 0 ? 'Shortfall' : 'Surplus'}</p>
            <p className={`text-lg font-bold ${gap > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {gap > 0 ? '−' : '+'}{formatCurrency(Math.abs(gap))}
            </p>
          </div>
        </div>
        {isAchievable && (
          <p className="text-xs text-emerald-400 mt-3">Goal is achievable with this adjustment!</p>
        )}
      </SPCard>

      <div className="flex flex-col gap-3 pt-2">
        <SPButton onClick={() => onAccept(adjusted)}>Lock in this plan →</SPButton>
        <SPButton variant="ghost" onClick={onBack}>← Back to recommended</SPButton>
      </div>
    </div>
  )
}
