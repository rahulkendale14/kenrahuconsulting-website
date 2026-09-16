import { useState } from 'react'
import { Link } from 'react-router-dom'
import SetupForm from '../components/screening/SetupForm'
import SetupSuccess from '../components/screening/SetupSuccess'

export default function CVScreeningSetup() {
  const [stage, setStage] = useState('form')
  const [shareUrl, setShareUrl] = useState('')

  const handleGenerate = (config) => {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(config))))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    const url = `${window.location.origin}/tools/cv-screening/${encoded}`
    setShareUrl(url)
    setStage('success')
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-text text-sm transition-colors">← Back to home</Link>
          <span className="text-muted text-xs">AI Candidate Screener · Free</span>
        </div>
      </div>
      <div className="pt-16">
        {stage === 'form' && <SetupForm onGenerate={handleGenerate} />}
        {stage === 'success' && <SetupSuccess shareUrl={shareUrl} onReset={() => setStage('form')} />}
      </div>
    </div>
  )
}
