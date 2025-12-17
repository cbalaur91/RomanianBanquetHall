import { Section, SectionContent, SectionTitle } from '../layout/Section';
import { GalleryGrid } from './GalleryGrid';
import { GRAND_BALLROOM, CHATEAU_HALL } from '../../data/bookings';
import type { HallGallery } from '../../types';

interface HallSectionProps {
  hall: HallGallery;
  isLast?: boolean;
}

function HallSection({ hall, isLast = false }: HallSectionProps) {
  return (
    <div className={isLast ? '' : 'mb-20'}>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-serif mb-4">{hall.name}</h3>
        <p className="text-xl text-gray-300">
          Capacity up to {hall.capacity} guests
        </p>
      </div>

      <GalleryGrid images={hall.images} hallName={hall.name} />

      <div className="mt-8 text-center text-gray-300 space-y-1">
        {hall.description.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <Section
      id="gallery"
      className="py-20 bg-warmGray-900"
      ariaLabel="Venue gallery"
    >
      <SectionContent>
        <SectionTitle>Our Venues</SectionTitle>

        <HallSection hall={GRAND_BALLROOM} />
        <HallSection hall={CHATEAU_HALL} isLast />
      </SectionContent>
    </Section>
  );
}
