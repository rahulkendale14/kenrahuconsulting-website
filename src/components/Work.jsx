import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

import imgPrd from '../assets/tools/prd-generator.jpg'
import imgPrioritizer from '../assets/tools/use-case-prioritizer.jpg'
import imgRaci from '../assets/tools/raci-builder.jpg'
import imgMetrics from '../assets/tools/metrics-framework.jpg'
import imgGovernance from '../assets/tools/governance-checklist.jpg'
import imgCvScreening from '../assets/tools/cv-screening.jpg'
import imgSalary from '../assets/tools/salary-planner.jpg'
import imgExp from '../assets/tools/experience-calculator.jpg'
import imgCsCv from '../assets/tools/cs-cv-screener.jpg'

const tools = [
  {
    title: 'Enterprise AI PRD Generator',
    description: 'Generate a 12-section enterprise AI PRD — stakeholder RACI, governance framework, measurement model, and operating model.',
    link: '/tools/prd-generator',
    tag: 'AI Tool',
    gradient: 'from-cyan-600 via-blue-700 to-indigo-800',
    icon: '📋',
    screenshot: imgPrd,
  },
  {
    title: 'AI Use Case Prioritizer',
    description: 'Paste your AI ideas and get a scored, ranked matrix across 5 dimensions — business impact, effort, risk, data availability, and governance complexity.',
    link: '/tools/use-case-prioritizer',
    tag: 'AI Tool',
    gradient: 'from-orange-500 via-red-600 to-pink-700',
    icon: '📊',
    screenshot: imgPrioritizer,
  },
  {
    title: 'AI Stakeholder RACI Builder',
    description: 'Describe your AI product and team structure. Get a complete RACI matrix across 5 activity categories.',
    link: '/tools/raci-builder',
    tag: 'AI Tool',
    gradient: 'from-violet-600 via-purple-700 to-indigo-800',
    icon: '🗂️',
    screenshot: imgRaci,
  },
  {
    title: 'AI Metrics Framework Generator',
    description: 'Describe your AI product and get a complete measurement model — north star metric, leading indicators, lagging KPIs, and reporting cadence.',
    link: '/tools/metrics-framework',
    tag: 'AI Tool',
    gradient: 'from-pink-500 via-rose-600 to-red-700',
    icon: '📈',
    screenshot: imgMetrics,
  },
  {
    title: 'AI Governance Checklist Generator',
    description: 'Get a tailored governance checklist across all 5 layers — business, product, model, operational, and risk & compliance.',
    link: '/tools/governance-checklist',
    tag: 'AI Tool',
    gradient: 'from-teal-500 via-green-600 to-emerald-700',
    icon: '✅',
    screenshot: imgGovernance,
  },
  {
    title: 'AI Candidate Screener',
    description: 'Set your job criteria once. Share a link with candidates. AI screens every CV against your requirements automatically.',
    link: '/tools/cv-screening',
    tag: 'AI Tool',
    gradient: 'from-indigo-500 via-violet-600 to-purple-700',
    icon: '🤖',
    screenshot: imgCvScreening,
  },
  {
    title: 'Salary Planning Assistant',
    description: 'Enter your monthly income and expenses. Get a clear allocation plan across 7 categories, a one-year goal check, and alternate scenarios.',
    link: '/tools/salary-planner',
    tag: 'AI Tool',
    gradient: 'from-yellow-500 via-amber-600 to-orange-700',
    icon: '💰',
    screenshot: imgSalary,
  },
  {
    title: 'Experience Calculator',
    description: 'Add each company you\'ve worked at and get your total experience instantly — broken down by years, months, and skill.',
    link: '/tools/experience-calculator',
    tag: 'Free Tool',
    gradient: 'from-slate-500 via-gray-600 to-zinc-700',
    icon: '🧮',
    screenshot: imgExp,
  },
]

