import { forwardRef } from 'react';
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react';
import { Section, SectionContent, SectionTitle } from '../layout/Section';
import { ContactForm } from './ContactForm';
import { CONTACT_INFO } from '../../data/bookings';

const contactItems = [
  { icon: Phone, text: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}` },
  { icon: Mail, text: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: MapPin, text: CONTACT_INFO.address, href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}` },
  { icon: Clock, text: CONTACT_INFO.hours },
];

interface ContactProps {}

export const Contact = forwardRef<HTMLTextAreaElement, ContactProps>(
  function Contact(_, ref) {
    return (
      <Section
        id="contact"
        className="py-20 bg-warmGray-900"
        ariaLabel="Contact information"
      >
        <SectionContent>
          <SectionTitle>Contact Us</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-serif mb-8">Get in Touch</h3>

              <div className="space-y-5">
                {contactItems.map(({ icon: Icon, text, href }, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-4 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-300 hover:text-gold transition-colors"
                      >
                        {text}
                      </a>
                    ) : (
                      <span className="text-gray-300">{text}</span>
                    )}
                  </div>
                ))}

                {/* Facebook link */}
                <a
                  href={CONTACT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-4 group-hover:bg-gold/20 transition-colors">
                    <Facebook className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-gray-300 group-hover:text-gold transition-colors">
                    Follow us on Facebook
                  </span>
                </a>
              </div>

              {/* Decorative element */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ready to create unforgettable memories? Contact us today to schedule
                  a tour of our beautiful venue and discuss your event.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-serif mb-8">Send a Message</h3>
              <ContactForm ref={ref} />
            </div>
          </div>
        </SectionContent>
      </Section>
    );
  }
);
