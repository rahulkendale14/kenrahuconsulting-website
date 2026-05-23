import { useState } from 'react'

const SECTION_LABELS = {
  executiveSummary: 'Executive Summary',
  problemStatement: 'Problem Statement',
  strategicRationale: 'Strategic Rationale',
  automatedFunctions: 'Automated Functions',
  goalsAndMetrics: 'Goals & Metrics Framework',
  stakeholdersAndRoles: 'Stakeholders & Roles (RACI)',
  featureRequirements: 'Feature Requirements',
  governanceFramework: 'Governance Framework',
  securityAndCompliance: 'Security & Compliance',
  operatingModel: 'End-to-End Operating Model',
  reportsToCreate: 'Reports to Create',
  risksAndOpenQuestions: 'Risks & Open Questions',
}

export default function PRDPreview({ prd, onUnlock }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const sections = Object.entries(prd)
  const visibleSections = sections.slice(0, 2)
  const lockedSections = sections.slice(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    onUnlock({ name, email })
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-surface border border-[#2A2A2A] rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
            <span className="text-muted text-sm">Your Enterprise PRD is ready</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Here's a preview</h2>
          <p className="text-muted text-sm">Enter your email to unlock all 12 sections</p>
        </div>

        {visibleSections.map(([key, content]) => (
          <div key={key} className="bg-surface border border-[#2A2A2A] rounded-xl p-6 mb-4">
            <h3 className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
              {SECTION_LABELS[key] || key}
            </h3>
            <p className="text-sm leading-relaxed whitespace-pre-line text-white/90">{content}</p>
          </div>
        ))}

        <div className="relative">
          <div className="space-y-4 blur-sm pointer-events-none select-none">
            {lockedSections.map(([key, content]) => (
              <div key={key} className="bg-surface border border-[#2A2A2A] rounded-xl p-6">
                <h3 className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
                  {SECTION_LABELS[key] || key}
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-line text-white/90">{content}</p>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-bg/20 via-bg/80 to-bg rounded-xl px-6">
            <div className="bg-surface border border-[#2A2A2A] rounded-xl p-6 w-full max-w-md text-center">

              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h3 className="font-bold text-lg mb-1">Unlock your full PRD</h3>
              <p className="text-muted text-sm mb-5">10 more sections — Stakeholder RACI, Governance, Metrics, Operating Model, Reports & more</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-bg border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  className="w-full bg-bg border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm"
                  required
                />
                {error && <p className="text-red-400 text-xs text-left">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Unlock Full PRD →
                </button>
              </form>

              <p className="text-muted/50 text-xs mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
