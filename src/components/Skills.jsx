import { motion } from 'framer-motion'

const skills = [
  {
    category: 'Product Management',
    color: '#ffffff',
    items: ['Product Strategy', 'Roadmapping', 'User Research', 'PRD Writing', 'Stakeholder Management', 'Agile / Scrum', 'OKRs & KPIs', 'Go-to-Market'],
  },
  {
    category: 'AI & Automation',
    color: '#d4d4d4',
    items: ['Claude API', 'Groq / LLaMA', 'Prompt Engineering', 'n8n Automation', 'LLM Product Design', 'AI Workflow Design', 'Streamlit', 'Vercel'],
  },
  {
    category: 'Technical',
    color: '#a3a3a3',
    items: ['Python', 'React', 'REST APIs', 'Firecrawl / Web Scraping', 'Git & GitHub', 'SQL (Basics)', 'Vite', 'Tailwind CSS'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface relative overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-6 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6c63ff 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-4">Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">What I Bring</h2>
          <p className="text-muted max-w-xl mx-auto">
            17 years of PM experience combined with hands-on AI building. I don't just manage AI products — I build them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
              className="bg-bg border border-border rounded-xl p-8 hover:border-navy/30 transition-colors group"
            >
              <p className="font-semibold text-sm uppercase tracking-wider mb-6 pb-4 border-b border-border"
                style={{ color: group.color }}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.12 + si * 0.04 }}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
                    style={{
                      background: `${group.color}14`,
                      color: group.color,
                      borderColor: `${group.color}30`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
