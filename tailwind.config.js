/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'creme-brulee': '#DDCCAA',
        midnight: '#11101A',
        'modal-shadow': '#000000bf',
        'light-midnight': '#222030',
        'gray-sm': '#CED4DA',
        'gray-md': '#6C757D',
        'link-blue': '#0D6EFD',
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
