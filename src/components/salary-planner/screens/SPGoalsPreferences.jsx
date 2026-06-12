import { useState } from 'react'
import { SPButton }      from '../ui/SPButton'
import { SPCard }        from '../ui/SPCard'
import { SPInputField }  from '../ui/SPInputField'
import { SPProgressBar } from '../ui/SPProgressBar'

const PREFERENCES = [
  { value: 'conservative', label: 'Conservative', desc: 'Prioritize monthly flexibility and buffer. Save steadily, stress less.' },
  { value: 'balanced',     label: 'Balanced',     desc: 'Moderate savings with moderate flexibility. A healthy middle ground.' },
  { value: 'aggressive',   label: 'Aggressive',   desc: 'Maximize savings while keeping essentials covered.' },
]

function toStr(n) { return n === 0 ? '' : String(n) }

export function SPGoalsPreferences({ initialValues, onNext, onBack }) {
  const [currentSavings, setCurrentSavings] = useState(toStr(initialValues.currentSavings))
  const [annualGoal, setAnnualGoal]         = useState(toStr(initialValues.annualGoal))
  const [preference, setPreference]         = useState(initialValues.preference)
  const [errors, setErrors]                 = useState({})
  const [touched, setTouched]               = useState({})

  const handleNext = () => {
    const errs = {}
    if (!annualGoal || Number(annualGoal) <= 0) errs.annualGoal = 'Enter your one-year savings goal'
    if (currentSavings !== '' && Number(currentSavings) < 0) errs.currentSavings = 'Cannot be negative'
    setErrors(errs)
    setTouched({ currentSavings: true, annualGoal: true })
    if (Object.keys(errs).length > 0) return
    onNext({ currentSavings: Number(currentSavings) || 0, annualGoal: Number(annualGoal), preference })
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="pb-6">
        <SPProgressBar current={2} total={3} />
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-6">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-white mb-1">Goals & preferences</h2>
          <p className="text-muted text-sm">Tell us what you are working toward.</p>
        </div>

        <SPCard>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Savings</p>
          <div className="flex flex-col gap-4">
            <SPInputField
              label="Current savings balance" name="currentSavings"
              value={currentSavings}
              onChange={v => { setCurrentSavings(v); setTouched(t => ({ ...t, currentSavings: true })); setErrors(e => ({ ...e, currentSavings: Number(v) < 0 ? 'Cannot be negative' : undefined })) }}
              error={touched.currentSavings ? errors.currentSavings : undefined}
              hint="Total savings you have right now"
            />
            <SPInputField
              label="One-year savings goal" name="annualGoal"
              value={annualGoal}
              onChange={v => { setAnnualGoal(v); setTouched(t => ({ ...t, annualGoal: true })); setErrors(e => ({ ...e, annualGoal: (!v || Number(v) <= 0) ? 'Enter your one-year savings goal' : undefined })) }}
              error={touched.annualGoal ? errors.annualGoal : undefined}
              hint="How much do you want saved 12 months from now?"
            />
          </div>
        </SPCard>

        <SPCard>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Savings preference</p>
          <div className="flex flex-col gap-3">
            {PREFERENCES.map(p => (
              <button
                key={p.value}
                onClick={() => setPreference(p.value)}
                className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  preference === p.value
                    ? 'border-accent bg-accent/5'
                    : 'border-[#2A2A2A] bg-surface hover:border-[#3A3A3A]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    preference === p.value ? 'border-accent' : 'border-muted'
                  }`}>
                    {preference === p.value && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <span className="font-semibold text-white text-sm">{p.label}</span>
                </div>
                <p className="text-xs text-muted ml-6 leading-relaxed">{p.desc}</p>
              </button>
            ))}
          </div>
        </SPCard>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <SPButton onClick={handleNext}>Generate my plan →</SPButton>
        <SPButton variant="ghost" onClick={onBack}>← Back</SPButton>
      </div>
    </div>
  )
}
