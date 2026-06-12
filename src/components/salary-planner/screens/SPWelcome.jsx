import { SPButton } from '../ui/SPButton'

const DEMO_DATA = {
  salary: 85000, bills: 8000, emi: 12000, household: 15000,
  medical: 2000, irregular: 3000, dependents: 2,
  currentSavings: 50000, annualGoal: 200000, preference: 'balanced',
}

export function SPWelcome({ onStart, onDemoFill }) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="flex-1 flex flex-col justify-center py-12">
        <div className="mb-8">
          <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">
            Salary Planning<br />Assistant
          </h1>
          <p className="text-muted text-base leading-relaxed">
            Enter your income and expenses. Get a clear, explainable plan for where your money should go — and whether your savings goal is within reach.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-10">
          {[
            { icon: '📊', text: 'Personalized allocation across 7 categories' },
            { icon: '🎯', text: 'One-year savings goal check with alternatives' },
            { icon: '⚙️', text: 'Manual adjustments with live projections' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-muted bg-surface border border-[#2A2A2A] rounded-xl px-4 py-3">
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <SPButton onClick={onStart}>Get my plan →</SPButton>
          <SPButton variant="secondary" onClick={() => { onDemoFill(DEMO_DATA); onStart() }}>
            Try with demo data
          </SPButton>
        </div>
      </div>

      <p className="text-center text-xs text-muted/40 pb-6">
        No data stored or sent anywhere. Everything stays in your browser.
      </p>
    </div>
  )
}
