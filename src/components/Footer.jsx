export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">
          © 2026 <span className="gradient-text font-semibold">Rahul Kendale</span> · kenrahuconsulting.com
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/kendalerahul/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-navy text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://kenrahu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-navy text-sm transition-colors"
          >
            kenrahu.com
          </a>
          <span className="text-muted/40 text-xs">Built with AI</span>
        </div>
      </div>
    </footer>
  )
}
