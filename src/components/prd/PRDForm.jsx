import { useState } from 'react'

const AUTOMATION_FUNCTIONS = [
  'Intake normalization',
  'AI summarization',
  'Similar-incident retrieval',
  'Priority recommendation',
  'Routing recommendation',
  'Root-cause hinting',
  'Meeting & update summaries',
  'Dashboard & report drafting',
]

const INITIAL_FORM = {
  productName: '',
  oneLiner: '',
  problem: '',
  targetUser: '',
  goals: '',
  automatedFunctions: [],
  complianceRequirements: '',
  timeline: '3 months',
}

const TEXT_FIELDS = [
  { key: 'productName', label: 'AI Feature / Product Name', type: 'input', placeholder: 'e.g. Production Defect Triage Automation', required: true },
  { key: 'oneLiner', label: 'One-liner Description', type: 'input', placeholder: 'e.g. AI-assisted triage that classifies, prioritises, and routes production defects automatically', required: false },
  { key: 'problem', label: 'Problem Being Solved', type: 'textarea', placeholder: 'What manual, high-volume pain point does this address? Who experiences it and how often?', required: true },
  { key: 'targetUser', label: 'Target Users', type: 'textarea', placeholder: 'Who are the primary users? e.g. Triage analysts, engineering managers, operations leads', required: true },
  { key: 'goals', label: 'Goals & Success Metrics', type: 'textarea', placeholder: 'What does success look like? e.g. Reduce MTTR by 40%, free up 20% analyst capacity, improve routing accuracy to 85%+', required: true },
  { key: 'complianceRequirements', label: 'Compliance & Regulatory Requirements', type: 'input', placeholder: 'e.g. PCI DSS, SOC 2, GDPR — or leave blank for standard enterprise controls', required: false },
]

export default function PRDForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleCheckbox = (fn) => {
    setForm(prev => ({
      ...prev,
      automatedFunctions: prev.automatedFunctions.includes(fn)
        ? prev.automatedFunctions.filter(f => f !== fn)
        : [...prev.automatedFunctions, fn],
    }))
  }

  const validate = () => {
    const newErrors = {}
    TEXT_FIELDS.forEach(field => {
      if (field.required && !form[field.key].trim()) newErrors[field.key] = 'This field is required'
    })
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    onSubmit(form)
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">Enterprise AI PRD Generator</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Tell us about your AI initiative</h2>
          <p className="text-muted text-sm">The more context you give, the more precise your PRD will be.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {TEXT_FIELDS.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-text mb-2">
                {field.label}{field.required && <span className="text-navy ml-1">*</span>}
              </label>
              {field.type === 'input' ? (
                <input type="text" name={field.key} value={form[field.key]} onChange={handleChange} placeholder={field.placeholder}
                  className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
              ) : (
                <textarea name={field.key} value={form[field.key]} onChange={handleChange} placeholder={field.placeholder} rows={3}
                  className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm resize-none" />
              )}
              {errors[field.key] && <p className="text-red-600 text-xs mt-1">{errors[field.key]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Functions to Automate <span className="text-muted font-normal text-xs">(select all that apply)</span>
            </label>
            <p className="text-muted text-xs mb-3">Leave blank and we'll infer from your problem statement.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AUTOMATION_FUNCTIONS.map(fn => {
                const selected = form.automatedFunctions.includes(fn)
                return (
                  <button key={fn} type="button" onClick={() => handleCheckbox(fn)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${selected ? 'border-navy bg-navy/5 text-text' : 'border-border bg-surface text-muted hover:border-navy/50 hover:text-text'}`}>
                    <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${selected ? 'bg-navy border-navy' : 'border-border'}`}>
                      {selected && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    {fn}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Timeline <span className="text-navy">*</span></label>
            <select name="timeline" value={form.timeline} onChange={handleChange}
              className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text outline-none transition-colors text-sm">
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base mt-2">
            Generate Enterprise PRD →
          </button>
          <p className="text-muted/60 text-xs text-center">12 sections — stakeholder RACI, governance, and measurement framework</p>
        </form>
      </div>
    </div>
  )
}
