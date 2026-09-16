import { useState, useEffect } from 'react'

const STEPS = ['Reading your use cases...','Scoring business impact...','Evaluating implementation effort...','Assessing risk and governance...','Checking data availability...','Calculating priority scores...','Ranking and categorising...']

export default function PrioritizerLoading() {
  const [stepIndex, setStepIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setStepIndex(prev => prev < STEPS.length - 1 ? prev + 1 : prev), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6">
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 mx-auto mb-8">
          <div className="w-16 h-16 rounded-full border-4 border-border border-t-navy animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-text mb-3">Scoring your use cases</h2>
        <p className="text-navy text-sm font-medium mb-8 min-h-[20px]">{STEPS[stepIndex]}</p>
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= stepIndex ? 'bg-navy' : 'bg-border'}`} />)}
        </div>
        <p className="text-muted/60 text-xs mt-8">Scoring across 5 dimensions · Usually 15–20 seconds</p>
      </div>
    </div>
  )
}
