/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          light: '#F4D58D',
          DEFAULT: '#E5B45B',
          dark: '#B8860B',
        },
        warmGray: {
          600: '#3D3A38',
          700: '#353230',
          800: '#292524',
          900: '#1C1917',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(229, 180, 91, 0.15)',
        'gold-glow-lg': '0 4px 30px rgba(229, 180, 91, 0.25)',
      },
    },
  },
  plugins: [],
};
