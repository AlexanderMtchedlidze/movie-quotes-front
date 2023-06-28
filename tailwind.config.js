/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'georgian-medium': ['Georgian-Medium', 'serif'],
        'georgian-bold': ['Georgian-Bold', 'serif'],
        'georgian-heavy': ['Georgian-Heavy', 'serif'],
        'english-medium': ['English-Medium', 'sans-serif'],
        'english-bold': ['English-Bold', 'sans-serif'],
        'english-heavy': ['English-Heavy', 'sans-serif'],
      },
      colors: {
        'creme-brulee': '#DDCCAA',
        'midnight-blue': '#11101A',
        'modal-shadow': '#000000bf',
        'light-midnight': '#222030',
        'gray-smoke': '#CED4DA',
        'gray-slate': '#6C757D',
        'dark-gray': '#9C9A9A',
        'link-blue': '#0D6EFD',
        red: '#E31221',
        'notification-red': '#E33812',
        'red-hover': '#CC0E10',
        'red-active': '#B80D0F',
        'red-disabled': '#EC4C57',
        'red-error': '#DC3545',
        'input-success': '#198754',
        'alert-succes': '#BADBCC',
        'success-text': '#0F5132',
        'cloud-focus': '#0d6efd40',
        'input-text': '#212529',
        'input-disabled-placeholder': '#E9ECEF',
        'input-disabled-border': '#CED4DA',
        'midnight-creme-brulee': '#24222F',
        'light-gray': '#D9D9D9',
        'dark-purple': '#9747FF'
      },
      boxShadow: {
        'outline-white': 'inset 0 0 0 1px white'
      },
      backgroundImage: {
        interstellar: "url('@/assets/img/interstellar.png')",
        'the-lord-of-rings': "url('@/assets/img/the-lord-of-rings.png')",
        'the-royal-tenenbaums': "url('@/assets/img/the-royal-tenenbaums.png')",
        'border-shadow':
          'linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%)',
        'dashboard-gradient':
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'confirmation-prompt-gradient':
          'linear-gradient(-68deg, rgba(239, 239, 239, 0.1) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.05) 102.52%)',
        'message-gradient':
          'background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'choose-file-gradient':
          'linear-gradient(187.16deg, rgba(24, 22, 35, 0.8) 0.07%, rgba(25, 23, 37, 0.8) 51.65%, rgba(13, 11, 20, 0.8) 98.75%)'
      }
    }
  }
};
export const plugins = [];
