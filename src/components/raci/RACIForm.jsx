import { useState } from 'react'

const INDUSTRIES = [
  'Financial Services / Banking','Healthcare / Pharma','Insurance',
  'Retail / E-commerce','Manufacturing / Logistics','Technology / SaaS',
  'Professional Services','Education','Government / Public Sector','Other',
]
const ORG_SIZES = [
  { value: 'Startup', label: 'Startup', desc: 'Under 50 people — roles are consolidated, one person wears many hats' },
  { value: 'Scale-up', label: 'Scale-up', desc: '50–200 people — dedicated roles but lean teams' },
  { value: 'Enterprise', label: 'Enterprise', desc: '200+ people — full stakeholder landscape, specialised roles' },
]
const DEPLOY_STAGES = [
  { value: 'Proof of Concept', label: 'Proof of Concept', desc: 'Exploring feasibility, limited scope' },
  { value: 'Pilot', label: 'Pilot', desc: 'Real users, controlled rollout' },
  { value: 'Production', label: 'Production', desc: 'Fully deployed, active in operations' },
]
const DEPARTMENTS = [
  'Product','Engineering','Data / AI','Operations','Compliance / Legal',
  'Security','UX / Design','QA / Testing','Change Management','Business / Finance',
]

const INITIAL = {
  productName: '', productDescription: '', industry: '',
  orgSize: 'Enterprise', deploymentStage: 'Pilot',
  departments: ['Product','Engineering','Data / AI','Operations','Compliance / Legal'],
}

export default function RACIForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const toggleDept = (dept) => {
    setForm(prev => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.productName.trim()) errs.productName = 'Product name is required'
    if (!form.productDescription.trim()) errs.productDescription = 'A description is required'
    if (form.departments.length === 0) errs.departments = 'Select at least one department'
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
        <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">AI RACI Builder</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Describe your AI product & team</h2>
        <p className="text-muted text-sm">The more context you give, the more accurate the accountability mapping.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Product Name <span className="text-navy">*</span></label>
          <input type="text" name="productName" value={form.productName}
            onChange={e => set('productName', e.target.value)}
            placeholder="e.g. AI Production Defect Triage System"
            className={`w-full bg-surface border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm ${errors.productName ? 'border-red-400' : 'border-border'}`} />
          {errors.productName && <p className="text-red-600 text-xs mt-1">{errors.productName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">What does it do? <span className="text-navy">*</span></label>
          <p className="text-muted text-xs mb-2">Who uses it, what decisions does it make, what happens if it goes wrong?</p>
          <textarea name="productDescription" value={form.productDescription}
            onChange={e => set('productDescription', e.target.value)} rows={4}
            placeholder="e.g. Classifies production defects by severity and routes them to the right engineering team. Agents review AI suggestions before acting. Handles ~500 incidents/day for the operations team. Wrong classifications delay resolution by 2+ hours."
            className={`w-full bg-surface border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/40 outline-none transition-colors text-sm resize-none ${errors.productDescription ? 'border-red-400' : 'border-border'}`} />
          {errors.productDescription && <p className="text-red-600 text-xs mt-1">{errors.productDescription}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Industry</label>
          <select value={form.industry} onChange={e => set('industry', e.target.value)}
            className="w-full bg-surface border border-border focus:border-navy rounded-lg px-4 py-3 text-text outline-none transition-colors text-sm">
            <option value="">Select industry...</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">Organisation Size</label>
          <RadioGroup options={ORG_SIZES} field="orgSize" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">Deployment Stage</label>
          <RadioGroup options={DEPLOY_STAGES} field="deploymentStage" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Departments Involved <span className="text-navy">*</span></label>
          <p className="text-muted text-xs mb-3">Only include departments that actually have a stake in this product.</p>
          <div className="flex flex-wrap gap-2">
            {DEPARTMENTS.map(dept => {
              const active = form.departments.includes(dept)
              return (
                <button key={dept} type="button" onClick={() => toggleDept(dept)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${active ? 'border-navy bg-navy/5 text-navy' : 'border-border bg-surface text-muted hover:border-navy/40'}`}>
                  {dept}
                </button>
              )
            })}
          </div>
          {errors.departments && <p className="text-red-600 text-xs mt-2">{errors.departments}</p>}
        </div>

        <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base">
          Build My RACI Matrix →
        </button>
        <p className="text-muted/60 text-xs text-center">5 activity categories · 13 enterprise roles · Usually 15–20 seconds</p>
      </form>
    </div>
  )
}
