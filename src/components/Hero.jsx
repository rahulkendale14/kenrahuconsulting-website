export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block bg-navy-light text-navy text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          AI Product Manager
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
          Senior Product Manager
          <br />
          <span className="text-navy">building AI tools that ship.</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          17 years of product management. Now building at the intersection of AI and product —
          shipping real tools, solving real problems, and helping companies adopt AI the right way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#tools"
            className="bg-navy hover:bg-navy-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            View Tools I've Built
          </a>
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-navy text-navy hover:bg-navy-light font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Book a Call
          </a>
        </div>

        {/* Trust stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-border pt-10">
          <div>
            <p className="text-3xl font-bold text-navy">17+</p>
            <p className="text-muted text-xs mt-1">Years in Product</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-navy">5+</p>
            <p className="text-muted text-xs mt-1">AI Tools Shipped</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-navy">AI</p>
            <p className="text-muted text-xs mt-1">First Builder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
