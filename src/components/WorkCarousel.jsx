import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const carouselItems = [
  {
    title: 'AI Candidate Screener',
    description: 'Set your criteria once. AI screens every CV against your requirements automatically — no manual reading needed.',
    tag: 'AI Tool',
    link: '/tools/cv-screening',
    gradient: 'from-violet-600 via-purple-700 to-indigo-800',
    accent: '#6c63ff',
    icon: '🤖',
    label: 'LIVE',
  },
  {
    title: 'Enterprise AI PRD Generator',
    description: 'Generate a 12-section enterprise AI PRD with stakeholder RACI, governance framework, and measurement model.',
    tag: 'AI Tool',
    link: '/tools/prd-generator',
    gradient: 'from-cyan-600 via-blue-700 to-indigo-800',
    accent: '#00d4ff',
    icon: '📋',
    label: 'LIVE',
  },
  {
    title: 'CV Screening Workflow',
    description: 'End-to-end AI hiring workflow — from intake to scored shortlist. Reduced screening time from 2 days to 20 minutes.',
    tag: 'Case Study',
    link: '/portfolio/cv-screening-workflow',
    gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
    accent: '#00d4aa',
    icon: '📁',
    label: 'CASE STUDY',
  },
  {
    title: 'AI Use Case Prioritizer',
    description: 'Score and rank AI ideas across 5 dimensions — business impact, effort, risk, data availability, governance.',
    tag: 'AI Tool',
    link: '/tools/use-case-prioritizer',
    gradient: 'from-orange-600 via-red-700 to-pink-800',
    accent: '#ff6b6b',
    icon: '📊',
    label: 'LIVE',
  },
  {
    title: 'Salary Planning Assistant',
    description: 'Enter income and expenses. Get a clear allocation plan across 7 categories with alternate scenarios.',
    tag: 'AI Tool',
    link: '/tools/salary-planner',
    gradient: 'from-yellow-500 via-amber-600 to-orange-700',
    accent: '#f59e0b',
    icon: '💰',
    label: 'LIVE',
  },
  {
    title: 'AI Metrics Framework Generator',
    description: 'Describe your AI product and get a complete measurement model — north star metric, leading indicators, and KPIs.',
    tag: 'AI Tool',
    link: '/tools/metrics-framework',
    gradient: 'from-pink-600 via-rose-700 to-red-800',
    accent: '#ec4899',
    icon: '📈',
    label: 'LIVE',
  },
  {
    title: 'Goal-Based Salary Planner',
    description: 'Salary planning tool that works backwards from your goals — reverse-engineers monthly savings targets.',
    tag: 'Case Study',
    link: '/portfolio/salary-planner',
    gradient: 'from-blue-600 via-indigo-700 to-violet-800',
    accent: '#818cf8',
    icon: '🎯',
    label: 'CASE STUDY',
  },
  {
    title: 'AI Governance Checklist',
    description: 'Tailored governance checklist across 5 layers — business, product, model, operational, risk & compliance.',
    tag: 'AI Tool',
    link: '/tools/governance-checklist',
    gradient: 'from-teal-600 via-green-700 to-emerald-800',
    accent: '#10b981',
    icon: '✅',
    label: 'LIVE',
  },
]

function PlaceholderScreenshot({ item }) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Grid lines overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Fake UI elements */}
      <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="flex-1 h-4 rounded bg-white/10 ml-2" />
      </div>
      <div className="absolute top-12 left-4 right-4 space-y-2">
        <div className="h-2 rounded bg-white/15 w-3/4" />
        <div className="h-2 rounded bg-white/10 w-1/2" />
      </div>
      {/* Center icon */}
      <div className="text-5xl mb-3 relative z-10" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}>
        {item.icon}
      </div>
      <p className="text-white/70 text-xs font-medium relative z-10">Screenshot coming soon</p>
      {/* Bottom bar */}
      <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
        <div className="h-2 rounded bg-white/15 w-full" />
        <div className="h-2 rounded bg-white/10 w-2/3" />
      </div>
    </div>
  )
}

export default function WorkCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef(null)
  const total = carouselItems.length

  const advance = (dir = 1) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + total) % total)
  }

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => advance(1), 4000)
    }
    return () => clearInterval(intervalRef.current)
  }, [paused, current])

  const prev = (current - 1 + total) % total
  const next = (current + 1) % total

  const tagStyles = {
    'Case Study': 'bg-navy-light text-navy border-navy/25',
    'AI Tool': 'bg-accent-light text-accent border-accent/25',
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards row */}
      <div className="flex items-center justify-center gap-4 px-4 py-6">

        {/* Prev card */}
        <motion.div
          key={`prev-${prev}`}
          initial={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
          animate={{ opacity: 0.45, x: 0, scale: 0.88 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:block w-64 flex-shrink-0 cursor-pointer"
          onClick={() => advance(-1)}
        >
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="h-36 w-full">
              <PlaceholderScreenshot item={carouselItems[prev]} />
            </div>
            <div className="p-4">
              <p className="text-text font-semibold text-sm leading-snug line-clamp-1">{carouselItems[prev].title}</p>
              <p className="text-muted text-xs mt-1 line-clamp-2">{carouselItems[prev].description}</p>
            </div>
          </div>
        </motion.div>

        {/* Featured center card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg flex-shrink-0"
          >
            <div className="bg-surface rounded-2xl overflow-hidden glow-purple"
              style={{ border: '1px solid rgba(108, 99, 255, 0.3)' }}
            >
              {/* Screenshot area */}
              <div className="h-56 w-full relative">
                <PlaceholderScreenshot item={carouselItems[current]} />
                {/* Label badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-black/50 text-white/90 backdrop-blur-sm border border-white/10">
                    {carouselItems[current].label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagStyles[carouselItems[current].tag] || 'bg-navy-light text-navy border-navy/20'}`}>
                    {carouselItems[current].tag}
                  </span>
                  <span className="text-xs text-muted">{current + 1} / {total}</span>
                </div>
                <h3 className="text-text text-lg font-bold mb-2 leading-snug">{carouselItems[current].title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-5">{carouselItems[current].description}</p>

                <Link
                  to={carouselItems[current].link}
                  className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-dark transition-colors"
                >
                  {carouselItems[current].tag === 'Case Study' ? 'Read case study' : 'Open tool'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next card */}
        <motion.div
          key={`next-${next}`}
          initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
          animate={{ opacity: 0.45, x: 0, scale: 0.88 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:block w-64 flex-shrink-0 cursor-pointer"
          onClick={() => advance(1)}
        >
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="h-36 w-full">
              <PlaceholderScreenshot item={carouselItems[next]} />
            </div>
            <div className="p-4">
              <p className="text-text font-semibold text-sm leading-snug line-clamp-1">{carouselItems[next].title}</p>
              <p className="text-muted text-xs mt-1 line-clamp-2">{carouselItems[next].description}</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => advance(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-text hover:border-navy/40 transition-all z-10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => advance(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-text hover:border-navy/40 transition-all z-10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2 pb-2">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className="transition-all duration-300"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === current ? '#6c63ff' : '#1e1e30',
            }}
          />
        ))}
      </div>
    </div>
  )
}
