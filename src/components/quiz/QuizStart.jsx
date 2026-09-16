export default function QuizStart({ onStart }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-surface border border-[#2A2A2A] rounded-full px-4 py-1.5 mb-8">
        <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
        <span className="text-muted text-sm">10 questions · 2 minutes</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
        AI Readiness
        <br />
        <span className="text-accent">Calculator</span>
      </h1>

      <p className="text-muted text-lg mb-10 leading-relaxed">
        Answer 10 quick questions to get your personalised AI Readiness Score (0–100)
        and a clear action plan for your business.
      </p>

      <div className="bg-surface border border-[#2A2A2A] rounded-xl p-6 mb-10 text-left space-y-4">
        {[
          { label: 'Your AI Readiness Score', desc: 'A score from 0–100 across 5 key dimensions' },
          { label: 'Readiness Level', desc: 'Beginner, Developing, Ready, or Advanced' },
          { label: 'Personalised Action Plan', desc: 'Specific next steps based on your results' },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{item.label}</p>
              <p className="text-muted text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="bg-accent hover:bg-accent-dark text-white font-semibold px-10 py-4 rounded-lg transition-colors text-base w-full sm:w-auto"
      >
        Start the Quiz →
      </button>

      <p className="text-muted/50 text-xs mt-4">Free · No credit card · Takes 2 minutes</p>
    </div>
  )
}
