import { useState } from 'react'

const AREA_COLORS = {
  'Business Impact':          'text-green-700 bg-green-50 border-green-200',
  'Operational Efficiency':   'text-blue-700 bg-blue-50 border-blue-200',
  'Model Performance':        'text-purple-700 bg-purple-50 border-purple-200',
  'User Adoption':            'text-orange-700 bg-orange-50 border-orange-200',
  'Data Quality':             'text-yellow-700 bg-yellow-50 border-yellow-200',
  'Risk & Safety':            'text-red-700 bg-red-50 border-red-200',
  'Governance & Compliance':  'text-slate-700 bg-slate-50 border-slate-200',
  'Customer Experience':      'text-teal-700 bg-teal-50 border-teal-200',
  'Engineering Health':       'text-indigo-700 bg-indigo-50 border-indigo-200',
}

function MetricAreaCard({ area }) {
  const color = AREA_COLORS[area.area] || 'text-muted bg-surface border-border'
  return (
    <div className={`rounded-xl border p-5 ${color.split(' ').slice(1).join(' ')}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-semibold ${color.split(' ')[0]}`}>{area.area}</h3>
        <span className="text-xs text-muted">{area.owner}</span>
      </div>
      <div className="mb-3">
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5">Leading Indicators</p>
        <ul className="space-y-1">
          {area.leadingIndicators?.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text">
              <span className="mt-1 text-muted">→</span><span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5">Lagging KPIs</p>
        <ul className="space-y-1">
          {area.laggingKPIs?.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text">
              <span className="mt-1 text-muted">◆</span><span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 pt-3 border-t border-current/10 flex items-center justify-between">
        <span className="text-xs text-muted">Cadence: {area.cadence}</span>
        <span className="text-xs text-muted italic truncate max-w-[160px]">{area.dataSource}</span>
      </div>
    </div>
  )
}

export default function MetricsPreview({ result, formData, onUnlock }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const visibleAreas = result.metricAreas?.slice(0, 3) || []
  const lockedAreas = result.metricAreas?.slice(3) || []

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
            <span className="text-muted text-sm">Your framework is ready — {result.metricAreas?.length} metric areas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Here's a preview</h2>
          <p className="text-muted text-sm">{formData.productName} · {formData.deploymentStage} · {formData.businessObjective}</p>
        </div>

        <div className="bg-navy/5 border border-navy/20 rounded-xl p-5 mb-5">
          <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-1">North Star Metric</p>
          <p className="text-lg font-bold text-text mb-1">{result.northStar?.name}</p>
          <p className="text-sm text-muted mb-3">{result.northStar?.definition}</p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div><p className="text-muted mb-0.5">Target</p><p className="font-medium text-text">{result.northStar?.target}</p></div>
            <div><p className="text-muted mb-0.5">Cadence</p><p className="font-medium text-text">{result.northStar?.cadence}</p></div>
            <div><p className="text-muted mb-0.5">Owner</p><p className="font-medium text-text">{result.northStar?.owner}</p></div>
          </div>
          {result.northStar?.why && <p className="text-xs text-muted mt-3 italic border-t border-navy/10 pt-3">{result.northStar.why}</p>}
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 mb-5">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">Strategic Overview</p>
          <p className="text-sm text-text leading-relaxed">{result.executiveSummary}</p>
        </div>

        <div className="space-y-4 mb-4">
          {visibleAreas.map((area, i) => <MetricAreaCard key={i} area={area} />)}
        </div>

        {lockedAreas.length > 0 && (
          <div className="relative">
            <div className="space-y-4 blur-sm pointer-events-none select-none">
              {lockedAreas.map((area, i) => <MetricAreaCard key={i} area={area} />)}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-bg/10 via-bg/85 to-bg rounded-xl px-6">
              <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md text-center shadow-lg">
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-text mb-1">Unlock the full framework</h3>
                <p className="text-muted text-sm mb-5">{lockedAreas.length} more metric areas + reporting cadence + instrumentation priorities</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }} required
                    className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                  {error && <p className="text-red-600 text-xs text-left">{error}</p>}
                  <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                    Unlock Full Framework →
                  </button>
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
