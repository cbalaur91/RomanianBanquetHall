# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Romanian Banquet Hall is a single-page React website for a banquet hall venue in Warren, MI. It displays venue information, image galleries for two halls (Grand Ballroom and Chateau Hall), availability calendars, and a contact form.

## Development Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons

## Architecture

This is a single-component application - everything lives in [App.tsx](src/App.tsx). The file contains:

- **BOOKED_DATES** object at the top (lines 12-49) - manages venue availability by year/month/day
- **renderCalendar()** function - generates interactive availability calendars for each hall
- Navigation, hero, about, gallery, services, and contact sections as JSX

## Key Patterns

### Booking Management
Booked dates are stored in the `BOOKED_DATES` constant with this structure:
```typescript
{
  grandBallroom: {
    2025: {
      6: [7, 14],  // June 7th and 14th booked
    }
  },
  chateauHall: {
    3: [1],        // March 1st (old format, no year)
  }
}
```

### Custom Colors
Custom Tailwind colors defined in [tailwind.config.js](tailwind.config.js):
- `gold`: #E5B45B (accent color)
- `warmGray-800`: #292524
- `warmGray-900`: #1C1917

Additional gradient utilities in [index.css](src/index.css): `bg-gradient-warm`, `bg-gradient-radial`

### Images
Venue photos stored in `public/images/`:
- `SalaMare/` - Grand Ballroom photos (24 images)
- `SalaMica/` - Chateau Hall photos (18 images)

## Design Guidelines

- Use Tailwind CSS classes, avoid installing additional UI libraries
- Use Lucide React for icons
- Follow the dark theme with gold accents (#E5B45B)
- Font: Playfair Display for serif headings
