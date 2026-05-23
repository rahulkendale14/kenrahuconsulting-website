export default function PrioritizerStart({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
          <span className="text-muted text-sm">Enterprise Framework · Scored & Ranked · Free</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
          Prioritise Your <span className="text-navy">AI Use Cases</span> the Right Way
        </h1>
        <p className="text-muted text-base mb-8">
          Paste your list of AI ideas. Get a scored, ranked matrix across 5 dimensions — built on the same framework used to prioritise AI initiatives at enterprise companies.
        </p>

        <div className="bg-surface border border-border rounded-xl p-6 mb-8 text-left">
          <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">Each use case is scored on</p>
          <div className="space-y-3">
            {[
              ['Business Impact', 'Revenue, cost, risk, and operational value'],
              ['Implementation Effort', 'Engineering complexity and data requirements'],
              ['Risk Level', 'Model accuracy, compliance, and reversibility'],
              ['Data Availability', 'Quality, volume, and accessibility of data'],
              ['Governance Complexity', 'Regulatory exposure and approval overhead'],
            ].map(([label, desc]) => (
              <div key={label} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-navy flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="text-sm font-medium text-text">{label}</span>
                  <span className="text-sm text-muted"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onStart} className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base">
          Prioritise My Use Cases →
        </button>
        <p className="text-muted/60 text-xs mt-4">Takes 1 minute · No signup required upfront</p>
      </div>
    </div>
  )
}
