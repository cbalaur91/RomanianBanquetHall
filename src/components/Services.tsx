import { Section, SectionContent, SectionTitle } from './layout/Section';
import { SERVICES } from '../data/bookings';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Services() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <Section
      id="services"
      className="py-20 bg-gradient-warm"
      ariaLabel="Our services"
      animate={false}
    >
      <SectionContent>
        <SectionTitle>Our Services</SectionTitle>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${isVisible ? 'visible' : ''}`}
        >
          {SERVICES.map((service, index) => (
            <article
              key={index}
              className="service-card bg-warmGray-900/80 rounded-xl overflow-hidden border border-white/5"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-3 text-gold">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionContent>
    </Section>
  );
}
