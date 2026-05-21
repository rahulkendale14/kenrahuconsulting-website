import { useState } from 'react'
import { Link } from 'react-router-dom'

function toYearsMonths(totalMonths) {
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12 }
}

function formatExp(years, months) {
  if (years === 0 && months === 0) return '0 months'
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`
  return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`
}

function aggregateSkills(companies) {
  const skillMap = {}
  companies.forEach(c => {
    c.skills.forEach(s => {
      const key = s.name.toLowerCase()
      if (!skillMap[key]) skillMap[key] = { name: s.name, months: 0 }
      skillMap[key].months += s.months
    })
  })
  return skillMap
}

function validateCompanyForm(name, years, months, skills, totalMonths) {
  if (!name) return 'Please enter a company name.'
  if (years < 0 || months < 0) return 'Years and months cannot be negative.'
  if (years === 0 && months === 0) return 'Please enter at least 1 month of experience.'
  if (months > 11) return 'Months should be 0–11. Add extra months as years instead.'
  const invalidSkill = skills.find(s => s.months < 0)
  if (invalidSkill) return `Skill months cannot be negative (check: ${invalidSkill.name}).`
  const totalSkillMonths = skills.reduce((sum, s) => sum + s.months, 0)
  if (skills.length > 0 && totalSkillMonths > totalMonths) {
    return `Total skill months (${totalSkillMonths}) can't exceed company experience (${totalMonths} months).`
  }
  return null
}

const emptySkill = () => ({ id: Date.now() + Math.random(), name: '', months: '' })

