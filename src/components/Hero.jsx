import rahulPhoto from '../assets/rahul.jpg'

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-navy-light text-navy text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              AI Product Manager
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
              Senior Product Manager
              <br />
              <span className="text-navy">building AI tools that ship.</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-10 max-w-xl">
              17 years of product management. Now building at the intersection of AI and product —
              shipping real tools, solving real problems, and helping companies adopt AI the right way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#tools"
                className="bg-gradient-to-r from-navy to-blue-600 hover:from-navy-dark hover:to-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm shadow-md hover:shadow-lg"
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

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm border-t border-border pt-8 mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-navy">17+</p>
                <p className="text-muted text-xs mt-1">Years in Product</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">5+</p>
                <p className="text-muted text-xs mt-1">AI Tools Shipped</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">AI</p>
                <p className="text-muted text-xs mt-1">First Builder</p>
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-4 border-navy-light shadow-xl">
              <img
                src={rahulPhoto}
                alt="Rahul Kendale — AI Product Manager"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
