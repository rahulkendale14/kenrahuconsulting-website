import { useState } from 'react'
import { SPButton }      from '../ui/SPButton'
import { SPCard }        from '../ui/SPCard'
import { SPInputField }  from '../ui/SPInputField'
import { SPProgressBar } from '../ui/SPProgressBar'

function toStr(n) { return n === 0 ? '' : String(n) }

function validate(v) {
  const e = {}
  if (!v.salary || Number(v.salary) <= 0) e.salary = 'Enter your monthly take-home salary'
  if (v.bills      !== '' && Number(v.bills)      < 0) e.bills      = 'Cannot be negative'
  if (v.emi        !== '' && Number(v.emi)        < 0) e.emi        = 'Cannot be negative'
  if (v.household  !== '' && Number(v.household)  < 0) e.household  = 'Cannot be negative'
  if (v.medical    !== '' && Number(v.medical)    < 0) e.medical    = 'Cannot be negative'
  if (v.irregular  !== '' && Number(v.irregular)  < 0) e.irregular  = 'Cannot be negative'
  if (v.dependents !== '' && (Number(v.dependents) < 0 || !Number.isInteger(Number(v.dependents))))
    e.dependents = 'Enter a whole number (0, 1, 2…)'
  return e
}

export function SPIncomeExpenses({ initialValues, onNext, onBack }) {
  const [vals, setVals]     = useState({
    salary:     toStr(initialValues.salary),
    bills:      toStr(initialValues.bills),
    emi:        toStr(initialValues.emi),
    household:  toStr(initialValues.household),
    medical:    toStr(initialValues.medical),
    irregular:  toStr(initialValues.irregular),
    dependents: toStr(initialValues.dependents),
  })
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})

  const set = field => val => {
    const next = { ...vals, [field]: val }
    setVals(next)
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(e => ({ ...e, [field]: validate(next)[field] }))
  }

  const err = field => touched[field] ? errors[field] : undefined

  const handleNext = () => {
    const errs = validate(vals)
    setErrors(errs)
    setTouched(Object.fromEntries(Object.keys(vals).map(k => [k, true])))
    if (Object.keys(errs).length > 0) return
    onNext({
      salary:     Number(vals.salary),
      bills:      Number(vals.bills)      || 0,
      emi:        Number(vals.emi)        || 0,
      household:  Number(vals.household)  || 0,
      medical:    Number(vals.medical)    || 0,
      irregular:  Number(vals.irregular)  || 0,
      dependents: Number(vals.dependents) || 0,
    })
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="pb-6">
        <SPProgressBar current={1} total={3} />
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-6">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-white mb-1">Income & expenses</h2>
          <p className="text-muted text-sm">Your monthly numbers. Leave 0 if not applicable.</p>
        </div>

        <SPCard>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Income</p>
          <SPInputField
            label="Monthly take-home salary" name="salary"
            value={vals.salary} onChange={set('salary')} error={err('salary')}
            hint="After all deductions and taxes"
          />
        </SPCard>

        <SPCard>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Fixed obligations</p>
          <div className="flex flex-col gap-4">
            <SPInputField label="Monthly bills" name="bills" value={vals.bills} onChange={set('bills')} error={err('bills')} hint="Rent, utilities, subscriptions" />
            <SPInputField label="Monthly EMI obligations" name="emi" value={vals.emi} onChange={set('emi')} error={err('emi')} hint="Home loan, car loan, credit card EMIs" />
          </div>
        </SPCard>

        <SPCard>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Household & variable</p>
          <div className="flex flex-col gap-4">
            <SPInputField label="Monthly household expenses" name="household" value={vals.household} onChange={set('household')} error={err('household')} hint="Groceries, daily needs, household supplies" />
            <SPInputField label="Monthly medical expenses" name="medical" value={vals.medical} onChange={set('medical')} error={err('medical')} hint="Medicines, consultations, insurance premiums" />
            <SPInputField label="Monthly irregular / lifestyle" name="irregular" value={vals.irregular} onChange={set('irregular')} error={err('irregular')} hint="Dining out, clothing, leisure, travel" />
            <SPInputField label="Number of dependents" name="dependents" value={vals.dependents} onChange={set('dependents')} error={err('dependents')} prefix="" hint="Children, parents, or others you support" />
          </div>
        </SPCard>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <SPButton onClick={handleNext}>Next: Savings goals →</SPButton>
        <SPButton variant="ghost" onClick={onBack}>← Back</SPButton>
      </div>
    </div>
  )
}
