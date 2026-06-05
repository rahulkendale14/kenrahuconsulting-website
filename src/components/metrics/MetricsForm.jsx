import { useState } from 'react'

const INDUSTRIES = [
  'Financial Services / Banking', 'Healthcare / Pharma', 'Insurance',
  'Retail / E-commerce', 'Manufacturing / Logistics', 'Technology / SaaS',
  'Professional Services', 'Education', 'Government / Public Sector', 'Other',
]
const OBJECTIVES = [
  { value: 'Cost Reduction', label: 'Cost Reduction', desc: 'Reduce operational costs through automation or efficiency gains' },
  { value: 'Revenue Growth', label: 'Revenue Growth', desc: 'Drive new revenue or accelerate existing revenue streams' },
  { value: 'Operational Efficiency', label: 'Operational Efficiency', desc: 'Speed up processes, reduce manual work, increase throughput' },
  { value: 'Risk Reduction', label: 'Risk Reduction', desc: 'Detect issues earlier, reduce errors, improve compliance' },
  { value: 'Customer Experience', label: 'Customer Experience', desc: 'Improve quality, speed, or satisfaction for end users' },
]
const AI_TYPES = [
  { value: 'Classification', label: 'Classification', desc: 'Categorises inputs — e.g. routing tickets, flagging anomalies' },
  { value: 'Generation', label: 'Generation', desc: 'Produces text, code, or content — e.g. summaries, drafts, reports' },
  { value: 'Recommendation', label: 'Recommendation', desc: 'Suggests next actions or personalises outputs' },
  { value: 'Prediction', label: 'Prediction', desc: 'Forecasts outcomes — e.g. churn, risk scores, demand' },
  { value: 'Automation', label: 'Automation', desc: 'Executes tasks end-to-end with minimal human input' },
]
const DEPLOY_STAGES = [
  { value: 'Proof of Concept', label: 'Proof of Concept', desc: 'Exploring feasibility — limited scope, no production users' },
  { value: 'Pilot', label: 'Pilot', desc: 'Real users, controlled rollout, validating approach' },
  { value: 'Production', label: 'Production', desc: 'Fully deployed, actively used in operations' },
]
const AUDIENCES = [
  { value: 'Executive / Board', label: 'Executive / Board' },
  { value: 'Product', label: 'Product' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Compliance', label: 'Compliance' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Data / AI Team', label: 'Data / AI Team' },
]

const INITIAL = {
  productName: '', productDescription: '', businessObjective: 'Operational Efficiency',
  aiType: 'Classification', industry: '', deploymentStage: 'Pilot', audienceRoles: ['Product', 'Engineering'],
}

export default function MetricsForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const toggleAudience = (val) => {
    setForm(prev => ({
      ...prev,
      audienceRoles: prev.audienceRoles.includes(val)
        ? prev.audienceRoles.filter(r => r !== val)
        : [...prev.audienceRoles, val],
    }))
  }

  const handleChange = (e) => set(e.target.name, e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.productName.trim()) errs.productName = 'Product name is required'
    if (!form.productDescription.trim()) errs.productDescription = 'A brief description is required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit(form)
  }

  const RadioGroup = ({ options, field }) => (
    <div className="space-y-2">
      {options.map(opt => {
        const selected = form[field] === opt.value
        return (
          <button key={opt.value} type="button" onClick={() => set(field, opt.value)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg border text-left transition-all ${selected ? 'border-navy bg-navy/5' : 'border-border bg-surface hover:border-navy/50'}`}>
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-navy' : 'border-border'}`}>
              {selected && <div className="w-2 h-2 rounded-full bg-navy" />}
            </div>
            <div>
              <span className="text-sm font-medium text-text">{opt.label}</span>
              <span className="text-sm text-muted"> — {opt.desc}</span>
            </div>
          </button>
        )
      })}
    </div>
  )

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">AI Metrics Framework</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Describe your AI product</h2>
        <p className="text-muted text-sm">The more context you give, the more tailored your metrics framework will be.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Product Name <span className="text-navy">*</span></label>
          <input type="text" name="productName" value={form.productName} onChange={handleChange}
            placeholder="e.g. AI Support Ticket Classifier"
            className={`w-full bg-surface border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm ${errors.productName ? 'border-red-400' : 'border-border'}`} />
          {errors.productName && <p className="text-red-600 text-xs mt-1">{errors.productName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">What does it do? <span className="text-navy">*</span></label>
          <p className="text-muted text-xs mb-2">Who uses it, what decisions does it make or assist with, what data does it use?</p>
          <textarea name="productDescription" value={form.productDescription} onChange={handleChange} rows={4}
            placeholder="e.g. Classifies inbound production defects by severity and routes them to the right engineering team. Agents review AI suggestions before acting. Handles ~500 defects/day. Uses structured incident data and historical resolution patterns."
            className={`w-full bg-surface border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/40 outline-none transition-colors text-sm resize-none ${errors.productDescription ? 'border-red-400' : 'border-border'}`} />
          {errors.productDescription && <p className="text-red-600 text-xs mt-1">{errors.productDescription}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">Primary Business Objective</label>
          <RadioGroup options={OBJECTIVES} field="businessObjective" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">Type of AI</label>
          <RadioGroup options={AI_TYPES} field="aiType" />
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
          <label className="block text-sm font-medium text-text mb-3">Deployment Stage</label>
          <RadioGroup options={DEPLOY_STAGES} field="deploymentStage" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Who will read these metrics?</label>
          <p className="text-muted text-xs mb-3">Select all that apply — this shapes how metrics are framed and what's prioritised.</p>
          <div className="flex flex-wrap gap-2">
            {AUDIENCES.map(a => {
              const active = form.audienceRoles.includes(a.value)
              return (
                <button key={a.value} type="button" onClick={() => toggleAudience(a.value)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${active ? 'border-navy bg-navy/5 text-navy' : 'border-border bg-surface text-muted hover:border-navy/40'}`}>
                  {a.label}
                </button>
              )
            })}
          </div>
        </div>

        <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base">
          Generate My Metrics Framework →
        </button>
        <p className="text-muted/60 text-xs text-center">9 metric areas · Leading + lagging split · Usually 15–20 seconds</p>
      </form>
    </div>
  )
}
