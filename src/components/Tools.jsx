import { Link } from 'react-router-dom'

const tools = [
  {
    title: 'Enterprise AI PRD Generator',
    description: 'Generate a 12-section enterprise AI PRD — stakeholder RACI, governance framework, measurement model, and operating model. Built on a real enterprise AI program.',
    status: 'live',
    link: '/tools/prd-generator',
    linkLabel: 'Generate PRD →',
    tag: 'AI-Powered',
  },
  {
    title: 'AI Use Case Prioritizer',
    description: 'Paste your AI ideas and get a scored, ranked matrix across 5 dimensions — business impact, effort, risk, data availability, and governance complexity.',
    status: 'live',
    link: '/tools/use-case-prioritizer',
    linkLabel: 'Prioritise Now →',
    tag: 'AI-Powered',
  },
  {
    title: 'Experience Calculator',
    description: 'Add each company you\'ve worked at and get your total experience instantly — broken down by years, months, and skill. Built for PM interviews.',
    status: 'live',
    link: '/tools/experience-calculator',
    linkLabel: 'Calculate Now →',
    tag: 'Free Tool',
  },
  {
    title: 'User Research Synthesizer',
    description: 'Paste interview transcripts and get synthesised themes, pain points, and opportunity areas — in minutes instead of days.',
    status: 'soon',
    link: null,
    linkLabel: null,
    tag: 'Coming Soon',
  },
  {
    title: 'Stakeholder Update Generator',
    description: 'Feed sprint data and metrics — get an exec-ready update in Slack, email, or slide format. Never write status updates from scratch again.',
    status: 'soon',
    link: null,
    linkLabel: null,
    tag: 'Coming Soon',
  },
  {
    title: 'Competitive Intelligence Pipeline',
    description: 'Input competitors — get a structured brief: features, pricing, positioning, and customer complaints. Re-run anytime for fresh data.',
    status: 'soon',
    link: null,
    linkLabel: null,
    tag: 'Coming Soon',
  },
  {
    title: 'PM Interview Coach',
    description: 'Feed your experience and a target JD. Get the best stories to tell per competency, STAR drafts, and specific gap analysis.',
    status: 'soon',
    link: null,
    linkLabel: null,
    tag: 'Coming Soon',
  },
]

export default function Tools() {
  return (
    <section id="tools" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-4">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">AI Tools I've Built</h2>
          <p className="text-muted max-w-xl mx-auto">
            Real tools, live and free to use. Each one built to solve a specific PM workflow problem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className={`bg-bg border rounded-xl p-7 flex flex-col transition-all duration-300 ${
                tool.status === 'live'
                  ? 'border-navy/30 hover:border-navy/60 hover:shadow-md'
                  : 'border-border opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-navy-light flex items-center justify-center">
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  tool.status === 'live'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {tool.status === 'live' ? '● Live' : tool.tag}
                </span>
              </div>

              <h3 className="text-base font-semibold text-text mb-3">{tool.title}</h3>
              <p className="text-muted text-sm leading-relaxed flex-1">{tool.description}</p>

              {tool.link && (
                <div className="mt-6">
                  <Link
                    to={tool.link}
                    className="text-navy hover:text-navy-dark text-sm font-semibold transition-colors"
                  >
                    {tool.linkLabel}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
