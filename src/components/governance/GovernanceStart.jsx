export default function GovernanceStart({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6 py-16">
      <div className="max-w-xl w-full text-center">

        <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
          <span className="text-muted text-sm">5 Governance Layers · Risk-Scaled · Free</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
          Generate Your <span className="text-navy">AI Governance Checklist</span>
        </h1>

        <p className="text-muted text-base mb-8">
          Describe your AI product. Get a tailored governance checklist across all 5 layers — scaled to your risk level, industry, and deployment stage. Built on a real enterprise AI governance model.
        </p>

        <div className="bg-surface border border-border rounded-xl p-6 mb-8 text-left">
          <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">Your checklist covers</p>
          <div className="space-y-3">
            {[
              ['Business Governance', 'Prioritisation, value tracking, executive decision rights'],
              ['Product Governance', 'Scope control, release approvals, KPI reviews'],
              ['Model Governance', 'Prompt versioning, evaluation thresholds, HITL checkpoints'],
              ['Operational Governance', 'Incident response, fallback plans, monitoring'],
              ['Risk & Compliance', 'Policy adherence, audit readiness, data classification'],
            ].map(([layer, desc], i) => (
              <div key={layer} className="flex items-start gap-3">
                <span className="text-xs font-bold text-navy/40 w-4 mt-0.5 flex-shrink-0">{i + 1}</span>
                <div>
                  <span className="text-sm font-medium text-text">{layer}</span>
                  <span className="text-sm text-muted"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
        >
          Generate My Governance Checklist →
        </button>
        <p className="text-muted/60 text-xs mt-4">Takes 1 minute · Depth scales to your risk level · No signup required upfront</p>
      </div>
    </div>
  )
}
