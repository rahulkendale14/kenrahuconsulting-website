import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const phases = [
  {
    n: 1,
    title: 'Discovery',
    description: 'Problem statement backed by evidence — not assumptions. Pain points sourced from real user research, client interviews, and public data. Business case with numbers attached.',
    tags: ['User Research', 'Pain Point Analysis', 'Business Case'],
  },
  {
    n: 2,
    title: 'Definition',
    description: 'Full PRD with user stories, acceptance criteria, and MoSCoW prioritisation. Tech stack decision documented with rationale and alternatives considered.',
    tags: ['PRD', 'User Stories', 'MoSCoW', 'Tech Stack'],
  },
  {
    n: 3,
    title: 'MVP Scope',
    description: 'One core assumption defined. Minimum feature set that proves it. Everything else deferred. Ships fast, learns faster.',
    tags: ['Core Assumption', 'Scope Control', 'Success Criteria'],
  },
  {
    n: 4,
    title: 'Architecture',
    description: 'System design with data flow diagrams. API contracts defined before coding starts. Modular design — one module, one responsibility. Bugs stay contained.',
    tags: ['System Design', 'API Contracts', 'Modular Architecture'],
  },
  {
    n: 5,
    title: 'Frontend',
    description: 'Component-based, reusable UI. Every screen has loading, success, and error states designed before building. Responsive across all devices.',
    tags: ['Component Architecture', 'State Management', 'Responsive'],
  },
  {
    n: 6,
    title: 'Backend',
    description: 'Three-layer architecture: routes, business logic, data layer — each with one job. Input validation, authentication, standardised API responses.',
    tags: ['Layered Architecture', 'Auth', 'Input Validation'],
  },
  {
    n: 7,
    title: 'Database',
    description: 'Schema designed before any queries. Versioned migrations. Indexes on every queried column. Encrypted sensitive fields. Automated daily backups.',
    tags: ['Schema Design', 'Migrations', 'Security', 'Backups'],
  },
  {
    n: 8,
    title: 'AI Layer',
    description: 'Model selection documented with rationale. Prompts versioned in dedicated files. RAG pipeline design for document-heavy use cases. Agent design with guardrails and human-in-the-loop checkpoints.',
    tags: ['Prompt Versioning', 'RAG Design', 'Agent Orchestration', 'Token Budget'],
  },
  {
    n: 9,
    title: 'Testing',
    description: 'Unit, integration, edge case, and UAT. For AI features: hallucination testing, adversarial prompt testing, consistency testing, and automated eval pipelines with ground truth datasets.',
    tags: ['Unit Tests', 'Integration Tests', 'AI Evals', 'Adversarial Testing'],
  },
  {
    n: 10,
    title: 'Deployment',
    description: 'Local → Staging → Production. Never straight to production. Rollback plan documented before every deploy. Health checks confirmed post-deploy.',
    tags: ['Staged Deployment', 'Rollback Plan', 'Health Checks'],
  },
  {
    n: 11,
    title: 'Monitoring',
    description: 'Uptime, error rate, latency, token cost, task success rate — tracked with alert thresholds. User feedback loops feed back into eval datasets for continuous improvement.',
    tags: ['Observability', 'Cost Tracking', 'Feedback Loops'],
  },
  {
    n: 12,
    title: 'Compliance & Security',
    description: 'Input sanitisation, rate limiting, HTTPS, dependency audits. AI ethics checklist: PII handling, audit trail, bias review, explainability.',
    tags: ['Security', 'Data Privacy', 'AI Ethics'],
  },
]

const gates = {
  2: { label: 'Gate 1', question: 'Is this worth building?', detail: 'Multi-agent stress test before a line of code is written. Five independent perspectives debate the idea. One verdict: Green Light, Reshape, or Kill.' },
  4: { label: 'Gate 2', question: 'Is this the right MVP scope?', detail: 'PRD and feature set challenged before development starts. Catches overbuilding and underscoping before they cost time.' },
  12: { label: 'Gate 3', question: 'Continue to v2 or pivot?', detail: 'After MVP ships, real usage data reviewed. One clear decision: double down or change direction.' },
}