const comingSoon = [
  { title: 'User Research Synthesizer', desc: 'Paste transcripts, get themes and pain points in minutes.', icon: '🔬' },
  { title: 'Stakeholder Update Generator', desc: 'Feed sprint data, get exec-ready update in any format.', icon: '📣' },
  { title: 'Competitive Intelligence Pipeline', desc: 'Input competitors, get a structured brief on demand.', icon: '🕵️' },
  { title: 'PM Interview Coach', desc: 'Feed your JD and experience. Get gap analysis and STAR drafts.', icon: '🎯' },
]

const caseStudyScreenshots = {
  'cv-screening-workflow': imgCsCv,
}

const caseStudyItems = projects.map((p) => ({
  title: p.title,
  description: p.hero.problem,
  link: `/portfolio/${p.slug}`,
  tag: 'Case Study',
  gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
  icon: '📁',
  isCaseStudy: true,
  screenshot: caseStudyScreenshots[p.slug] || null,
}))

const tagStyles = {
  'Case Study': { bg: 'rgba(255,255,255,0.07)', color: '#ffffff', border: 'rgba(255,255,255,0.18)' },
  'AI Tool':    { bg: 'rgba(255,255,255,0.07)', color: '#d4d4d4', border: 'rgba(255,255,255,0.15)' },
  'Free Tool':  { bg: 'rgba(115,115,115,0.10)', color: '#737373', border: 'rgba(115,115,115,0.18)' },
}

function PlaceholderThumb({ item }) {
  if (item.screenshot) {
    return (
      <img
        src={item.screenshot}
        alt={item.title}
        className="w-full h-full object-cover object-top"
      />
    )
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-3 left-3 flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/30" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
      <span className="text-3xl relative z-10 mb-1" style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.4))' }}>
        {item.icon}
      </span>
      <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
        <div className="h-1.5 rounded bg-white/20 w-3/4" />
        <div className="h-1.5 rounded bg-white/12 w-1/2" />
      </div>
    </div>
  )
}

function FlipCard({ item, index }) {
  const tagStyle = tagStyles[item.tag] || tagStyles['AI Tool']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="h-64"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT — thumbnail */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-surface border border-border flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Thumbnail area */}
          <div className="h-36 flex-shrink-0 relative">
            <PlaceholderThumb item={item} />
          </div>
          {/* Title */}
          <div className="flex-1 p-4 flex flex-col justify-between relative">
            <h3 className="text-text text-sm font-semibold leading-snug">{item.title}</h3>
            <div className="flex items-end justify-between mt-1">
              <p className="text-muted text-xs">Hover to explore →</p>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                style={{ background: tagStyle.bg, color: tagStyle.color, borderColor: tagStyle.border }}>
                {item.tag}
              </span>
            </div>
          </div>
        </div>

        {/* BACK — description + CTA */}
        <div
          className="absolute inset-0 rounded-xl p-5 flex flex-col justify-between border"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)',
            borderColor: tagStyle.border,
          }}
        >
          <div>
            <span className="text-xs font-semibold mb-3 inline-block"
              style={{ color: tagStyle.color }}>
              {item.tag}
            </span>
            <h3 className="text-text font-bold text-sm mb-2 leading-snug">{item.title}</h3>
            <p className="text-muted text-xs leading-relaxed line-clamp-4">{item.description}</p>
          </div>
          <Link
            to={item.link}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-colors w-fit"
            style={{ background: tagStyle.color, color: '#000000' }}
          >
            {item.isCaseStudy ? 'Read case study' : 'Open tool'}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const allLive = [...caseStudyItems, ...tools]

  return (
    <section id="work" className="py-24 px-6 bg-bg relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-4 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-4">What I've Built</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">Work</h2>
          <p className="text-muted max-w-xl mx-auto">
            AI tools, automation builds, and case studies — hover any card to explore.
          </p>
        </motion.div>

        {/* Live grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {allLive.map((item, i) => (
            <FlipCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted text-xs font-semibold uppercase tracking-widest text-center mb-5">In Progress</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {comingSoon.map((item) => (
              <div key={item.title} className="bg-bg border border-border rounded-xl p-4 opacity-50">
                <span className="text-xl mb-2 block">{item.icon}</span>
                <p className="text-text text-xs font-semibold mb-1">{item.title}</p>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                <p className="text-muted/40 text-xs mt-3">Coming soon</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
