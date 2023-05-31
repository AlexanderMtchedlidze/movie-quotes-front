/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'creme-brulee': '#DDCCAA',
        'midnight-blue': '#11101A',
        'modal-shadow': '#000000bf',
        'light-midnight': '#222030',
        'gray-smoke': '#CED4DA',
        'gray-slate': '#6C757D',
        'link-blue': '#0D6EFD',
        red: '#E31221',
        'red-hover': '#CC0E10',
        'red-active': '#B80D0F',
        'red-disabled': '#EC4C57',
        'red-error': '#DC3545',
        'input-success': '#198754',
        'cloud-focus': '#0d6efd40',
        'input-text': '#212529',
        'input-disabled-placeholder': '#E9ECEF',
        'input-disabled-border': '#CED4DA'
      },
      boxShadow: {
        'outline-white': 'inset 0 0 0 1px white'
      },
      backgroundImage: {
        interstellar: "url('./interstellar.png')",
        'the-lord-of-rings': "url('./the-lord-of-rings.png')",
        'the-royal-tenenbaums': "url('./the-royal-tenenbaums.png')",
        'border-shadow':
          'linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);'
      }
    }
  },
  plugins: []
}
