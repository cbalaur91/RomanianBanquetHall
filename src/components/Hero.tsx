import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen" aria-label="Welcome section">
      {/* Background with vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/SalaMare/3.JPG")',
        }}
        role="img"
        aria-label="Elegant banquet hall interior"
      >
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4">
          {/* Decorative line above title */}
          <div className="hero-title flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <div className="w-2 h-2 rotate-45 border border-gold" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-serif mb-6 tracking-wide">
            Romanian Banquet Hall
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl mb-10 text-white/90 font-light tracking-wide">
            Where Elegance Meets Celebration
          </p>

          <a
            href="#contact"
            onClick={scrollToContact}
            className="hero-cta btn-primary inline-block bg-gold px-10 py-4 text-black font-semibold rounded tracking-wider uppercase text-sm"
          >
            Book Your Event
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="scroll-indicator text-white/60 hover:text-gold transition-colors cursor-pointer">
          <ChevronDown size={32} />
        </div>
      </div>
    </section>
  );
}
