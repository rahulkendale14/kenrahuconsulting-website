import { Link } from 'react-router-dom'

export default function CandidateSubmissionWriter() {
  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Header */}
      <div className="border-b border-[#2A2A2A] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-white text-sm transition-colors">
            ← Back to kenrahu.com
          </Link>
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Book a Call
          </a>
        </div>
      </div>

      {/* Title */}
      <div className="px-6 py-10 text-center border-b border-[#2A2A2A]">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Free Tool</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Candidate Submission Writer</h1>
        <p className="text-muted max-w-xl mx-auto text-sm leading-relaxed">
          Recruiters spend 25 minutes writing every candidate submission. Paste a CV and job description
          below and get a client-ready submission writeup and email draft in 10 seconds.
        </p>
      </div>

      {/* Iframe */}
      <div className="w-full" style={{ height: 'calc(100vh - 220px)', minHeight: '700px' }}>
        <iframe
          src="https://candidate-submission-writer-bbrevkg89fnv4j9kyqhk3e.streamlit.app/?embedded=true"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Candidate Submission Writer"
        />
      </div>
    </div>
  )
}
