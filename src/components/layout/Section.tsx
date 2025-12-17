import { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  animate?: boolean;
}

export function Section({
  id,
  children,
  className = '',
  ariaLabel,
  animate = true
}: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section
      id={id}
      ref={animate ? ref : undefined}
      className={`
        ${animate ? 'section-animate' : ''}
        ${animate && isVisible ? 'visible' : ''}
        ${className}
      `}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}

// Inner content wrapper with max-width
interface SectionContentProps {
  children: ReactNode;
  className?: string;
}

export function SectionContent({ children, className = '' }: SectionContentProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Section title component
interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-serif text-center mb-12 ${className}`}>
      {children}
    </h2>
  );
}
