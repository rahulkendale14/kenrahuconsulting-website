import rahulPhoto from '../assets/rahul.jpg'

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-navy-light text-navy text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              AI Product Manager
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
              Senior Product Manager
              <br />
              <span className="text-navy">building AI tools that ship.</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-10 max-w-xl">
              17 years of product management. Now building at the intersection of AI and product —
              shipping real tools, solving real problems, and helping companies adopt AI the right way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#work"
                className="bg-navy-light hover:bg-navy/20 text-navy font-semibold px-8 py-3.5 rounded-xl transition-all text-sm border border-navy/20"
              >
                View Tools I've Built
              </a>
              <a
                href="https://calendly.com/kendale-rahul/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-navy text-navy hover:bg-navy-light font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
              >
                Book a Call
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm border-t border-border pt-8 mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-navy">17+</p>
                <p className="text-muted text-xs mt-1">Years in Product</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">5+</p>
                <p className="text-muted text-xs mt-1">AI Tools Shipped</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">AI</p>
                <p className="text-muted text-xs mt-1">First Builder</p>
              </div>
            </div>
          </div>

          {/* Right — photo + skills */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-4 border-navy-light shadow-xl">
              <img
                src={rahulPhoto}
                alt="Rahul Kendale — AI Product Manager"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="w-full max-w-xs space-y-3">
              {/* AI Skills */}
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-3">AI Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Prompt Engineering','LLM Product Design','AI Governance','AI Use Case Design','Claude API · Groq','n8n Automation','Agentic Workflows','AI Metrics & Eval'].map(s => (
                    <span key={s} className="bg-navy/8 text-navy text-xs font-medium px-2.5 py-1 rounded-full border border-navy/15">{s}</span>
                  ))}
                </div>
              </div>

              {/* PM Skills */}
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Product Management</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Enterprise Strategy','Stakeholder Mgmt','PRD Writing','Roadmapping','OKRs & KPIs','Agile / Scrum','User Research','Go-to-Market'].map(s => (
                    <span key={s} className="bg-bg text-muted text-xs font-medium px-2.5 py-1 rounded-full border border-border">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
