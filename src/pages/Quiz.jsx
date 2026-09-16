import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuizStart from '../components/quiz/QuizStart'
import QuizQuestion from '../components/quiz/QuizQuestion'
import QuizEmail from '../components/quiz/QuizEmail'
import QuizResults from '../components/quiz/QuizResults'

const questions = [
  {
    id: 1,
    category: 'Strategy & Goals',
    text: 'How clearly has your business defined what problems AI should solve?',
    options: [
      { value: 0, label: 'We haven\'t thought about it yet' },
      { value: 25, label: 'We have vague ideas but nothing written down' },
      { value: 75, label: 'We have specific use cases identified' },
      { value: 100, label: 'We have documented AI goals tied to business KPIs' },
    ],
  },
  {
    id: 2,
    category: 'Data Readiness',
    text: 'How would you describe the quality and accessibility of your business data?',
    options: [
      { value: 0, label: 'Data is scattered across different tools with no structure' },
      { value: 25, label: 'Some data is organised but quality is inconsistent' },
      { value: 75, label: 'Most data is organised and reasonably clean' },
      { value: 100, label: 'Data is well-structured, clean, and centralised' },
    ],
  },
  {
    id: 3,
    category: 'Team Capability',
    text: 'What is your team\'s current level of AI literacy?',
    options: [
      { value: 0, label: 'Little to no AI knowledge across the team' },
      { value: 25, label: 'A few people are curious but no formal knowledge' },
      { value: 75, label: 'Several team members understand AI basics and use some tools' },
      { value: 100, label: 'Team actively uses AI tools and understands their capabilities' },
    ],
  },
  {
    id: 4,
    category: 'Technology Infrastructure',
    text: 'How modern and integrated is your current technology stack?',
    options: [
      { value: 0, label: 'Legacy systems, mostly manual processes' },
      { value: 25, label: 'Mix of old and new tools, limited integration' },
      { value: 75, label: 'Modern tools with some integration between systems' },
      { value: 100, label: 'Modern, well-integrated stack with APIs and automation' },
    ],
  },
  {
    id: 5,
    category: 'Leadership Buy-in',
    text: 'How does your leadership view AI investment?',
    options: [
      { value: 0, label: 'Sceptical or unaware of AI\'s potential' },
      { value: 25, label: 'Open to it but haven\'t prioritised it' },
      { value: 75, label: 'Supportive and willing to allocate some budget' },
      { value: 100, label: 'Actively championing AI as a strategic priority' },
    ],
  },
  {
    id: 6,
    category: 'Process Maturity',
    text: 'How well-documented and standardised are your core business processes?',
    options: [
      { value: 0, label: 'Mostly ad-hoc, people do things differently' },
      { value: 25, label: 'Some processes are documented but inconsistently followed' },
      { value: 75, label: 'Key processes are documented and generally followed' },
      { value: 100, label: 'Processes are fully documented, measured, and optimised' },
    ],
  },
  {
    id: 7,
    category: 'Budget & Resources',
    text: 'What budget are you prepared to allocate for AI tools and implementation?',
    options: [
      { value: 0, label: 'No budget allocated for AI currently' },
      { value: 25, label: 'Small budget for experiments (under $500/month)' },
      { value: 75, label: 'Meaningful budget for proven use cases ($500–$2k/month)' },
      { value: 100, label: 'Significant investment planned ($2k+/month or one-time project)' },
    ],
  },
  {
    id: 8,
    category: 'Current AI Usage',
    text: 'How much is your team currently using AI tools day-to-day?',
    options: [
      { value: 0, label: 'Not using any AI tools at all' },
      { value: 25, label: 'A few individuals using ChatGPT or similar occasionally' },
      { value: 75, label: 'Regular use of AI tools across multiple team members' },
      { value: 100, label: 'AI tools embedded into daily workflows and processes' },
    ],
  },
  {
    id: 9,
    category: 'Risk & Compliance',
    text: 'How prepared is your business for AI-related risks (data privacy, errors, compliance)?',
    options: [
      { value: 0, label: 'Not considered these risks yet' },
      { value: 25, label: 'Aware of risks but no framework in place' },
      { value: 75, label: 'Basic policies in place for data handling' },
      { value: 100, label: 'Comprehensive AI policy and risk framework documented' },
    ],
  },
  {
    id: 10,
    category: 'Measurement',
    text: 'How well do you currently measure the ROI of technology investments?',
    options: [
      { value: 0, label: 'We don\'t track ROI for tools we buy' },
      { value: 25, label: 'Informal sense of value but no formal tracking' },
      { value: 75, label: 'We track some metrics but not comprehensively' },
      { value: 100, label: 'Clear ROI metrics defined and reviewed regularly' },
    ],
  },
]

const STAGES = { start: 'start', question: 'question', email: 'email', results: 'results' }

export default function Quiz() {
  const [stage, setStage] = useState(STAGES.start)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [userData, setUserData] = useState({ name: '', email: '' })

  const currentQuestion = questions[currentIndex]

  const handleStart = () => {
    setStage(STAGES.question)
  }

  const handleAnswer = (value) => {
    setSelectedAnswer(value)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
    } else {
      setStage(STAGES.email)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setSelectedAnswer(answers[questions[prevIndex].id] ?? null)
    }
  }

  const handleEmailSubmit = ({ email, name }) => {
    setUserData({ email, name })
    setStage(STAGES.results)
  }

  const calculateScore = () => {
    const values = Object.values(answers)
    if (values.length === 0) return 0
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0F0F0F]/80 border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-white text-sm transition-colors">← Back to home</Link>
          {stage === STAGES.question && (
            <span className="text-muted text-sm">{currentIndex + 1} / {questions.length}</span>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {stage === STAGES.start && (
          <QuizStart onStart={handleStart} />
        )}

        {stage === STAGES.question && (
          <div>
            <QuizQuestion
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
            />
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className="text-muted hover:text-white text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-7 py-3 rounded-lg transition-colors text-sm"
              >
                {currentIndex === questions.length - 1 ? 'See Results →' : 'Next →'}
              </button>
            </div>
          </div>
        )}

        {stage === STAGES.email && (
          <QuizEmail onSubmit={handleEmailSubmit} />
        )}

        {stage === STAGES.results && (
          <QuizResults
            score={calculateScore()}
            name={userData.name}
            answers={answers}
          />
        )}
      </div>
    </div>
  )
}
