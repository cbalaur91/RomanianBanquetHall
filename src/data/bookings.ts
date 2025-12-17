import type { BookedDates, HallGallery, Service, NavLink, ContactInfo } from '../types';

export const BOOKED_DATES: BookedDates = {
  grandBallroom: {
    2025: {
      6: [7, 14],
      8: [30],
      10: [4]
    }
  },
  chateauHall: {
    3: [1],
    5: [10, 31],
    6: [7, 14],
    7: [26]
  }
};

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const GRAND_BALLROOM: HallGallery = {
  name: 'Grand Ballroom',
  capacity: 450,
  images: [
    { src: '/images/SalaMare/5.JPG', alt: 'Grand Ballroom elegant table settings' },
    { src: '/images/SalaMare/6.JPG', alt: 'Grand Ballroom crystal chandeliers' },
    { src: '/images/SalaMare/7.JPG', alt: 'Grand Ballroom dance floor' },
    { src: '/images/SalaMare/8.JPG', alt: 'Grand Ballroom stage area' },
    { src: '/images/SalaMare/9.JPG', alt: 'Grand Ballroom seating arrangement' },
    { src: '/images/SalaMare/14.JPG', alt: 'Grand Ballroom full venue view' }
  ],
  description: [
    'Perfect for large weddings, corporate galas, and grand celebrations',
    'Features crystal chandeliers and spacious dance floor'
  ]
};

export const CHATEAU_HALL: HallGallery = {
  name: 'Chateau Hall',
  capacity: 150,
  images: [
    { src: '/images/SalaMica/1.JPG', alt: 'Chateau Hall intimate setting' },
    { src: '/images/SalaMica/2.JPG', alt: 'Chateau Hall decor details' },
    { src: '/images/SalaMica/3.JPG', alt: 'Chateau Hall table arrangements' },
    { src: '/images/SalaMica/18.jpg', alt: 'Chateau Hall ambient lighting' },
    { src: '/images/SalaMica/5.JPG', alt: 'Chateau Hall private bar' },
    { src: '/images/SalaMica/8.JPG', alt: 'Chateau Hall full venue' }
  ],
  description: [
    'Ideal for intimate weddings, corporate events, and private celebrations',
    'Features elegant decor and private bar'
  ]
};

export const SERVICES: Service[] = [
  {
    title: 'Weddings',
    description: 'Make your special day unforgettable in our elegant venue with comprehensive wedding packages.',
    image: '/images/SalaMare/15.JPG'
  },
  {
    title: 'Corporate Events',
    description: 'Professional atmosphere for your business meetings, conferences, and corporate celebrations.',
    image: '/images/SalaMica/17.jpg'
  },
  {
    title: 'Private Parties',
    description: 'Perfect setting for birthdays, anniversaries, and other special celebrations.',
    image: '/images/SalaMica/12.JPG'
  }
];

export const NAV_LINKS: NavLink[] = [
  { href: 'home', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'gallery', label: 'Gallery' },
  { href: 'services', label: 'Services' },
  { href: 'contact', label: 'Contact' }
];

export const CONTACT_INFO: ContactInfo = {
  phone: '(586) 565-0119',
  email: 'eventrbh@yahoo.com',
  address: '31500 Ryan Rd, Warren, MI, 48092',
  hours: 'Mon-Fri: 9AM-6PM',
  facebook: 'https://www.facebook.com/people/Romanian-Banquet-Hall/100083314482573'
};
