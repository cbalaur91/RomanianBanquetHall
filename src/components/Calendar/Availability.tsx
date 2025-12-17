import { useState } from 'react';
import { Section, SectionContent, SectionTitle } from '../layout/Section';
import { BookingCalendar } from './BookingCalendar';

interface AvailabilityProps {
  messageRef: React.RefObject<HTMLTextAreaElement>;
}

export function Availability({ messageRef }: AvailabilityProps) {
  // Shared calendar state for synchronized navigation
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateSelect = (message: string) => {
    if (messageRef.current) {
      messageRef.current.value = message;
      // Smooth scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Focus the textarea after scrolling
        setTimeout(() => {
          messageRef.current?.focus();
        }, 800);
      }
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section className="py-20 bg-gradient-radial" ariaLabel="Check venue availability">
      <SectionContent>
        <SectionTitle>Check Availability</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <BookingCalendar
            hallName="Grand Ballroom"
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onDateSelect={handleDateSelect}
          />
          <BookingCalendar
            hallName="Chateau Hall"
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">
            Click on an available date to start your booking inquiry.
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="btn-primary inline-block bg-gold text-black px-8 py-3 rounded font-semibold tracking-wide"
          >
            Contact Us
          </a>
        </div>
      </SectionContent>
    </Section>
  );
}
