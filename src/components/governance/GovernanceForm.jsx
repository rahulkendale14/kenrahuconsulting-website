import { useState } from 'react'

const INDUSTRIES = [
  'Financial Services / Banking', 'Healthcare / Pharma', 'Insurance',
  'Retail / E-commerce', 'Manufacturing / Logistics', 'Technology / SaaS',
  'Professional Services', 'Education', 'Government / Public Sector', 'Other',
]
const RISK_LEVELS = [
  { value: 'Low', label: 'Low', desc: 'Internal tool, no sensitive data, limited user impact' },
  { value: 'Medium', label: 'Medium', desc: 'Customer-facing or handles internal sensitive data' },
  { value: 'High', label: 'High', desc: 'Regulated data, automated decisions, or high user impact' },
]
const DATA_LEVELS = [
  { value: 'Public', label: 'Public', desc: 'No sensitive data involved' },
  { value: 'Internal', label: 'Internal', desc: 'Internal business data only' },
  { value: 'Confidential', label: 'Confidential', desc: 'Sensitive business or personal data' },
  { value: 'Regulated', label: 'Regulated', desc: 'PII, financial, health, or legally regulated data' },
]
const DEPLOY_STAGES = [
  { value: 'Proof of Concept', label: 'Proof of Concept', desc: 'Exploring feasibility, no production users' },
  { value: 'Pilot', label: 'Pilot', desc: 'Limited rollout with real users, validating approach' },
  { value: 'Production', label: 'Production', desc: 'Full deployment, actively used in operations' },
]

const INITIAL = {
  productName: '', productDescription: '', industry: '',
  riskLevel: 'Medium', dataSensitivity: 'Internal',
  deploymentStage: 'Pilot', complianceRequirements: '',
}

export default function GovernanceForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
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
        <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">AI Governance Checklist</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Describe your AI product</h2>
        <p className="text-muted text-sm">More detail = more tailored checklist. Risk level and deployment stage shape checklist depth.</p>
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
          <p className="text-muted text-xs mb-2">Who uses it, what decisions does it make or assist with, what happens if it's wrong?</p>
          <textarea name="productDescription" value={form.productDescription} onChange={handleChange} rows={4}
            placeholder="e.g. Classifies inbound support tickets by severity and routes them to the right team. Agents review AI suggestions before acting. Handles ~500 tickets/day for enterprise customers."
            className={`w-full bg-surface border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/40 outline-none transition-colors text-sm resize-none ${errors.productDescription ? 'border-red-400' : 'border-border'}`} />
          {errors.productDescription && <p className="text-red-600 text-xs mt-1">{errors.productDescription}</p>}
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
          <label className="block text-sm font-medium text-text mb-3">Risk Level</label>
          <RadioGroup options={RISK_LEVELS} field="riskLevel" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">Data Sensitivity</label>
          <RadioGroup options={DATA_LEVELS} field="dataSensitivity" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">Deployment Stage</label>
          <RadioGroup options={DEPLOY_STAGES} field="deploymentStage" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Compliance Requirements <span className="text-muted font-normal text-xs">(optional)</span></label>
          <input type="text" name="complianceRequirements" value={form.complianceRequirements} onChange={handleChange}
            placeholder="e.g. GDPR, PCI DSS, ISO 27001, SOC 2, HIPAA"
            className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
        </div>

        <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base">
          Generate My Governance Checklist →
        </button>
        <p className="text-muted/60 text-xs text-center">Depth scales to your risk level · Usually 15–20 seconds · Free</p>
      </form>
    </div>
  )
}
