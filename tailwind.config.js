/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: '#E5B45B',
        warmGray: {
          800: '#292524',
          900: '#1C1917'
        }
      },
    },
  },
  plugins: [],
};
