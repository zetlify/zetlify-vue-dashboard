/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,jsx,js}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        // primary color
        primary: '#0094DA',
        'primary-deep': '#008acb'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ]
}
