const skills = [
  {
    category: 'Product Management',
    items: ['Product Strategy', 'Roadmapping', 'User Research', 'PRD Writing', 'Stakeholder Management', 'Agile / Scrum', 'OKRs & KPIs', 'Go-to-Market'],
  },
  {
    category: 'AI & Automation',
    items: ['Claude API', 'Groq / LLaMA', 'Prompt Engineering', 'n8n Automation', 'LLM Product Design', 'AI Workflow Design', 'Streamlit', 'Vercel'],
  },
  {
    category: 'Technical',
    items: ['Python', 'React', 'REST APIs', 'Firecrawl / Web Scraping', 'Git & GitHub', 'SQL (Basics)', 'Vite', 'Tailwind CSS'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-4">Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">What I Bring</h2>
          <p className="text-muted max-w-xl mx-auto">
            17 years of PM experience combined with hands-on AI building. I don't just manage AI products — I build them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((group) => (
            <div key={group.category} className="bg-surface border border-border rounded-xl p-8">
              <p className="text-navy font-semibold text-sm uppercase tracking-wider mb-6 pb-4 border-b border-border">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="bg-navy-light text-navy text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
