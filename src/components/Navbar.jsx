import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-navy font-bold text-lg tracking-tight">Rahul Kendale</span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-muted hover:text-text text-sm font-medium transition-colors">About</a>
          <a href="#tools" className="text-muted hover:text-text text-sm font-medium transition-colors">Tools</a>
          <a href="#skills" className="text-muted hover:text-text text-sm font-medium transition-colors">Skills</a>
          <a href="#contact" className="text-muted hover:text-text text-sm font-medium transition-colors">Contact</a>
          <Link to="/portfolio" className="text-muted hover:text-text text-sm font-medium transition-colors">Portfolio</Link>
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy hover:bg-navy-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-muted" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-4">
          <a href="#about" className="text-muted text-sm font-medium" onClick={() => setOpen(false)}>About</a>
          <a href="#tools" className="text-muted text-sm font-medium" onClick={() => setOpen(false)}>Tools</a>
          <a href="#skills" className="text-muted text-sm font-medium" onClick={() => setOpen(false)}>Skills</a>
          <a href="#contact" className="text-muted text-sm font-medium" onClick={() => setOpen(false)}>Contact</a>
          <Link to="/portfolio" className="text-muted text-sm font-medium" onClick={() => setOpen(false)}>Portfolio</Link>
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
