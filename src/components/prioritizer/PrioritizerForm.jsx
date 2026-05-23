import { useState } from 'react'

const INDUSTRIES = ['Financial Services / Banking','Healthcare / Pharma','Retail / E-commerce','Manufacturing / Logistics','Technology / SaaS','Professional Services','Education','Government / Public Sector','Other']
const MATURITY_LEVELS = [
  { value: 'Early-stage', label: 'Early-stage', desc: 'No AI in production yet, exploring options' },
  { value: 'Developing', label: 'Developing', desc: 'One or two AI tools live, building capability' },
  { value: 'Advanced', label: 'Advanced', desc: 'Multiple AI systems in production, scaling' },
]
const INITIAL_FORM = { context: '', industry: '', maturity: 'Early-stage', useCases: '', constraints: '' }

export default function PrioritizerForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.useCases.trim()) { setErrors({ useCases: 'Please enter at least one use case' }); return }
    onSubmit(form)
  }

  const useCaseCount = form.useCases.trim().split('\n').filter(l => l.trim()).length

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">AI Use Case Prioritizer</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Tell us about your initiative</h2>
          <p className="text-muted text-sm">More context = sharper scores. The use cases field is all you really need.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">AI Use Cases to Evaluate <span className="text-navy">*</span></label>
            <p className="text-muted text-xs mb-2">One per line. Up to 8. Be specific — "Auto-classify support tickets by severity" not just "AI for support".</p>
            <textarea name="useCases" value={form.useCases} onChange={handleChange} rows={8}
              placeholder={`Auto-classify support tickets by severity\nGenerate weekly ops reports from raw data\nRoute customer complaints to the right team\nSurface similar past incidents during triage\nAI-assisted meeting notes and action items`}
              className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/40 outline-none transition-colors text-sm resize-none font-mono" />
            <div className="flex justify-between mt-1">
              {errors.useCases ? <p className="text-red-600 text-xs">{errors.useCases}</p> : <span />}
              <p className="text-muted/60 text-xs">{useCaseCount} use case{useCaseCount !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Company / Team Context <span className="text-muted font-normal text-xs">(optional)</span></label>
            <input type="text" name="context" value={form.context} onChange={handleChange}
              placeholder="e.g. 50-person fintech, 3-person ops team manually handling 200 tickets/day"
              className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Industry</label>
            <select name="industry" value={form.industry} onChange={handleChange}
              className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text outline-none transition-colors text-sm">
              <option value="">Select industry...</option>
              {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">AI Maturity Level</label>
            <div className="space-y-2">
              {MATURITY_LEVELS.map(level => {
                const selected = form.maturity === level.value
                return (
                  <button key={level.value} type="button" onClick={() => setForm(prev => ({ ...prev, maturity: level.value }))}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg border text-left transition-all ${selected ? 'border-navy bg-navy/5' : 'border-border bg-surface hover:border-navy/50'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-navy' : 'border-border'}`}>
                      {selected && <div className="w-2 h-2 rounded-full bg-navy" />}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-text">{level.label}</span>
                      <span className="text-sm text-muted"> — {level.desc}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Constraints <span className="text-muted font-normal text-xs">(optional)</span></label>
            <input type="text" name="constraints" value={form.constraints} onChange={handleChange}
              placeholder="e.g. 3-month timeline, limited engineering capacity, PCI DSS compliance required"
              className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
          </div>

          <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base">
            Score & Rank My Use Cases →
          </button>
          <p className="text-muted/60 text-xs text-center">Scores across 5 dimensions · Ranked by priority · Usually 15 seconds</p>
        </form>
      </div>
    </div>
  )
}
