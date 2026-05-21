export default function PRDStart({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6 py-16">
      <div className="max-w-xl w-full text-center">

        <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
          <span className="text-muted text-sm">AI-Powered · Free · Instant</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
          Generate a <span className="text-navy">Professional PRD</span> in seconds
        </h1>

        <p className="text-muted text-base mb-8">
          Answer 7 quick questions about your product. AI will write a complete, structured PRD ready to share with your team.
        </p>

        <div className="bg-surface border border-border rounded-xl p-6 mb-8 text-left">
          <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">Your PRD will include</p>
          <ul className="space-y-3">
            {[
              'Problem Statement',
              'Goals & Success Metrics',
              'Target Users & Personas',
              'Features & Requirements (P0/P1/P2)',
              'Out of Scope',
              'Timeline & Milestones',
              'Risks & Assumptions',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-text">
                <svg className="w-4 h-4 text-navy flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
        >
          Generate My PRD →
        </button>

        <p className="text-muted/60 text-xs mt-4">Takes about 2 minutes · No signup required upfront</p>
      </div>
    </div>
  )
}
