import { useState } from 'react'

export default function CVSubmitForm({ role, onSubmit, loading }) {
  const [form, setForm] = useState({ name: '', email: '', cv: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (form.cv.trim().length < 100) e.cv = 'Please paste your full CV — at least a few lines'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit(form)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-navy-light border border-navy/20 rounded-full px-4 py-1.5 mb-5">
          <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
          <span className="text-muted text-sm">{role}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Submit Your CV</h2>
        <p className="text-muted text-sm">Paste your CV below. Our AI will screen it against the job requirements.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2 text-text">Full Name <span className="text-navy">*</span></label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-text">Email Address <span className="text-navy">*</span></label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-text">Paste Your CV <span className="text-navy">*</span></label>
          <p className="text-muted text-xs mb-2">Copy and paste the full text of your CV — work experience, skills, education, everything.</p>
          <textarea
            name="cv"
            value={form.cv}
            onChange={handleChange}
            placeholder="Paste your CV text here..."
            rows={12}
            className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm resize-none font-mono"
          />
          {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy hover:bg-navy-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
        >
          {loading ? 'Screening your CV...' : 'Screen My CV →'}
        </button>

        <p className="text-muted/60 text-xs text-center">Your CV is processed by AI and sent to the recruiter. It is not stored.</p>
      </form>
    </div>
  )
}
