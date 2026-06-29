import { motion } from 'framer-motion'

const cards = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Product Strategy',
    desc: 'Roadmaps, prioritisation, stakeholder alignment',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI Tool Building',
    desc: 'Shipped 8+ AI tools using Claude, Groq, n8n',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'User Research',
    desc: 'Discovery, synthesis, pain point validation',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Data & Metrics',
    desc: 'KPIs, funnels, experiment design',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-bg relative overflow-hidden">

      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a3a3a3 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-4">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6 leading-tight">
              17 years of product management.
              <br />
              <span className="gradient-text">Now building with AI.</span>
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              I'm Rahul Kendale — a Senior Product Manager with 17 years of experience building and shipping products across enterprise software and technology.
            </p>
            <p className="text-muted leading-relaxed mb-5">
              Today I'm focused on one thing: building AI-powered tools and products that solve real problems. Not prototypes. Not demos. Shipped, working tools that people actually use.
            </p>
            <p className="text-muted leading-relaxed">
              I bridge the gap between AI capability and product thinking — understanding what's technically possible, what users actually need, and how to ship it fast.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-surface border border-border rounded-xl p-6 hover:border-navy/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-light flex items-center justify-center mb-4 text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>
                <p className="text-text font-semibold text-sm mb-1">{card.title}</p>
                <p className="text-muted text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
