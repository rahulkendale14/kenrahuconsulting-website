import { Link } from 'react-router-dom'

const tools = [
  {
    title: 'AI Readiness Calculator',
    description: 'Assess your AI readiness in 2 minutes. Get a score 0–100 and a personalised action plan based on where you actually stand.',
    status: 'live',
    link: '/quiz',
    linkLabel: 'Try It Free →',
    badge: null,
  },
  {
    title: 'PRD Generator',
    description: 'Generate a complete, professional Product Requirements Document in seconds. Powered by Claude AI — just answer 7 questions.',
    status: 'live',
    link: '/tools/prd-generator',
    linkLabel: 'Generate Your PRD →',
    badge: null,
  },
  {
    title: 'Experience Calculator',
    description: 'Add each company you\'ve worked at and get your total experience instantly — broken down by years, months, and skill.',
    status: 'live',
    link: '/tools/experience-calculator',
    linkLabel: 'Calculate Now →',
    badge: null,
  },
  {
    title: 'AI Candidate Screener',
    description: 'Set your criteria, generate a shareable link, and let AI screen candidates — MCQs, profile check, and tech questions in one flow.',
    status: 'live',
    link: '/tools/cv-screening',
    linkLabel: 'Try It Free →',
    badge: null,
  },
  {
    title: 'Fake Resume Detector',
    description: 'Paste any IT resume and get an AI fraud risk score in 30 seconds. Detects AI-generated content, fabricated experience, and proxy candidate patterns.',
    status: 'live',
    link: '/tools/fake-resume-detector',
    linkLabel: 'Detect Now →',
    badge: null,
  },
  {
    title: 'Roadmap Prioritizer',
    description: 'Rank and prioritise your AI initiatives based on effort, impact, and readiness. Build a roadmap that makes sense.',
    status: 'soon',
    link: null,
    linkLabel: null,
    badge: 'Coming Soon',
  },
]

export default function Tools() {
  return (
    <section id="tools" className="py-24 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Tools</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tools I've Built</h2>
          <p className="text-muted max-w-xl mx-auto">
            Free, practical tools to help you make better AI decisions — no sign-up required to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className={`bg-surface border rounded-xl p-7 flex flex-col transition-all duration-300 ${
                tool.status === 'live'
                  ? 'border-accent/30 hover:border-accent/60'
                  : 'border-[#2A2A2A] opacity-70'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                {tool.badge && (
                  <span className="text-xs font-medium bg-[#2A2A2A] text-muted px-2.5 py-1 rounded-full">
                    {tool.badge}
                  </span>
                )}
                {tool.status === 'live' && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                    Live
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold mb-3">{tool.title}</h3>
              <p className="text-muted text-sm leading-relaxed flex-1">{tool.description}</p>

              {tool.link && (
                <div className="mt-6">
                  <Link
                    to={tool.link}
                    className="text-accent hover:text-white text-sm font-semibold transition-colors"
                  >
                    {tool.linkLabel}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-muted/60 text-sm mt-10">
          More tools launching soon — follow along on LinkedIn for updates.
        </p>
      </div>
    </section>
  )
}
