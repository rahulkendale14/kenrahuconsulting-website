export default function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer, selectedAnswer }) {
  const progress = (questionNumber / totalQuestions) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted text-sm">Question {questionNumber} of {totalQuestions}</span>
          <span className="text-accent text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-surface rounded-full">
          <div
            className="h-1.5 bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Category badge */}
      <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-6">
        <span className="text-accent text-xs font-medium">{question.category}</span>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold mb-8 leading-snug">{question.text}</h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
              selectedAnswer === option.value
                ? 'border-accent bg-accent/10 text-white'
                : 'border-[#2A2A2A] bg-surface hover:border-accent/40 text-muted hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                selectedAnswer === option.value ? 'border-accent bg-accent' : 'border-[#444]'
              }`}>
                {selectedAnswer === option.value && (
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
