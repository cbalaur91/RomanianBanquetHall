import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../data/bookings';
import { useScrollPosition, useScrollSpy } from '../../hooks/useScrollAnimation';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const activeSection = useScrollSpy(
    NAV_LINKS.map(link => link.href),
    120
  );

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-warmGray-900/85 backdrop-blur-md shadow-lg shadow-black/10'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0" aria-label="Romanian Banquet Hall Logo">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="text-2xl font-serif hover:text-gold transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              Romanian Banquet Hall
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block" aria-label="Main navigation">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`
                    nav-link-underline relative py-1
                    transition-colors duration-200
                    ${activeSection === link.href
                      ? 'text-gold'
                      : 'text-white/90 hover:text-gold'
                    }
                  `}
                >
                  {link.label}
                  <span
                    className={`
                      absolute bottom-0 left-0 h-0.5 bg-gold
                      transition-all duration-300 ease-out
                      ${activeSection === link.href ? 'w-full' : 'w-0'}
                    `}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
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
        <div
          className="md:hidden mobile-menu bg-warmGray-900/95 backdrop-blur-md border-t border-white/5"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`
                  block px-4 py-3 rounded-lg transition-all duration-200
                  ${activeSection === link.href
                    ? 'bg-gold/10 text-gold'
                    : 'hover:bg-white/5 text-white/90'
                  }
                `}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
