export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-navy">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">Let's Talk</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Looking for an AI PM who builds?
        </h2>
        <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          I'm open to AI PM roles, product consulting, and AI tool building projects.
          First conversation is always free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-blue-50 text-navy font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            📅 Book a 30-min Call
          </a>
          <a
            href="mailto:rahul@kenrahu.com"
            className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            ✉️ rahul@kenrahu.com
          </a>
        </div>
        <p className="text-blue-200/60 text-xs mt-8">
          Also on{' '}
          <a
            href="https://www.linkedin.com/in/kendalerahul/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-white underline transition-colors"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  )
}
