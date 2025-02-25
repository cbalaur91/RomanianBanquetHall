import React from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, Facebook } from 'lucide-react';
import { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

// =============================================
// BOOKING MANAGEMENT
// =============================================
// Add booked dates below. Format: day of the month (1-31)
// Example: [1, 15, 30] means the 1st, 15th, and 30th of the month are booked

const BOOKED_DATES = {
  // Grand Hall bookings
  grandBallroom: {
    // Format: { month: [dates] }
    // Example: 
    // 3: [1, 15, 30],  // March
    // 4: [5, 20],      // April
  // 4: [5, 20],      // April 2024
  // 12: [24, 25, 31] // December 2024
  // Format for future years:
  // 2025: {
  //   1: [1, 15],    // January 2025
  //   12: [24, 25]   // December 2025
  // }
    2025: {
      2: [22, 23]
    }
  },
  
  // Elegant Hall bookings
  chateauHall: {
    // Format: { month: [dates] }
    // Example:
    // 3: [10, 25],     // March 2024
    // 4: [1, 2, 3],    // April 2024
    // Format for future years:
    // 2025: {
    //   1: [1, 15],    // January 2025
    //   12: [24, 25]   // December 2025
    // }
    2: [23]
  }
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number, hall: string) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const message = `Hello,\n\nI am interested in booking the ${hall} for ${formattedDate}. Could you please provide me with information about:\n\n1. Availability for this date\n2. Pricing and packages available\n3. Required deposit and payment terms\n\nThank you for your assistance.\n\nBest regards`;
    
    if (messageRef.current) {
      messageRef.current.value = message;
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + increment));
  };

  const getBookedDatesForMonth = (hallName: string, month: number): number[] => {
    const year = currentDate.getFullYear();
    const hall = hallName === 'Grand Ballroom' ? BOOKED_DATES.grandBallroom : BOOKED_DATES.chateauHall;
    
    // Always check the year-based format first
    if (hall[year]?.[month + 1]) {
      return hall[year][month + 1];
    }
    
    // Fallback to old format
    return hall[month + 1] || [];
  };

  const renderCalendar = (hallName: string) => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const bookedDates = getBookedDatesForMonth(hallName, currentDate.getMonth());
    const days = Array.from({ length: 42 }, (_, i) => {
      const day = i - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });

    return (
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-2xl font-serif mb-6 text-center">{hallName}</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeMonth(-1)}
              className="text-gold hover:text-gold/80 transition-colors"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-2">
              <select
                value={currentDate.getMonth()}
                onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value), 1))}
                className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              <select
                value={currentDate.getFullYear()}
                onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth(), 1))}
                className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1"
              >
                {Array.from({ length: 27 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="text-gold hover:text-gold/80 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
              {day}
            </div>
          ))}
          {days.map((day, i) => (
            <div
              key={i}
              className={`
                aspect-square flex items-center justify-center rounded-md text-sm
                ${!day ? 'invisible' : ''}
                ${day && bookedDates.includes(day)
                  ? 'bg-red-900/50 text-red-200 cursor-not-allowed'
                  : day
                    ? 'bg-gray-800 hover:bg-gold hover:text-black cursor-pointer transition-colors'
                    : ''
                }
              `}
              onClick={() => day && !bookedDates.includes(day) && handleDateClick(day, hallName)}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-900/50 rounded-sm"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-warmGray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-warmGray-900/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0" aria-label="Romanian Banquet Hall Logo">
              <h1 className="text-2xl font-serif">
                <a 
                  href="#home" 
                  className="hover:text-gold transition-colors cursor-pointer"
                  aria-label="Back to top"
                >
                  Romanian Banquet Hall
                </a>
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:block" aria-label="Main navigation">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#home" className="hover:text-gold transition-colors">Home</a>
                <a href="#about" className="hover:text-gold transition-colors">About</a>
                <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
                <a href="#services" className="hover:text-gold transition-colors">Services</a>
                <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-800"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-black/95" aria-label="Mobile navigation">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Home</a>
              <a href="#about" className="block px-3 py-2 hover:bg-gray-800 rounded-md">About</a>
              <a href="#gallery" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Gallery</a>
              <a href="#services" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Services</a>
              <a href="#contact" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Contact</a>
            </div>
          </nav>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen" aria-label="Welcome section">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/SalaMare/3.JPG")',
          }}
          role="img"
          aria-label="Elegant banquet hall interior"
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Welcome to Romanian Banquet Hall</h1>
            <p className="text-xl md:text-2xl mb-8">Create unforgettable memories in our elegant venue</p>
            <a 
              href="#contact"
              className="inline-block bg-gold px-8 py-3 text-black font-semibold rounded-md hover:bg-gold/90 transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-warm" aria-label="About our venue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">About Our Venue</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/SalaMare/4.JPG"
                alt="Banquet hall interior"
                loading="lazy"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg">
                Located in Warren, Mi, Romanian Banquet Hall offers an elegant and sophisticated venue for your special events. With over 20 years of experience, we've hosted countless weddings, corporate events, and celebrations.
              </p>
              <p className="text-lg">
                Our venue features crystal chandeliers, marble floors, and state-of-the-art amenities to ensure your event is nothing short of perfect.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Clock className="w-6 h-6 text-gold mr-3" />
                  <span>Flexible scheduling options</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-6 h-6 text-gold mr-3" />
                  <span>Convenient central location</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-6 h-6 text-gold mr-3" />
                  <span>Professional event planning assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-warmGray-900" aria-label="Venue gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">Our Venues</h2>
          
          {/* Grand Hall */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-serif mb-4">Grand Ballroom</h3>
              <p className="text-xl text-gray-300">Capacity up to 450 guests</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "/images/SalaMare/5.JPG",
                "/images/SalaMare/6.JPG",
                "/images/SalaMare/7.JPG",
                "/images/SalaMare/8.JPG",
                "/images/SalaMare/9.JPG",
                "/images/SalaMare/14.JPG"
              ].map((url, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={`${url}?auto=format&fit=crop&w=800&q=80`}
                    alt={`Grand Hall image ${index + 1}`}
                    loading="lazy"
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-gray-300">
              <p>Perfect for large weddings, corporate galas, and grand celebrations</p>
              <p>Features crystal chandeliers and spacious dance floor</p>
            </div>
          </div>
          
          {/* Elegant Hall */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-serif mb-4">Chateau Hall</h3>
              <p className="text-xl text-gray-300">Capacity up to 150 guests</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "/images/SalaMica/1.JPG",
                "/images/SalaMica/2.JPG",
                "/images/SalaMica/3.JPG",
                "/images/SalaMica/18.jpg",
                "/images/SalaMica/5.JPG",
                "/images/SalaMica/8.JPG"
              ].map((url, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={`${url}?auto=format&fit=crop&w=800&q=80`}
                    alt={`Elegant Hall image ${index + 1}`}
                    loading="lazy"
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-gray-300">
              <p>Ideal for intimate weddings, corporate events, and private celebrations</p>
              <p>Features elegant decor and private bar</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Calendar Section */}
      <section className="py-20 bg-gradient-radial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Check Availability
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {renderCalendar('Grand Ballroom')}
            {renderCalendar('Chateau Hall')}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              To book a date or check specific availability, please contact us directly.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-gold text-black px-8 py-3 rounded-md font-semibold hover:bg-gold/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-warm" aria-label="Our services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Weddings",
                description: "Make your special day unforgettable in our elegant venue with comprehensive wedding packages.",
                image: "/images/SalaMare/15.JPG"
              },
              {
                title: "Corporate Events",
                description: "Professional atmosphere for your business meetings, conferences, and corporate celebrations.",
                image: "/images/SalaMica/17.jpg"
              },
              {
                title: "Private Parties",
                description: "Perfect setting for birthdays, anniversaries, and other special celebrations.",
                image: "/images/SalaMica/12.JPG"
              }
            ].map((service, index) => (
              <div key={index} className="bg-warmGray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-gold/20 transition-shadow">
                <img 
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-warmGray-900" aria-label="Contact information">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <p className="flex items-center">
                  <Phone className="w-6 h-6 text-gold mr-3" />
                  <span>(586) 565-0119</span>
                </p>
                <p className="flex items-center">
                  <Mail className="w-6 h-6 text-gold mr-3" />
                  <span>eventrbh@yahoo.com</span>
                </p>
                <p className="flex items-center">
                  <MapPin className="w-6 h-6 text-gold mr-3" />
                  <span>31500 Ryan Rd, Warren, MI, 48092</span>
                </p>
                <p className="flex items-center">
                  <Clock className="w-6 h-6 text-gold mr-3" />
                  <span>Mon-Fri: 9AM-6PM</span>
                </p>
                <a 
                  href="https://www.facebook.com/people/Romanian-Banquet-Hall/100083314482573"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-gold transition-colors"
                >
                  <Facebook className="w-6 h-6 text-gold mr-3" />
                  <span>Follow us on Facebook</span>
                </a>
              </div>
            </div>
            <div>
              <form 
                ref={formRef}
                className="space-y-6"
                onSubmit={async (e: FormEvent) => {
                  e.preventDefault();
                  if (!formRef.current) return;
                  
                  setIsSubmitting(true);
                  setSubmitStatus('idle');
                  
                  try {
                    await emailjs.sendForm(
                      import.meta.env.VITE_EMAILJS_SERVICE_ID,
                      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                      formRef.current,
                      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                    );
                    setSubmitStatus('success');
                   if (formRef.current) {
                     formRef.current.reset();
                   }
                  } catch (error) {
                    console.error('Failed to send email:', error);
                    setSubmitStatus('error');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    required
                    className="w-full px-4 py-2 bg-warmGray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/80"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    aria-label="Your Email"
                    required
                    className="w-full px-4 py-2 bg-warmGray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/80"
                  />
                </div>
               <input
                 type="hidden"
                 name="to_email"
                 value="eventrbh@yahoo.com"
               />
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    aria-label="Your Message"
                    ref={messageRef}
                    required
                    className="w-full px-4 py-2 bg-warmGray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/80"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gold text-black font-semibold py-2 px-4 rounded-md transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold/90'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-500 text-center mt-2">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center mt-2">
                    Failed to send message. Please try again or email us directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warmGray-900 py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Powered by AiWebHub.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;