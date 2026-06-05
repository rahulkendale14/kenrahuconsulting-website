import { useState } from 'react'

const INITIAL = {
  role: '',
  requirements: '',
  recruiterEmail: '',
  minExp: '',
  maxExp: '',
  requiredLocation: '',
  matchThreshold: '70',
}

function Field({ label, name, type = 'text', placeholder, value, onChange, error, hint }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-text">
        {label} <span className="text-navy">*</span>
      </label>
      {hint && <p className="text-muted text-xs mb-2">{hint}</p>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={type === 'number' ? 0 : undefined}
        className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default function SetupForm({ onGenerate }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.role.trim()) e.role = 'Required'
    if (!form.requirements.trim()) e.requirements = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.recruiterEmail)) e.recruiterEmail = 'Valid email required'
    if (!form.minExp) e.minExp = 'Required'
    if (!form.maxExp) e.maxExp = 'Required'
    if (form.minExp && form.maxExp && Number(form.minExp) > Number(form.maxExp)) e.maxExp = 'Max must be greater than min'
    if (!form.requiredLocation.trim()) e.requiredLocation = 'Required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onGenerate(form)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">Recruiter Setup</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Configure Your CV Screener</h2>
        <p className="text-muted text-sm">Set your criteria once. Share the link. AI screens every CV against your requirements.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Job Role" name="role" placeholder="e.g. Senior Product Manager" value={form.role} onChange={handleChange} error={errors.role} />

        <div>
          <label className="block text-sm font-medium mb-2 text-text">
            Job Requirements <span className="text-navy">*</span>
          </label>
          <p className="text-muted text-xs mb-2">List the key skills, qualifications, and experience you need. The AI uses this to evaluate each CV.</p>
          <textarea
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder={`e.g.\n- 3+ years of product management experience\n- Strong data analysis skills (SQL, Excel)\n- Experience with agile/scrum\n- B2B SaaS background preferred`}
            rows={6}
            className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm resize-none"
          />
          {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
        </div>

        <Field label="Your Email (to receive screening results)" name="recruiterEmail" type="email" placeholder="you@yourcompany.com" value={form.recruiterEmail} onChange={handleChange} error={errors.recruiterEmail} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Min Experience (years)" name="minExp" type="number" placeholder="e.g. 2" value={form.minExp} onChange={handleChange} error={errors.minExp} />
          <Field label="Max Experience (years)" name="maxExp" type="number" placeholder="e.g. 8" value={form.maxExp} onChange={handleChange} error={errors.maxExp} />
        </div>

        <Field label="Required Location" name="requiredLocation" placeholder="e.g. Mumbai, India" value={form.requiredLocation} onChange={handleChange} error={errors.requiredLocation} />

        <div>
          <label className="block text-sm font-medium mb-2 text-text">Minimum CV Match Score <span className="text-navy">*</span></label>
          <p className="text-muted text-xs mb-2">Candidates below this match score are automatically marked as not selected.</p>
          <select
            name="matchThreshold"
            value={form.matchThreshold}
            onChange={handleChange}
            className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text outline-none transition-colors text-sm"
          >
            {[50, 60, 70, 80, 90].map(p => (
              <option key={p} value={p}>{p}% — {p <= 60 ? 'Flexible' : p <= 70 ? 'Moderate' : p <= 80 ? 'Strict' : 'Very strict'}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base mt-2">
          Generate Shareable Link →
        </button>
      </form>
    </div>
  )
}
