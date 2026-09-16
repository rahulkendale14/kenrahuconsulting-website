import { Link } from 'react-router-dom'

const levels = [
  {
    min: 0,
    max: 24,
    label: 'AI Beginner',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20',
    description: 'Your business is in the early stages of AI awareness. That\'s completely fine — most businesses are here. The key is building the right foundations before investing in tools.',
    actions: [
      'Define 1–2 specific business problems AI could solve',
      'Audit your current data collection and quality',
      'Educate your team on AI basics (free resources available)',
      'Book a free discovery call to map your starting point',
    ],
  },
  {
    min: 25,
    max: 49,
    label: 'Developing',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    description: 'You have some AI awareness and have started exploring, but there are key gaps to address. With the right strategy, you could be AI-ready within 3–6 months.',
    actions: [
      'Document and clean your existing data assets',
      'Identify quick-win AI use cases for your core workflows',
      'Run a pilot with one low-risk AI tool',
      'Create an AI policy for your team',
    ],
  },
  {
    min: 50,
    max: 74,
    label: 'AI Ready',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    description: 'Strong foundation. You have the people, data, and processes in place to adopt AI successfully. Now it\'s about choosing the right tools and scaling systematically.',
    actions: [
      'Prioritise your top 3 AI initiatives by ROI',
      'Build an AI roadmap with clear owners and timelines',
      'Invest in team upskilling for AI tools you plan to use',
      'Set up measurement frameworks to track AI impact',
    ],
  },
  {
    min: 75,
    max: 100,
    label: 'AI Advanced',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    description: 'You\'re ahead of the curve. Your business is well-positioned to leverage AI for competitive advantage. Focus on scaling what works and staying ahead of the curve.',
    actions: [
      'Scale proven AI use cases across teams',
      'Explore custom AI model fine-tuning for your data',
      'Build AI into your product or service offering',
      'Share AI best practices externally to build authority',
    ],
  },
]

function getLevel(score) {
  return levels.find((l) => score >= l.min && score <= l.max) || levels[0]
}

function ScoreRing({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#2A2A2A" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#6366F1"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold text-white">{score}</p>
        <p className="text-xs text-muted">/ 100</p>
      </div>
    </div>
  )
}

export default function QuizResults({ score, name }) {
  const level = getLevel(score)

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score header */}
      <div className="text-center mb-12">
        <p className="text-muted text-sm mb-6">
          {name ? `${name}'s ` : 'Your '}AI Readiness Score
        </p>

        <ScoreRing score={score} />

        <div className={`inline-flex items-center gap-2 ${level.bgColor} border ${level.borderColor} rounded-full px-4 py-1.5 mt-5`}>
          <span className={`w-2 h-2 rounded-full ${level.color.replace('text-', 'bg-')} inline-block`}></span>
          <span className={`${level.color} text-sm font-semibold`}>{level.label}</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-surface border border-[#2A2A2A] rounded-xl p-6 mb-6">
        <h3 className="font-semibold mb-3">What this means</h3>
        <p className="text-muted text-sm leading-relaxed">{level.description}</p>
      </div>

      {/* Action plan */}
      <div className="bg-surface border border-[#2A2A2A] rounded-xl p-6 mb-8">
        <h3 className="font-semibold mb-4">Your Action Plan</h3>
        <div className="space-y-3">
          {level.actions.map((action, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mt-0.5">
                <span className="text-accent text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 text-center">
        <h3 className="font-semibold mb-2">Want a deeper analysis?</h3>
        <p className="text-muted text-sm mb-5">
          Book a free 30-minute call to walk through your results and get a personalised roadmap.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Book a Free Call
          </a>
          <Link
            to="/"
            className="border border-[#2A2A2A] hover:border-accent text-muted hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