export default function ExperienceCalculator() {
  const [companies, setCompanies] = useState([])
  const [view, setView] = useState('form')

  const [companyName, setCompanyName] = useState('')
  const [expYears, setExpYears] = useState('')
  const [expMonths, setExpMonths] = useState('')
  const [skills, setSkills] = useState([emptySkill()])
  const [formError, setFormError] = useState('')

  function addSkillRow() {
    setSkills(prev => [...prev, emptySkill()])
  }

  function removeSkillRow(id) {
    setSkills(prev => {
      if (prev.length === 1) return [{ ...prev[0], name: '', months: '' }]
      return prev.filter(s => s.id !== id)
    })
  }

  function updateSkill(id, field, value) {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  function resetForm() {
    setCompanyName('')
    setExpYears('')
    setExpMonths('')
    setSkills([emptySkill()])
    setFormError('')
  }

  function handleAddCompany() {
    const name = companyName.trim()
    const years = parseInt(expYears) || 0
    const months = parseInt(expMonths) || 0
    const totalMonths = years * 12 + months
    const cleanSkills = skills
      .filter(s => s.name.trim() && parseInt(s.months) > 0)
      .map(s => ({ name: s.name.trim(), months: parseInt(s.months) }))

    const error = validateCompanyForm(name, years, months, cleanSkills, totalMonths)
    if (error) { setFormError(error); return }

    setCompanies(prev => [...prev, { name, totalMonths, skills: cleanSkills }])
    resetForm()
    setView('prompt')
  }

  function deleteCompany(index) {
    setCompanies(prev => {
      const next = prev.filter((_, i) => i !== index)
      if (next.length === 0) setView('form')
      return next
    })
  }

  function resetAll() {
    setCompanies([])
    resetForm()
    setView('form')
  }

  const totalMonths = companies.reduce((sum, c) => sum + c.totalMonths, 0)
  const { years: totalYears, months: totalMonthsRem } = toYearsMonths(totalMonths)
  const skillMap = aggregateSkills(companies)
  const sortedSkills = Object.values(skillMap).sort((a, b) => b.months - a.months)

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-text text-sm transition-colors">
            ← Back to home
          </Link>
          <span className="text-xs text-muted font-medium uppercase tracking-widest">Experience Calculator</span>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-10">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">Free Tool</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-3">Experience Calculator</h1>
          <p className="text-muted text-sm">
            Add each company you've worked at — get your total and skill-wise experience instantly.
          </p>
        </div>

        {companies.length > 0 && (
          <div className="mb-6 space-y-3">
            {companies.map((c, index) => {
              const { years, months } = toYearsMonths(c.totalMonths)
              return (
                <div key={index} className="bg-surface border border-border rounded-xl p-4 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-text text-sm">{c.name}</p>
                    <p className="text-muted text-xs mt-0.5">{formatExp(years, months)}</p>
                    {c.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {c.skills.map((s, i) => (
                          <span key={i} className="text-xs bg-navy-light text-navy border border-navy/20 px-2.5 py-0.5 rounded-full">
                            {s.name} — {s.months}m
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => deleteCompany(index)}
                    className="text-muted hover:text-red-500 text-sm ml-4 transition-colors flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {view === 'form' && (
          <div className="bg-surface border border-border rounded-xl p-7">
            <h2 className="text-base font-semibold text-navy mb-6 pb-4 border-b border-border">
              Add Company Experience
            </h2>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Infosys"
                className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-navy transition-colors"
              />
            </div>

            <div className="flex gap-4 mb-5">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Years</label>
                <input
                  type="number"
                  value={expYears}
                  onChange={e => setExpYears(e.target.value)}
                  min="0"
                  max="50"
                  placeholder="0"
                  className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-navy transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Months</label>
                <input
                  type="number"
                  value={expMonths}
                  onChange={e => setExpMonths(e.target.value)}
                  min="0"
                  max="11"
                  placeholder="0"
                  className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-navy transition-colors"
                />
              </div>
            </div>

            <div className="border-t border-border pt-5 mb-5">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
                Skills / Technologies Used
              </p>
              <div className="flex gap-3 mb-2 px-1">
                <span className="flex-[2] text-xs text-muted/60 font-semibold uppercase tracking-wider">Skill</span>
                <span className="flex-1 text-xs text-muted/60 font-semibold uppercase tracking-wider">Months</span>
                <span className="w-6" />
              </div>
              <div className="space-y-2.5">
                {skills.map(skill => (
                  <div key={skill.id} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={e => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="e.g. React, Python"
                      className="flex-[2] bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-navy transition-colors"
                    />
                    <input
                      type="number"
                      value={skill.months}
                      onChange={e => updateSkill(skill.id, 'months', e.target.value)}
                      min="0"
                      max="600"
                      placeholder="months"
                      className="flex-1 bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-navy transition-colors"
                    />
                    <button
                      onClick={() => removeSkillRow(skill.id)}
                      className="text-muted/50 hover:text-red-500 text-lg leading-none transition-colors w-6 text-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addSkillRow}
                className="mt-3 w-full border border-dashed border-navy/30 text-navy/70 hover:text-navy hover:border-navy/60 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                + Add Skill
              </button>
            </div>

            {formError && (
              <p className="text-red-500 text-sm mb-4">{formError}</p>
            )}

            <button
              onClick={handleAddCompany}
              className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Save This Company
            </button>
          </div>
        )}

        {view === 'prompt' && (
          <div className="bg-surface border border-border rounded-xl p-7 text-center">
            <p className="text-muted text-sm mb-6">Company added. Do you want to add another?</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setView('form')}
                className="bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                + Add Another Company
              </button>
              <button
                onClick={() => setView('results')}
                className="border border-navy text-navy hover:bg-navy/5 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                See My Results
              </button>
            </div>
          </div>
        )}

        {view === 'results' && (
          <div className="bg-surface border border-border rounded-xl p-7">
            <h2 className="text-base font-semibold text-navy mb-6 pb-4 border-b border-border">
              Your Experience Summary
            </h2>

            <div className="bg-gradient-to-br from-navy to-navy-dark rounded-xl p-6 text-center mb-6">
              <p className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-1">Total Experience</p>
              <p className="text-white text-3xl font-bold">{formatExp(totalYears, totalMonthsRem)}</p>
            </div>

            {sortedSkills.length > 0 && (
              <>
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Experience by Skill</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sortedSkills.map(skill => {
                    const sy = toYearsMonths(skill.months)
                    return (
                      <div key={skill.name} className="bg-bg border border-border rounded-xl p-4">
                        <p className="text-navy text-xs font-bold mb-1">{skill.name}</p>
                        <p className="text-text text-sm font-semibold">{formatExp(sy.years, sy.months)}</p>
                        <p className="text-muted/60 text-xs mt-0.5">{skill.months} month{skill.months !== 1 ? 's' : ''}</p>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={resetAll}
                className="border border-navy text-navy hover:bg-navy/5 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
