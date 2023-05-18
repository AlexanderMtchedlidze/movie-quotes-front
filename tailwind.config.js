/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'creme-brulee': '#DDCCAA',
        midnight: '#11101A',
        'light-midnight': '#222030',
        'button-primary': '#E31221',
        'button-primary-hover': '#CC0E10',
        'button-primary-active': '#B80D0F',
        'button-primary-disabled': '#EC4C57'
      },
      boxShadow: {
        'outline-white': 'inset 0 0 0 1px white'
      }
    }
  },
  plugins: []
}
