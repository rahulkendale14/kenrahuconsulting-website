import { useState } from 'react'

function CheckItem({ text }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-4 h-4 rounded border-2 border-navy/30 flex-shrink-0 mt-0.5" />
      <span className="text-sm text-text leading-snug">{text}</span>
    </div>
  )
}

function LayerBlock({ number, title, items }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-bold text-navy/40 w-4">{number}</span>
        <h3 className="text-sm font-semibold text-text uppercase tracking-wide">{title}</h3>
      </div>
      <div className="pl-7 divide-y divide-border">
        {items.map((item, i) => <CheckItem key={i} text={item} />)}
      </div>
    </div>
  )
}

export default function GovernancePreview({ result, formData, onUnlock }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const totalItems = (
    (result.businessGovernance?.length || 0) +
    (result.productGovernance?.length || 0) +
    (result.modelGovernance?.length || 0) +
    (result.operationalGovernance?.length || 0) +
    (result.riskAndCompliance?.length || 0)
  )

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
            <span className="text-muted text-sm">Your checklist is ready — {totalItems} items across 5 layers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Here's a preview</h2>
          <p className="text-muted text-sm">{formData.productName} · {formData.riskLevel} Risk · {formData.deploymentStage}</p>
        </div>

        {result.priorityActions?.length > 0 && (
          <div className="bg-navy/5 border border-navy/20 rounded-xl p-5 mb-6">
            <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-3">Priority Actions — Do These First</p>
            <div className="space-y-2">
              {result.priorityActions.map((action, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-navy w-4 flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-text leading-snug">{action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-surface border border-border rounded-xl p-6 mb-4">
          <LayerBlock number={1} title="Business Governance" items={result.businessGovernance || []} />
        </div>

        <div className="relative">
          <div className="space-y-4 blur-sm pointer-events-none select-none">
            <div className="bg-surface border border-border rounded-xl p-6">
              <LayerBlock number={2} title="Product Governance" items={result.productGovernance || []} />
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <LayerBlock number={3} title="Model Governance" items={result.modelGovernance || []} />
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <LayerBlock number={4} title="Operational Governance" items={result.operationalGovernance || []} />
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <LayerBlock number={5} title="Risk & Compliance" items={result.riskAndCompliance || []} />
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-bg/10 via-bg/85 to-bg rounded-xl px-6">
            <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md text-center shadow-lg">
              <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-text mb-1">Unlock the full checklist</h3>
              <p className="text-muted text-sm mb-5">4 more governance layers — Product, Model, Operational, and Risk & Compliance</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                <input type="email" placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }} required
                  className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                {error && <p className="text-red-600 text-xs text-left">{error}</p>}
                <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                  Unlock Full Checklist →
                </button>
              </form>
              <p className="text-muted/60 text-xs mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
