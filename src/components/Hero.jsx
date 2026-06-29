import { motion } from 'framer-motion'
import rahulPhoto from '../assets/rahul.jpg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
})

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 bg-bg overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
      <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a3a3a3 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.span {...fadeUp(0.1)}
              className="inline-block bg-navy-light text-navy text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-navy/20"
            >
              AI Product Manager
            </motion.span>

            <motion.h1 {...fadeUp(0.2)} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
              Senior Product Manager
              <br />
              <span className="gradient-text text-glow-purple">building AI tools that ship.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="text-muted text-lg leading-relaxed mb-10 max-w-xl">
              17 years of product management. Now building at the intersection of AI and product —
              shipping real tools, solving real problems, and helping companies adopt AI the right way.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#work"
                className="bg-navy font-semibold px-8 py-3.5 rounded-xl transition-all text-sm hover:bg-navy-dark glow-purple"
                style={{ color: '#000000' }}
              >
                View Tools I've Built
              </a>
              <a
                href="https://calendly.com/kendale-rahul/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border text-text hover:border-navy/50 font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
              >
                Book a Call
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.5)}
              className="mt-12 grid grid-cols-3 gap-6 max-w-sm border-t border-border pt-8 mx-auto lg:mx-0"
            >
              <div>
                <p className="text-2xl font-bold gradient-text">17+</p>
                <p className="text-muted text-xs mt-1">Years in Product</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">8+</p>
                <p className="text-muted text-xs mt-1">AI Tools Shipped</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">AI</p>
                <p className="text-muted text-xs mt-1">First Builder</p>
              </div>
            </motion.div>
          </div>

          {/* Right — photo + skills */}
          <motion.div {...fadeUp(0.3)} className="flex-shrink-0 flex flex-col items-center gap-5">
            <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden glow-purple"
              style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}
            >
              <img
                src={rahulPhoto}
                alt="Rahul Kendale — AI Product Manager"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="w-full max-w-xs space-y-3">
              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-3">AI Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Prompt Engineering','LLM Product Design','AI Governance','AI Use Case Design','Claude API · Groq','n8n Automation','Agentic Workflows','AI Metrics & Eval'].map(s => (
                    <span key={s} className="bg-navy-light text-navy text-xs font-medium px-2.5 py-1 rounded-full border border-navy/20">{s}</span>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Product Management</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Enterprise Strategy','Stakeholder Mgmt','PRD Writing','Roadmapping','OKRs & KPIs','Agile / Scrum','User Research','Go-to-Market'].map(s => (
                    <span key={s} className="bg-border/50 text-muted text-xs font-medium px-2.5 py-1 rounded-full border border-border">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
