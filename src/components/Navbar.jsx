import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-border shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-bold text-lg tracking-tight gradient-text">Rahul Kendale</a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#about" className="text-muted hover:text-text text-sm font-medium transition-colors">About</a>
          <a href="/#work" className="text-muted hover:text-text text-sm font-medium transition-colors">Work</a>
          <a href="/#skills" className="text-muted hover:text-text text-sm font-medium transition-colors">Skills</a>
          <a href="/#contact" className="text-muted hover:text-text text-sm font-medium transition-colors">Contact</a>
          <Link to="/process" className="text-muted hover:text-text text-sm font-medium transition-colors">Process</Link>
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-dark transition-colors glow-purple"
            style={{ color: '#000000' }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-muted hover:text-text transition-colors" onClick={() => setOpen(!open)}>
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
        <div className="md:hidden border-t border-border glass px-6 py-4 flex flex-col gap-4">
          <a href="/#about" className="text-muted text-sm font-medium hover:text-text transition-colors" onClick={() => setOpen(false)}>About</a>
          <a href="/#work" className="text-muted text-sm font-medium hover:text-text transition-colors" onClick={() => setOpen(false)}>Work</a>
          <a href="/#skills" className="text-muted text-sm font-medium hover:text-text transition-colors" onClick={() => setOpen(false)}>Skills</a>
          <a href="/#contact" className="text-muted text-sm font-medium hover:text-text transition-colors" onClick={() => setOpen(false)}>Contact</a>
          <Link to="/process" className="text-muted text-sm font-medium hover:text-text transition-colors" onClick={() => setOpen(false)}>Process</Link>
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy text-sm font-semibold px-5 py-2.5 rounded-lg text-center hover:bg-navy-dark transition-colors"
            style={{ color: '#000000' }}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
