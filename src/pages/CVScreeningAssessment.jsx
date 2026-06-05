import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CVSubmitForm from '../components/screening/CVSubmitForm'

function Spinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
      <div className="w-12 h-12 rounded-full border-4 border-surface border-t-accent animate-spin mb-6"></div>
      <p className="text-white font-medium">{message}</p>
      <p className="text-muted text-sm mt-2">This takes 10–15 seconds</p>
    </div>
  )
}

export default function CVScreeningAssessment() {
  const { config } = useParams()
  const [jobConfig, setJobConfig] = useState(null)
  const [stage, setStage] = useState('form')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const base64 = config.replace(/-/g, '+').replace(/_/g, '/')
      const decoded = JSON.parse(decodeURIComponent(escape(atob(base64))))
      setJobConfig(decoded)
    } catch {
      setError('This screening link is invalid or has expired.')
    }
  }, [config])

  const handleSubmit = async (candidate) => {
    setStage('loading')
    try {
      const res = await fetch('/api/screen-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobConfig, candidate }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      setStage('result')
    } catch (err) {
      setError(err.message || 'Failed to screen CV. Please try again.')
      setStage('form')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-400 text-lg font-medium mb-2">Invalid Link</p>
          <p className="text-muted text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!jobConfig) return null

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0F0F0F]/80 border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white text-sm font-medium">{jobConfig.role}</span>
          <span className="text-muted text-xs">Powered by kenrahu.com</span>
        </div>
      </div>

      <div className="pt-16">
        {stage === 'form' && (
          <CVSubmitForm role={jobConfig.role} onSubmit={handleSubmit} loading={false} />
        )}
        {stage === 'loading' && <Spinner message="Screening your CV against job requirements..." />}
        {stage === 'result' && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">CV Submitted</h2>
            <p className="text-muted text-sm max-w-sm">Your CV has been received and screened. The recruiter will be in touch if your profile is a match.</p>
          </div>
        )}
      </div>
    </div>
  )
}
