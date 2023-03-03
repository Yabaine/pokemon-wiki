const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        mono: [
          'Montserrat',
          'Source Sans Pro',
          'Lato',
          'Noto Sans',
          ...defaultTheme.fontFamily.mono,
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('./themes/index'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
