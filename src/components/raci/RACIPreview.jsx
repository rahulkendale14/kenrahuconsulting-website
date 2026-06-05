import { useState } from 'react'

const RACI_STYLES = {
  R: 'bg-green-100 text-green-800 border-green-200 font-bold',
  A: 'bg-navy/10 text-navy border-navy/20 font-bold',
  C: 'bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold',
  I: 'bg-gray-100 text-gray-500 border-gray-200',
  '': 'text-transparent',
}

function RACIBadge({ code }) {
  if (!code) return <span className="inline-block w-7 h-7" />
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md border text-xs ${RACI_STYLES[code] || 'bg-gray-100 text-gray-400 border-gray-200'}`}>
      {code}
    </span>
  )
}

function RACITable({ category }) {
  if (!category?.activities?.length) return null
  const roles = Object.keys(category.activities[0]?.raci || {})
  const activeRoles = roles.filter(r => category.activities.some(a => a.raci?.[r]))

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-surface border-b border-border">
            <th className="text-left px-4 py-3 text-muted font-medium min-w-[200px]">Activity</th>
            {activeRoles.map(role => (
              <th key={role} className="px-2 py-3 text-center text-muted font-medium min-w-[90px] leading-tight">{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {category.activities.map((item, i) => (
            <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-bg' : 'bg-surface'}`}>
              <td className="px-4 py-3 text-text font-medium leading-snug">{item.activity}</td>
              {activeRoles.map(role => (
                <td key={role} className="px-2 py-3 text-center">
                  <RACIBadge code={item.raci?.[role] || ''} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function RACIPreview({ result, formData, onUnlock }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const visibleCats = result.categories?.slice(0, 2) || []
  const lockedCats = result.categories?.slice(2) || []

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address'); return }
    onUnlock({ name, email })
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-muted text-sm">Your RACI is ready — {result.roles?.length} roles · {result.categories?.length} activity categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">Here's a preview</h2>
          <p className="text-muted text-sm">{formData.productName} · {formData.orgSize} · {formData.deploymentStage}</p>
        </div>

        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          {[['R','Responsible','bg-green-100 text-green-800'],['A','Accountable','bg-navy/10 text-navy'],['C','Consulted','bg-yellow-100 text-yellow-800'],['I','Informed','bg-gray-100 text-gray-500']].map(([code, label, cls]) => (
            <span key={code} className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${cls}`}>
              <strong>{code}</strong> {label}
            </span>
          ))}
        </div>

        <div className="bg-navy/5 border border-navy/20 rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-2">Stakeholder Overview</p>
          <p className="text-sm text-text leading-relaxed">{result.summary}</p>
        </div>

        <div className="space-y-6 mb-6">
          {visibleCats.map((cat, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-navy/10 text-navy text-xs flex items-center justify-center font-bold">{i + 1}</span>
                {cat.category}
              </h3>
              <RACITable category={cat} />
            </div>
          ))}
        </div>

        {lockedCats.length > 0 && (
          <div className="relative">
            <div className="space-y-6 blur-sm pointer-events-none select-none">
              {lockedCats.map((cat, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-navy/10 text-navy text-xs flex items-center justify-center font-bold">{i + 3}</span>
                    {cat.category}
                  </h3>
                  <RACITable category={cat} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-bg/10 via-bg/85 to-bg rounded-xl px-6">
              <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md text-center shadow-lg">
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-text mb-1">Unlock the full matrix</h3>
                <p className="text-muted text-sm mb-5">{lockedCats.length} more categories — Product & Build, Governance & Risk, Operations & Go-Live + role cards and key insights</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }} required
                    className="w-full bg-bg border border-border focus:border-navy rounded-lg px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors text-sm" />
                  {error && <p className="text-red-600 text-xs text-left">{error}</p>}
                  <button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                    Unlock Full RACI →
                  </button>
                </form>
                <p className="text-muted/60 text-xs mt-3">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
