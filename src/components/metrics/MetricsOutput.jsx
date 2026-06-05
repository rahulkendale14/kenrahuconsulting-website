import { useState } from 'react'

const AREA_COLORS = {
  'Business Impact':          { text: 'text-green-700',  bg: 'bg-green-50 border-green-200',  badge: 'bg-green-100 text-green-700' },
  'Operational Efficiency':   { text: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200',    badge: 'bg-blue-100 text-blue-700' },
  'Model Performance':        { text: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', badge: 'bg-purple-100 text-purple-700' },
  'User Adoption':            { text: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-700' },
  'Data Quality':             { text: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', badge: 'bg-yellow-100 text-yellow-700' },
  'Risk & Safety':            { text: 'text-red-700',    bg: 'bg-red-50 border-red-200',       badge: 'bg-red-100 text-red-700' },
  'Governance & Compliance':  { text: 'text-slate-700',  bg: 'bg-slate-50 border-slate-200',   badge: 'bg-slate-100 text-slate-700' },
  'Customer Experience':      { text: 'text-teal-700',   bg: 'bg-teal-50 border-teal-200',     badge: 'bg-teal-100 text-teal-700' },
  'Engineering Health':       { text: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200', badge: 'bg-indigo-100 text-indigo-700' },
}

const CADENCE_COLORS = {
  daily:     'bg-red-50 text-red-700 border-red-200',
  weekly:    'bg-blue-50 text-blue-700 border-blue-200',
  monthly:   'bg-purple-50 text-purple-700 border-purple-200',
  quarterly: 'bg-gray-50 text-gray-600 border-gray-200',
}

function AreaCard({ area }) {
  const [open, setOpen] = useState(false)
  const colors = AREA_COLORS[area.area] || { text: 'text-muted', bg: 'bg-surface border-border', badge: 'bg-bg text-muted' }
  return (
    <div className={`rounded-xl border overflow-hidden ${colors.bg}`}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:opacity-80 transition-opacity text-left">
        <div className="flex items-center gap-3">
          <h3 className={`text-sm font-semibold ${colors.text}`}>{area.area}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>{area.cadence}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-muted hidden sm:block">{area.owner}</span>
          <svg className={`w-4 h-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-current/10">
          <div className="pt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Leading Indicators</p>
              <ul className="space-y-2">
                {area.leadingIndicators?.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text">
                    <span className={`mt-0.5 font-bold ${colors.text}`}>→</span><span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Lagging KPIs</p>
              <ul className="space-y-2">
                {area.laggingKPIs?.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text">
                    <span className={`mt-0.5 font-bold ${colors.text}`}>◆</span><span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {area.dataSource && (
            <p className="text-xs text-muted mt-4 pt-3 border-t border-current/10">
              <span className="font-medium">Data source:</span> {area.dataSource}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function MetricsOutput({ result, formData, onRestart }) {
  const [copied, setCopied] = useState(false)

  const formatAsText = () => {
    let text = `AI Metrics Framework — ${formData.productName}\n${'='.repeat(60)}\n`
    text += `Objective: ${formData.businessObjective} | AI Type: ${formData.aiType} | Stage: ${formData.deploymentStage}\n`
    if (formData.industry) text += `Industry: ${formData.industry}\n`
    text += `\nNORTH STAR METRIC\n${'-'.repeat(40)}\n`
    text += `${result.northStar?.name}\n`
    text += `Definition: ${result.northStar?.definition}\n`
    text += `Target: ${result.northStar?.target} | Cadence: ${result.northStar?.cadence} | Owner: ${result.northStar?.owner}\n`
    text += `\nOVERVIEW\n${'-'.repeat(40)}\n${result.executiveSummary}\n`
    text += `\nREPORTING CADENCE\n${'-'.repeat(40)}\n`
    if (result.reportingCadence) {
      Object.entries(result.reportingCadence).forEach(([freq, items]) => {
        if (items?.length) text += `${freq.toUpperCase()}: ${items.join(', ')}\n`
      })
    }
    text += `\nMETRIC AREAS\n${'-'.repeat(40)}\n`
    result.metricAreas?.forEach(area => {
      text += `\n${area.area.toUpperCase()} — Owner: ${area.owner} | Cadence: ${area.cadence}\n`
      text += `Data source: ${area.dataSource}\n`
      text += `Leading: ${area.leadingIndicators?.join('; ')}\n`
      text += `Lagging: ${area.laggingKPIs?.join('; ')}\n`
    })
    text += `\nINSTRUMENTATION PRIORITIES\n${'-'.repeat(40)}\n`
    result.instrumentationPriorities?.forEach((p, i) => { text += `${i + 1}. ${p}\n` })
    text += `\nGenerated by kenrahuconsulting.com — AI Metrics Framework`
    return text
  }

  const handleCopy = () => { navigator.clipboard.writeText(formatAsText()); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-muted text-sm">{result.metricAreas?.length} metric areas · Leading + lagging split</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-1">Your Metrics Framework</h2>
          <p className="text-muted text-sm">{formData.productName} · {formData.deploymentStage} · {formData.businessObjective}</p>
        </div>

        <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 bg-surface border border-border hover:border-navy text-text font-medium py-3 rounded-lg transition-colors text-sm mb-6">
          {copied
            ? (<><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Copied!</>)
            : (<><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy Full Framework</>)
          }
        </button>

        <div className="bg-navy/5 border border-navy/20 rounded-xl p-5 mb-5">
          <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-2">North Star Metric</p>
          <p className="text-xl font-bold text-text mb-1">{result.northStar?.name}</p>
          <p className="text-sm text-muted mb-4">{result.northStar?.definition}</p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-navy/5 rounded-lg p-3">
              <p className="text-muted mb-1">Target</p>
              <p className="font-semibold text-text">{result.northStar?.target}</p>
            </div>
            <div className="bg-navy/5 rounded-lg p-3">
              <p className="text-muted mb-1">Cadence</p>
              <p className="font-semibold text-text">{result.northStar?.cadence}</p>
            </div>
            <div className="bg-navy/5 rounded-lg p-3">
              <p className="text-muted mb-1">Owner</p>
              <p className="font-semibold text-text">{result.northStar?.owner}</p>
            </div>
          </div>
          {result.northStar?.why && <p className="text-xs text-muted mt-3 italic border-t border-navy/10 pt-3">{result.northStar.why}</p>}
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 mb-5">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">Strategic Overview</p>
          <p className="text-sm text-text leading-relaxed">{result.executiveSummary}</p>
        </div>

        {result.reportingCadence && (
          <div className="bg-surface border border-border rounded-xl p-5 mb-5">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Reporting Cadence</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(result.reportingCadence).map(([freq, items]) => {
                if (!items?.length) return null
                return (
                  <div key={freq} className={`rounded-lg border p-3 ${CADENCE_COLORS[freq] || 'bg-bg border-border text-muted'}`}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2 capitalize">{freq}</p>
                    <ul className="space-y-1">
                      {items.map((item, i) => <li key={i} className="text-xs">{item}</li>)}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {result.instrumentationPriorities?.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-5 mb-5">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Instrument These First</p>
            <div className="space-y-2">
              {result.instrumentationPriorities.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-navy w-4 flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-text leading-snug">{p}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-2">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">All Metric Areas — click to expand</p>
          <div className="space-y-2">
            {result.metricAreas?.map((area, i) => <AreaCard key={i} area={area} />)}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div>
            <p className="text-text text-sm font-medium">Need help implementing this?</p>
            <p className="text-muted text-xs mt-0.5">I design metrics frameworks for enterprise AI programs.</p>
          </div>
          <a href="https://calendly.com/kendale-rahul/30min" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 bg-navy hover:bg-navy-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
            Book a Free Audit →
          </a>
        </div>

        <div className="text-center mt-8">
          <button onClick={onRestart} className="text-muted text-sm hover:text-text transition-colors">← Generate another framework</button>
        </div>
      </div>
    </div>
  )
}
