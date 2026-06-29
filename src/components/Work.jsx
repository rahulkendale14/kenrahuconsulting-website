import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const tools = [
  {
    title: 'Enterprise AI PRD Generator',
    description: 'Generate a 12-section enterprise AI PRD — stakeholder RACI, governance framework, measurement model, and operating model.',
    link: '/tools/prd-generator',
    tag: 'AI Tool',
    live: true,
  },
  {
    title: 'AI Use Case Prioritizer',
    description: 'Paste your AI ideas and get a scored, ranked matrix across 5 dimensions — business impact, effort, risk, data availability, and governance complexity.',
    link: '/tools/use-case-prioritizer',
    tag: 'AI Tool',
    live: true,
  },
  {
    title: 'AI Stakeholder RACI Builder',
    description: 'Describe your AI product and team structure. Get a complete RACI matrix across 5 activity categories.',
    link: '/tools/raci-builder',
    tag: 'AI Tool',
    live: true,
  },
  {
    title: 'AI Metrics Framework Generator',
    description: 'Describe your AI product and get a complete measurement model — north star metric, leading indicators, lagging KPIs, and reporting cadence.',
    link: '/tools/metrics-framework',
    tag: 'AI Tool',
    live: true,
  },
  {
    title: 'AI Governance Checklist Generator',
    description: 'Get a tailored governance checklist across all 5 layers — business, product, model, operational, and risk & compliance.',
    link: '/tools/governance-checklist',
    tag: 'AI Tool',
    live: true,
  },
  {
    title: 'AI Candidate Screener',
    description: 'Set your job criteria once. Share a link with candidates. AI screens every CV against your requirements automatically.',
    link: '/tools/cv-screening',
    tag: 'AI Tool',
    live: true,
  },
  {
    title: 'Salary Planning Assistant',
    description: 'Enter your monthly income and expenses. Get a clear allocation plan across 7 categories, a one-year goal check, and alternate scenarios if you\'re falling short.',
    link: '/tools/salary-planner',
    tag: 'AI Tool',
    live: true,
  },
  {
    title: 'Experience Calculator',
    description: 'Add each company you\'ve worked at and get your total experience instantly — broken down by years, months, and skill.',
    link: '/tools/experience-calculator',
    tag: 'Free Tool',
    live: true,
  },
]

const comingSoon = [
  {
    title: 'User Research Synthesizer',
    description: 'Paste interview transcripts and get synthesised themes, pain points, and opportunity areas — in minutes instead of days.',
    tag: 'AI Tool',
  },
  {
    title: 'Stakeholder Update Generator',
    description: 'Feed sprint data and metrics — get an exec-ready update in Slack, email, or slide format. Never write status updates from scratch again.',
    tag: 'AI Tool',
  },
  {
    title: 'Competitive Intelligence Pipeline',
    description: 'Input competitors — get a structured brief: features, pricing, positioning, and customer complaints. Re-run anytime for fresh data.',
    tag: 'AI Tool',
  },
  {
    title: 'PM Interview Coach',
    description: 'Feed your experience and a target JD. Get the best stories to tell per competency, STAR drafts, and specific gap analysis.',
    tag: 'AI Tool',
  },
]

const caseStudyItems = projects.map((p) => ({
  title: p.title,
  description: p.hero.problem,
  link: `/portfolio/${p.slug}`,
  tag: 'Case Study',
  live: true,
  impact: p.impact,
  duration: p.duration,
}))

const liveItems = [...caseStudyItems, ...tools]

const tagStyles = {
  'Case Study': 'bg-navy-light text-navy border-navy/20',
  'AI Tool': 'bg-navy-light text-navy border-navy/20',
  'Free Tool': 'bg-green-50 text-green-700 border-green-200',
}

export default function Work() {
  return (
    <section id="work" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-4">What I've Built</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">Work</h2>
          <p className="text-muted max-w-xl mx-auto">
            AI tools, automation builds, and case studies — everything shipped and live.
          </p>
        </div>

        {/* Live items grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {liveItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group bg-bg border border-navy/20 rounded-xl p-7 flex flex-col hover:border-navy/50 hover:shadow-md transition-all duration-300"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagStyles[item.tag] || 'bg-navy-light text-navy border-navy/20'}`}>
                  {item.tag}
                </span>
                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  Live
                </span>
              </div>

              {/* Content */}
              <h3 className="text-text text-base font-semibold mb-3 leading-snug group-hover:text-navy transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                {item.description}
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-navy font-medium">
                  {item.tag === 'Case Study' ? 'Read case study →' : 'Open tool →'}
                </span>
                {item.duration && (
                  <span className="text-xs text-muted">{item.duration}</span>
                )}
              </div>
            </Link>
          ))}

          {/* Coming Soon placeholders */}
          {comingSoon.map((item) => (
            <div
              key={item.title}
              className="bg-bg border border-border rounded-xl p-7 flex flex-col opacity-60 cursor-default"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-gray-50 text-gray-400 border-gray-200">
                  {item.tag}
                </span>
                <span className="text-xs font-medium text-muted">Coming Soon</span>
              </div>

              {/* Content */}
              <h3 className="text-text text-base font-semibold mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                {item.description}
              </p>

              <div className="mt-6">
                <span className="text-xs text-muted">In progress</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
