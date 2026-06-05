import { useState } from 'react'
import { Link } from 'react-router-dom'
import RACIStart from '../components/raci/RACIStart'
import RACIForm from '../components/raci/RACIForm'
import RACILoading from '../components/raci/RACILoading'
import RACIPreview from '../components/raci/RACIPreview'
import RACIOutput from '../components/raci/RACIOutput'

const STAGES = { start: 'start', form: 'form', loading: 'loading', preview: 'preview', output: 'output' }

export default function RACIBuilder() {
  const [stage, setStage] = useState(STAGES.start)
  const [formData, setFormData] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFormSubmit = async (data) => {
    setFormData(data)
    setStage(STAGES.loading)
    setError('')

    try {
      const res = await fetch('/api/generate-raci', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Something went wrong.'); setStage(STAGES.form); return }
      setResult(json.result)
      setStage(STAGES.preview)
    } catch {
      setError('Network error. Please try again.')
      setStage(STAGES.form)
    }
  }

  const handleRestart = () => { setStage(STAGES.start); setFormData(null); setResult(null); setError('') }

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/80 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-text text-sm transition-colors">← Back to home</Link>
          <span className="text-muted text-xs">AI RACI Builder · Free</span>
        </div>
      </div>

      <div className="pt-16">
        {stage === STAGES.start && <RACIStart onStart={() => setStage(STAGES.form)} />}
        {stage === STAGES.form && (
          <div className="max-w-2xl mx-auto px-6 pt-12 pb-16">
            {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            <RACIForm onSubmit={handleFormSubmit} />
          </div>
        )}
        {stage === STAGES.loading && <RACILoading />}
        {stage === STAGES.preview && result && formData && (
          <RACIPreview result={result} formData={formData} onUnlock={() => setStage(STAGES.output)} />
        )}
        {stage === STAGES.output && result && formData && (
          <RACIOutput result={result} formData={formData} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}
