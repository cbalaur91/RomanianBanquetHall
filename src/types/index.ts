// Booking types
export interface YearlyBookings {
  [month: number]: number[];
}

export interface HallBookings {
  [year: number]: YearlyBookings;
  [month: number]: number[]; // Legacy format support
}

export interface BookedDates {
  grandBallroom: HallBookings;
  chateauHall: HallBookings;
}

// Gallery types
export interface GalleryImage {
  src: string;
  alt: string;
}

export interface HallGallery {
  name: string;
  capacity: number;
  images: GalleryImage[];
  description: string[];
}

// Service types
export interface Service {
  title: string;
  description: string;
  image: string;
}

// Navigation types
export interface NavLink {
  href: string;
  label: string;
}

// Contact types
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
  facebook: string;
}
