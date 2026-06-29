import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a3a3a3 0%, transparent 70%)' }} />

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-navy text-sm font-semibold uppercase tracking-widest mb-4">Let's Talk</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">
            Looking for an AI PM
            <br />
            <span className="gradient-text">who actually builds?</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Open to AI PM roles, product consulting, and AI tool building projects.
            First conversation is always free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/kendale-rahul/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy font-semibold px-8 py-3.5 rounded-xl transition-all text-sm hover:bg-navy-dark glow-purple"
                style={{ color: '#000000' }}
            >
              📅 Book a 30-min Call
            </a>
            <a
              href="mailto:rahul@kenrahu.com"
              className="border border-border text-text hover:border-navy/50 font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              ✉️ rahul@kenrahu.com
            </a>
          </div>

          <p className="text-muted/50 text-xs mt-10">
            Also on{' '}
            <a
              href="https://www.linkedin.com/in/kendalerahul/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-navy transition-colors"
            >
              LinkedIn
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
