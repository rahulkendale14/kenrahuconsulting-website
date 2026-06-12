import { useState } from 'react'
import { Link } from 'react-router-dom'
import { computePlan } from '@/lib/salaryEngine'
import { SPWelcome }           from '../components/salary-planner/screens/SPWelcome'
import { SPIncomeExpenses }    from '../components/salary-planner/screens/SPIncomeExpenses'
import { SPGoalsPreferences }  from '../components/salary-planner/screens/SPGoalsPreferences'
import { SPRecommendedPlan }   from '../components/salary-planner/screens/SPRecommendedPlan'
import { SPAlternatePlans }    from '../components/salary-planner/screens/SPAlternatePlans'
import { SPManualAdjustment }  from '../components/salary-planner/screens/SPManualAdjustment'
import { SPFinalSummary }      from '../components/salary-planner/screens/SPFinalSummary'

const DEFAULT_INPUTS = {
  salary: 0, bills: 0, emi: 0, household: 0,
  medical: 0, irregular: 0, dependents: 0,
  currentSavings: 0, annualGoal: 0, preference: 'balanced',
}

export default function SalaryPlanner() {
  const [screen, setScreen]             = useState('welcome')
  const [incomeExpenses, setIncomeExpenses] = useState(DEFAULT_INPUTS)
  const [goalsPrefs, setGoalsPrefs]     = useState({ currentSavings: 0, annualGoal: 0, preference: 'balanced' })
  const [result, setResult]             = useState(null)
  const [finalAllocation, setFinalAllocation] = useState(null)

  const allInputs = { ...incomeExpenses, ...goalsPrefs }

  const handleDemoFill = (data) => {
    setIncomeExpenses({
      salary: data.salary, bills: data.bills, emi: data.emi,
      household: data.household, medical: data.medical,
      irregular: data.irregular, dependents: data.dependents,
    })
    setGoalsPrefs({ currentSavings: data.currentSavings, annualGoal: data.annualGoal, preference: data.preference })
  }

  const handleStart = () => setScreen('income-expenses')

  const handleIncomeNext = (vals) => {
    setIncomeExpenses(prev => ({ ...prev, ...vals }))
    setScreen('goals-preferences')
  }

  const handleGoalsNext = (vals) => {
    setGoalsPrefs(vals)
    const plan = computePlan({ ...incomeExpenses, ...vals })
    setResult(plan)
    setScreen('recommended')
  }

  const handleAcceptRecommended = () => {
    setFinalAllocation(null)
    setScreen('summary')
  }

  const handleAcceptAlternates = () => {
    setFinalAllocation(null)
    setScreen('summary')
  }

  const handleAcceptAdjusted = (allocation) => {
    setFinalAllocation(allocation)
    setScreen('summary')
  }

  const handleRestart = () => {
    setScreen('welcome')
    setIncomeExpenses(DEFAULT_INPUTS)
    setGoalsPrefs({ currentSavings: 0, annualGoal: 0, preference: 'balanced' })
    setResult(null)
    setFinalAllocation(null)
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0F0F0F]/80 border-b border-[#2A2A2A]">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-white text-sm transition-colors">← Back</Link>
          <span className="text-xs text-muted/60 font-medium uppercase tracking-widest">Salary Planner</span>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 pt-20 min-h-screen">
        {screen === 'welcome' && (
          <SPWelcome onStart={handleStart} onDemoFill={handleDemoFill} />
        )}
        {screen === 'income-expenses' && (
          <SPIncomeExpenses
            initialValues={incomeExpenses}
            onNext={handleIncomeNext}
            onBack={() => setScreen('welcome')}
          />
        )}
        {screen === 'goals-preferences' && (
          <SPGoalsPreferences
            initialValues={goalsPrefs}
            onNext={handleGoalsNext}
            onBack={() => setScreen('income-expenses')}
          />
        )}
        {screen === 'recommended' && result && (
          <SPRecommendedPlan
            result={result}
            onAccept={handleAcceptRecommended}
            onAdjust={() => setScreen('adjust')}
            onAlternates={() => setScreen('alternates')}
          />
        )}
        {screen === 'alternates' && result && (
          <SPAlternatePlans
            result={result}
            onAccept={handleAcceptAlternates}
            onBack={() => setScreen('recommended')}
          />
        )}
        {screen === 'adjust' && result && (
          <SPManualAdjustment
            result={result}
            onAccept={handleAcceptAdjusted}
            onBack={() => setScreen('recommended')}
          />
        )}
        {screen === 'summary' && result && (
          <SPFinalSummary
            result={result}
            finalAllocation={finalAllocation}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  )
}
