import { useState } from 'react'

const CATEGORY_STYLES = {
  'Quick Win':     'bg-green-50 text-green-700 border-green-200',
  'Strategic Bet': 'bg-blue-50 text-blue-700 border-blue-200',
  'Pilot Later':   'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Deprioritise':  'bg-red-50 text-red-700 border-red-200',
}

function ScoreBar({ value, invert = false }) {
  const display = invert ? 10 - value : value
  const pct = (display / 10) * 100
  const color = display >= 7 ? 'bg-green-500' : display >= 5 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-muted w-4 text-right">{value}</span>
    </div>
  )
}

function UseCaseCard({ uc }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-navy/30">#{uc.rank}</span>
          <h3 className="font-semibold text-sm text-text leading-snug">{uc.name}</h3>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${CATEGORY_STYLES[uc.category] || 'bg-bg text-muted border-border'}`}>{uc.category}</span>
      </div>
      <div className="space-y-2 mb-4">
        {[['Business Impact', uc.businessImpact, false],['Implementation Effort', uc.implementationEffort, true],['Risk Level', uc.risk, true],['Data Availability', uc.dataAvailability, false],['Governance Complexity', uc.governanceComplexity, true]].map(([label, val, invert]) => (
          <div key={label} className="grid grid-cols-[140px_1fr] items-center gap-3">
            <span className="text-xs text-muted">{label}</span>
            <ScoreBar value={val} invert={invert} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted">Priority Score</span>
        <span className="text-navy font-bold">{uc.priorityScore?.toFixed(1)}</span>
      </div>
    </div>
  )
}

export default function PrioritizerPreview({ result, onUnlock }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const visible = result.rankedUseCases?.slice(0, 2) || []
  const locked = result.rankedUseCases?.slice(2) || []

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address'); return }
    onUnlock({ name, email })
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-muted text-sm">Your matrix is ready — {result.rankedUseCases?.length} use cases scored</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Here's a preview</h2>
          <p className="text-muted text-sm">Top 2 shown — enter your email to unlock the full matrix</p>
        </div>

        <div className="bg-navy/5 border border-navy/20 rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-2">Strategic Recommendation</p>
          <p className="text-text text-sm leading-relaxed">{result.summary}</p>
        </div>

        <div className="space-y-4 mb-4">{visible.map(uc => <UseCaseCard key={uc.name} uc={uc} />)}</div>

        {locked.length > 0 && (
          <div className="relative">
            <div className="space-y-4 blur-sm pointer-events-none select-none">{locked.map(uc => <UseCaseCard key={uc.name} uc={uc} />)}</div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-bg/20 via-bg/80 to-bg rounded-xl px-6">
              <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md text-center shadow-lg">
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-text mb-1">Unlock the full matrix</h3>
                <p className="text-muted text-sm mb-5">{locked.length} more use case{locked.length !== 1 ? 's' : ''} + complete scores, rationale, and category breakdown</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }} required
                    className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                  {error && <p className="text-red-600 text-xs text-left">{error}</p>}
                  <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm">Unlock Full Matrix →</button>
                </form>
                <p className="text-muted/60 text-xs mt-3">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
