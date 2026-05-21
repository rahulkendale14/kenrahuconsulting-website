import { useState } from 'react'

const INITIAL_FORM = {
  productName: '',
  oneLiner: '',
  problem: '',
  targetUser: '',
  goals: '',
  features: '',
  timeline: '3 months',
}

const FIELDS = [
  { key: 'productName', label: 'Product Name', type: 'input', placeholder: 'e.g. AI Readiness Quiz', required: true },
  { key: 'oneLiner', label: 'One-liner Description', type: 'input', placeholder: 'e.g. A quiz that helps businesses assess their AI readiness in 2 minutes', required: true },
  { key: 'problem', label: 'Problem Being Solved', type: 'textarea', placeholder: 'What pain point does this product address? Who experiences it and how often?', required: true },
  { key: 'targetUser', label: 'Target User', type: 'textarea', placeholder: 'Who is this for? Describe their role, goals, and frustrations.', required: true },
  { key: 'goals', label: 'Goals & Success Metrics', type: 'textarea', placeholder: 'What does success look like? Include specific metrics if possible.', required: true },
  { key: 'features', label: 'Must-have Features', type: 'textarea', placeholder: 'List your key features, one per line. Focus on must-haves only.', required: true },
]

export default function PRDForm({ onSubmit, error }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    FIELDS.forEach(field => {
      if (field.required && !form[field.key].trim()) {
        newErrors[field.key] = 'This field is required'
      }
    })
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(form)
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">Step 1 of 1</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Tell us about your product</h2>
          <p className="text-muted text-sm">The more detail you provide, the better your PRD will be.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {FIELDS.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-text mb-2">
                {field.label}
                {field.required && <span className="text-navy ml-1">*</span>}
              </label>
              {field.type === 'input' ? (
                <input
                  type="text"
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm"
                />
              ) : (
                <textarea
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm resize-none"
                />
              )}
              {errors[field.key] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Timeline <span className="text-navy">*</span>
            </label>
            <select
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text outline-none transition-colors text-sm"
            >
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base mt-2"
          >
            Generate My PRD →
          </button>

          <p className="text-muted/60 text-xs text-center">Your PRD will be ready in about 10 seconds</p>
        </form>
      </div>
    </div>
  )
}
