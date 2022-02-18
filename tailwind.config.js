module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Alaska', 'sans-serif'],
    },
    extend: {
      colors: {
        'milano-red': {
          DEFAULT: '#C00D0D',
          50: '#FAB8B8',
          100: '#F9A0A0',
          200: '#F57171',
          300: '#F24141',
          400: '#EF1111',
          500: '#C00D0D',
          600: '#900A0A',
          700: '#600707',
          800: '#310303',
          900: '#010000',
        },
      },
    },
  },
  plugins: [],
}
