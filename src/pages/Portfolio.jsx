import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

export default function Portfolio() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-14">
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-3">Case Studies</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Work that shipped</h1>
          <p className="text-muted text-lg max-w-xl">
            Real AI implementations — the decisions made, the tradeoffs chosen, and what actually happened.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/portfolio/${project.slug}`}
              className="group block bg-surface border border-border rounded-xl p-7 hover:border-navy/40 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-navy-light text-navy border border-navy/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-navy transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed">{project.subtitle}</p>
                </div>

                <div className="flex md:flex-col gap-4 md:gap-2 md:items-end shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-muted mb-0.5">Impact</p>
                    <p className="text-sm font-semibold text-text">{project.impact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted mb-0.5">Duration</p>
                    <p className="text-sm font-semibold text-text">{project.duration}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-sm text-navy font-medium">
                Read case study
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 border border-dashed border-border rounded-xl p-7 text-center">
          <p className="text-muted text-sm">More case studies being written — new work added monthly.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
