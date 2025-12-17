import { Clock, MapPin, Mail } from 'lucide-react';
import { Section, SectionContent, SectionTitle } from './layout/Section';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  { icon: Clock, text: 'Flexible scheduling options' },
  { icon: MapPin, text: 'Convenient central location' },
  { icon: Mail, text: 'Professional event planning assistance' },
];

export function About() {
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <Section
      id="about"
      className="py-20 bg-gradient-warm"
      ariaLabel="About our venue"
      animate={false}
    >
      <SectionContent>
        <SectionTitle>About Our Venue</SectionTitle>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className={`section-animate ${imageVisible ? 'visible' : ''}`}
          >
            <div className="relative">
              <img
                src="/images/SalaMare/4.JPG"
                alt="Romanian Banquet Hall interior showcasing elegant decor"
                loading="lazy"
                className="rounded-xl shadow-2xl w-full"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 rounded-xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`space-y-6 section-animate ${contentVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '150ms' }}
          >
            <p className="text-lg text-gray-200 leading-relaxed">
              Located in Warren, MI, Romanian Banquet Hall offers an elegant and
              sophisticated venue for your special events. With over 20 years of
              experience, we've hosted countless weddings, corporate events, and
              celebrations.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Our venue features crystal chandeliers, marble floors, and
              state-of-the-art amenities to ensure your event is nothing short of
              perfect.
            </p>

            <ul className="space-y-4 pt-4">
              {features.map(({ icon: Icon, text }, index) => (
                <li
                  key={index}
                  className="flex items-center group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-gray-200">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContent>
    </Section>
  );
}
