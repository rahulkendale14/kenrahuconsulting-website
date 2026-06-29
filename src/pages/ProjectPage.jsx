import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

function Section({ title, children }) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-border">{title}</h2>
      {children}
    </section>
  )
}

function Tag({ children }) {
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-navy-light text-navy border border-navy/20">
      {children}
    </span>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="bg-bg text-text min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted">Case study not found.</p>
          <Link to="/portfolio" className="text-navy text-sm hover:underline">← Back to Portfolio</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-bg text-text min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-muted text-sm hover:text-text transition-colors mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          All case studies
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
          <p className="text-muted text-lg mb-8">{project.subtitle}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Client', value: project.hero.client },
              { label: 'Industry', value: project.hero.industry },
              { label: 'Duration', value: project.duration },
              { label: 'Impact', value: project.impact },
            ].map(({ label, value }) => (
              <div key={label} className="bg-surface border border-border rounded-lg p-4">
                <p className="text-xs text-muted mb-1">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Tool CTA */}
        {project.toolLink && (
          <div className="mb-14 border border-navy/20 rounded-xl overflow-hidden">
            {/* Mock browser chrome */}
            <div className="bg-navy/5 border-b border-navy/10 px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-300"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-300"></span>
              <span className="w-3 h-3 rounded-full bg-green-300"></span>
              <span className="ml-3 flex-1 bg-white border border-border rounded-md px-3 py-1 text-xs text-muted font-mono">
                kenrahuconsulting.com{project.toolLink}
              </span>
            </div>

            {/* Tool preview */}
            <div className="bg-bg px-6 py-8">
              <div className="max-w-md mx-auto space-y-4">
                {project.slug === 'prd-generator' ? (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-1">Enterprise AI PRD Generator</p>
                      <p className="text-base font-bold text-text">Tell us about your AI initiative</p>
                      <p className="text-muted text-xs mt-1">12 sections — stakeholder RACI, governance, and measurement framework</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'AI Feature / Product Name', placeholder: 'e.g. Production Defect Triage Automation' },
                        { label: 'Problem Being Solved', placeholder: 'What manual, high-volume pain point does this address?' },
                        { label: 'Goals & Success Metrics', placeholder: 'e.g. Reduce MTTR by 40%, free up 20% analyst capacity' },
                      ].map(f => (
                        <div key={f.label}>
                          <p className="text-xs font-medium text-text mb-1">{f.label}</p>
                          <div className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-muted/60">{f.placeholder}</div>
                        </div>
                      ))}
                      <div className="w-full bg-navy/10 border border-navy/20 rounded-lg px-3 py-2 text-center text-xs font-semibold text-navy">
                        Generate Enterprise PRD →
                      </div>
                    </div>
                  </>
                ) : project.slug === 'salary-planner' ? (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-1">Salary Planner</p>
                      <p className="text-base font-bold text-text">Income & Expenses</p>
                      <p className="text-muted text-xs mt-1">Enter your numbers. Get a realistic monthly plan.</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Monthly take-home salary', placeholder: '₹85,000' },
                        { label: 'Monthly bills & EMI', placeholder: '₹20,000' },
                        { label: 'Household expenses', placeholder: '₹15,000' },
                      ].map(f => (
                        <div key={f.label}>
                          <p className="text-xs font-medium text-text mb-1">{f.label}</p>
                          <div className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-muted/60">{f.placeholder}</div>
                        </div>
                      ))}
                      <div className="w-full bg-navy/10 border border-navy/20 rounded-lg px-3 py-2 text-center text-xs font-semibold text-navy">
                        Generate My Plan →
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-1">Recruiter Setup</p>
                      <p className="text-base font-bold text-text">Configure Your CV Screener</p>
                      <p className="text-muted text-xs mt-1">Set your criteria once. Share the link. AI screens every CV.</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Job Role', placeholder: 'e.g. Senior Product Manager' },
                        { label: 'Job Requirements', placeholder: '- 3+ years PM experience\n- Strong data skills...', textarea: true },
                        { label: 'Your Email', placeholder: 'you@yourcompany.com' },
                      ].map(f => (
                        <div key={f.label}>
                          <p className="text-xs font-medium text-text mb-1">{f.label}</p>
                          {f.textarea
                            ? <div className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-muted/60 h-16 font-mono">{f.placeholder}</div>
                            : <div className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-muted/60">{f.placeholder}</div>
                          }
                        </div>
                      ))}
                      <div className="w-full bg-navy/10 border border-navy/20 rounded-lg px-3 py-2 text-center text-xs font-semibold text-navy">
                        Generate Shareable Link →
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CTA bar */}
            <div className="bg-surface border-t border-navy/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-muted">This tool is live and free to use — no signup required.</p>
              <Link
                to={project.toolLink}
                className="shrink-0 bg-navy hover:bg-navy-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                {project.toolLabel} →
              </Link>
            </div>
          </div>
        )}

        {/* Problem */}
        <Section title="The Problem">
          <p className="text-muted leading-relaxed mb-6">{project.problem.summary}</p>

          <div className="space-y-4 mb-6">
            {project.problem.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-2 border-navy pl-5">
                <p className="text-text italic mb-1">"{q.text}"</p>
                <p className="text-muted text-sm">— {q.role}</p>
              </blockquote>
            ))}
          </div>

          <div className="bg-surface border border-border rounded-lg p-5">
            <p className="text-sm font-semibold mb-3">Root causes identified</p>
            <ul className="space-y-2">
              {project.problem.rootCauses.map((cause, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="text-navy mt-0.5 shrink-0">→</span>
                  {cause}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* What We Built */}
        <Section title="What We Built">
          <p className="text-muted leading-relaxed mb-6">{project.product.summary}</p>
          <div className="space-y-3">
            {project.product.components.map((c) => (
              <div key={c.name} className="bg-surface border border-border rounded-lg p-5">
                <p className="font-semibold text-sm mb-1">{c.name}</p>
                <p className="text-muted text-sm">{c.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Key Decisions */}
        <Section title="Key Decisions">
          <div className="space-y-6">
            {project.keyDecisions.map((d, i) => (
              <div key={i} className="border border-border rounded-lg p-6 bg-surface">
                <p className="font-bold mb-3">{d.decision}</p>
                <p className="text-muted text-sm leading-relaxed mb-3">{d.rationale}</p>
                <div className="bg-bg border border-border rounded-md px-4 py-3">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wide">Tradeoff: </span>
                  <span className="text-sm text-muted">{d.tradeoff}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Eval Framework */}
        <Section title="How We Evaluated It">
          <p className="text-muted leading-relaxed mb-6">{project.evalFramework.summary}</p>
          <div className="space-y-4">
            {project.evalFramework.stages.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-navy-light border border-navy/30 text-navy text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i < project.evalFramework.stages.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-sm mb-1">{s.name}</p>
                  <p className="text-muted text-sm">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Failure Modes */}
        <Section title="Failure Modes Considered">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold text-muted pr-6">Risk</th>
                  <th className="pb-3 font-semibold text-muted pr-6">Impact</th>
                  <th className="pb-3 font-semibold text-muted">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {project.failureModes.map((f, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 pr-6 text-text">{f.mode}</td>
                    <td className="py-3 pr-6">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        f.impact === 'High' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                      }`}>
                        {f.impact}
                      </span>
                    </td>
                    <td className="py-3 text-muted">{f.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Guardrails */}
        {project.guardrails && (
          <Section title="Guardrails">
            <div className="space-y-3">
              {project.guardrails.map((g, i) => (
                <div key={i} className="bg-surface border border-border rounded-lg p-5">
                  <p className="font-semibold text-sm mb-1">{g.rule}</p>
                  <p className="text-muted text-sm">{g.reason}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Hallucination Risks */}
        {project.hallucinationRisks && (
          <Section title="Hallucination Risks & Mitigation">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-semibold text-muted pr-6">Risk</th>
                    <th className="pb-3 font-semibold text-muted pr-6">Likelihood</th>
                    <th className="pb-3 font-semibold text-muted">Mitigation</th>
                  </tr>
                </thead>
                <tbody>
                  {project.hallucinationRisks.map((h, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 pr-6 text-text">{h.risk}</td>
                      <td className="py-3 pr-6">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          h.likelihood === 'High' ? 'bg-red-50 text-red-600 border border-red-200' :
                          h.likelihood === 'Medium' ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' :
                          'bg-gray-50 text-gray-500 border border-gray-200'
                        }`}>
                          {h.likelihood}
                        </span>
                      </td>
                      <td className="py-3 text-muted">{h.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* V2 */}
        <Section title="What V2 Would Include">
          <ul className="space-y-3">
            {project.v2Changes.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted">
                <span className="text-navy shrink-0 mt-0.5">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* CTA */}
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Similar challenge in your team?</h3>
          <p className="text-muted text-sm mb-6">Book a free 30-minute call to explore what an AI audit could look like for your workflow.</p>
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-navy hover:bg-navy-dark text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Book a Call
          </a>
        </div>

      </main>

      <Footer />
    </div>
  )
}