const deliverables = [
  { icon: '📋', title: 'Full PRD', body: 'Problem statement, user stories, acceptance criteria, and tech stack rationale — all documented before a line of code is written.' },
  { icon: '🏗️', title: 'Architecture Document', body: 'System design, API contracts, data models, and modular breakdown. You own the design, not just the output.' },
  { icon: '🧪', title: 'Test Reports', body: 'Unit, integration, edge case, and AI eval results. Includes adversarial testing for all AI-facing features.' },
  { icon: '🚀', title: 'Staged Deployment', body: 'Local → Staging → Production. Rollback plan included. Health checks verified post-deploy.' },
  { icon: '📊', title: 'Monitoring Setup', body: 'Alerts, dashboards, and cost tracking configured. You know what is happening in your system at all times.' },
  { icon: '🔒', title: 'Security Checklist', body: 'Every project ships with a completed security and compliance checklist. No loose ends.' },
]

export default function Process() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-16">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">How I Build</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Enterprise-grade process.<br />
            <span className="text-navy">No corporate bloat.</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mb-8">
            17 years in corporate IT at American Express. 2 years running an automation agency.
            Every project follows the same 12-phase process — the rigour of large enterprise builds,
            without the six-month timelines.
          </p>
          <div className="flex flex-wrap gap-3">
            {['N8N', 'Make', 'Go High Level', 'Claude (Anthropic)', 'RAG Pipelines', 'AI Agents'].map(tool => (
              <span key={tool} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-navy-light text-navy border border-navy/20">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { number: '17+', label: 'Years in corporate IT' },
            { number: '2', label: 'Years automation agency' },
            { number: '12', label: 'Phases per project' },
            { number: '3', label: 'Decision gates' },
          ].map(s => (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-navy">{s.number}</p>
              <p className="text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-8">The 12-Phase Process</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="flex flex-col gap-0">
              {phases.map((phase, idx) => (
                <div key={phase.n}>
                  {/* Phase row */}
                  <div className="flex gap-6 group">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full bg-surface border-2 border-navy text-navy text-sm font-bold flex items-center justify-center z-10 group-hover:bg-navy group-hover:text-white transition-colors">
                        {phase.n}
                      </div>
                      {idx < phases.length - 1 && !gates[phase.n] && (
                        <div className="w-px flex-1 bg-border min-h-8" />
                      )}
                      {idx < phases.length - 1 && gates[phase.n] && (
                        <div className="w-px h-4 bg-border" />
                      )}
                    </div>

                    <div className="pb-6 flex-1">
                      <h3 className="text-base font-semibold mb-1 mt-2">{phase.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-2">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.tags.map(t => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-bg border border-border text-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gate after this phase */}
                  {gates[phase.n] && (
                    <div className="flex gap-6 mb-2">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-navy-light border-2 border-navy text-navy text-base flex items-center justify-center z-10">
                          ⚡
                        </div>
                        <div className="w-px flex-1 bg-border min-h-8" />
                      </div>
                      <div className="pb-6 flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-navy mb-1 mt-2">
                          {gates[phase.n].label}
                        </p>
                        <h3 className="text-base font-semibold text-navy mb-1">
                          {gates[phase.n].question}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                          {gates[phase.n].detail}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What you get */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-8">What You Get</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {deliverables.map(d => (
              <div key={d.title} className="bg-surface border border-border rounded-xl p-6">
                <p className="text-2xl mb-3">{d.icon}</p>
                <h3 className="text-base font-semibold mb-2">{d.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI capabilities strip */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-8">AI Capabilities</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'AI Agents', body: 'Multi-agent systems with tool use, memory, guardrails, and human-in-the-loop checkpoints.' },
              { label: 'RAG Pipelines', body: 'Document ingestion, chunking, vector search, and context-aware retrieval for knowledge-heavy workflows.' },
              { label: 'Workflow Automation', body: 'N8N, Make, and GHL for end-to-end business process automation without custom code overhead.' },
              { label: 'AI Evals', body: 'Ground truth datasets, automated eval pipelines, hallucination testing, and regression evals on model upgrades.' },
            ].map(a => (
              <div key={a.label} className="bg-surface border border-border rounded-xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-navy mb-2">{a.label}</p>
                <p className="text-muted text-sm leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to build something that works?</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Start with a 30-minute call. I will audit one workflow and tell you exactly where AI can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/kendale-rahul/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy hover:bg-navy-dark text-white text-sm font-semibold px-7 py-3 rounded-lg transition-colors"
            >
              Book a Free Call
            </a>
            <a
              href="mailto:rahul@kenrahu.com"
              className="border border-border text-text text-sm font-semibold px-7 py-3 rounded-lg hover:border-navy/40 transition-colors"
            >
              Send an Email
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
