import { useState } from 'react'

export default function SetupSuccess({ shareUrl, onReset }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-xl w-full text-center">
        <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">Your screening link is ready</h2>
        <p className="text-muted text-sm mb-8">
          Share this link with your candidates. Screening results will be emailed to you automatically.
        </p>

        <div className="bg-navy-light border border-navy/20 rounded-xl p-5 mb-4 text-left">
          <p className="text-xs text-muted mb-2 uppercase tracking-widest font-semibold">Candidate Link</p>
          <p className="text-sm text-navy break-all leading-relaxed">{shareUrl}</p>
        </div>

        <button
          onClick={handleCopy}
          className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base mb-4"
        >
          {copied ? '✓ Copied to Clipboard' : 'Copy Link'}
        </button>

        <button onClick={onReset} className="text-muted text-sm hover:text-text transition-colors">
          ← Create another screening
        </button>
      </div>
    </div>
  )
}
