export default function RACIStart({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6 py-16">
      <div className="max-w-xl w-full text-center">

        <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
          <span className="text-muted text-sm">13 Roles · 5 Activity Categories · Enterprise Framework · Free</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
          Generate Your <span className="text-navy">AI Project RACI Matrix</span>
        </h1>

        <p className="text-muted text-base mb-8">
          Describe your AI product and team structure. Get a complete RACI matrix across every key decision and activity — who's Responsible, Accountable, Consulted, and Informed. Built on a real enterprise AI stakeholder framework.
        </p>

        <div className="bg-surface border border-border rounded-xl p-6 mb-6 text-left">
          <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">Your RACI covers</p>
          <div className="space-y-3">
            {[
              ['Strategy & Planning', 'Scope, objectives, roadmap, budget decisions'],
              ['Data & Model', 'Data access, model evaluation, prompt versioning, retraining'],
              ['Product & Build', 'Requirements, design, release decisions, change requests'],
              ['Governance & Risk', 'Risk sign-off, compliance review, security, ethics'],
              ['Operations & Go-Live', 'Deployment, monitoring, incident response, training'],
            ].map(([cat, desc], i) => (
              <div key={cat} className="flex items-start gap-3">
                <span className="text-xs font-bold text-navy/40 w-4 mt-0.5 flex-shrink-0">{i + 1}</span>
                <div>
                  <span className="text-sm font-medium text-text">{cat}</span>
                  <span className="text-sm text-muted"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 mb-8 text-left">
          <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-3">13-role framework includes</p>
          <div className="flex flex-wrap gap-2">
            {['AI Product Manager','AI/ML Lead','Data Engineer','Engineering Lead','Business Sponsor','Operations Lead','Compliance Officer','Security Team','Legal Counsel','UX Lead','QA Lead','Change Mgmt Lead','Business Analyst'].map(r => (
              <span key={r} className="bg-navy/5 text-navy text-xs font-medium px-2.5 py-1 rounded-full border border-navy/15">{r}</span>
            ))}
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
        >
          Build My RACI Matrix →
        </button>
        <p className="text-muted/60 text-xs mt-4">Takes 1 minute · Scales to your org size · No signup required upfront</p>
      </div>
    </div>
  )
}
