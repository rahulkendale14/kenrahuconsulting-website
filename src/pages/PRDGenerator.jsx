import { useState } from 'react'
import { Link } from 'react-router-dom'
import PRDStart from '../components/prd/PRDStart'
import PRDForm from '../components/prd/PRDForm'
import PRDLoading from '../components/prd/PRDLoading'
import PRDPreview from '../components/prd/PRDPreview'
import PRDOutput from '../components/prd/PRDOutput'

const STAGES = { start: 'start', form: 'form', loading: 'loading', preview: 'preview', output: 'output' }

export default function PRDGenerator() {
  const [stage, setStage] = useState(STAGES.start)
  const [formData, setFormData] = useState(null)
  const [prd, setPrd] = useState(null)
  const [error, setError] = useState('')

  const handleStart = () => setStage(STAGES.form)

  const handleFormSubmit = async (data) => {
    setFormData(data)
    setStage(STAGES.loading)
    setError('')

    try {
      const res = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Something went wrong. Please try again.')
        setStage(STAGES.form)
        return
      }

      setPrd(json.prd)
      setStage(STAGES.preview)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setStage(STAGES.form)
    }
  }

  const handleUnlock = () => setStage(STAGES.output)

  const handleRestart = () => {
    setStage(STAGES.start)
    setFormData(null)
    setPrd(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-text text-sm transition-colors">← Back to home</Link>
          <span className="text-muted text-xs font-medium">PRD Generator · Free</span>
          <div className="w-28" />
        </div>
      </div>

      <div className="pt-16">
        {stage === STAGES.start && <PRDStart onStart={handleStart} />}

        {stage === STAGES.form && (
          <PRDForm onSubmit={handleFormSubmit} error={error} />
        )}

        {stage === STAGES.loading && <PRDLoading />}

        {stage === STAGES.preview && prd && (
          <PRDPreview prd={prd} onUnlock={handleUnlock} />
        )}

        {stage === STAGES.output && prd && formData && (
          <PRDOutput prd={prd} formData={formData} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}
