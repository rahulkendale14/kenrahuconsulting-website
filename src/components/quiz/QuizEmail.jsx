import { useState } from 'react'

export default function QuizEmail({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    onSubmit({ email, name })
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-3">Almost there!</h2>
      <p className="text-muted mb-8 leading-relaxed">
        Enter your details below to see your AI Readiness Score and personalised action plan.
      </p>

      <form onSubmit={handleSubmit} className="text-left space-y-4">
        <div>
          <label className="text-sm text-muted font-medium block mb-1.5">Your name</label>
          <input
            type="text"
            placeholder="Rahul Kendale"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-muted font-medium block mb-1.5">Work email *</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            required
            className="w-full bg-surface border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm"
          />
          {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-lg transition-colors mt-2"
        >
          See My Results →
        </button>

        <p className="text-muted/50 text-xs text-center">
          No spam ever. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
