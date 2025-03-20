/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': '0 20px 20px -1px',
        'up': '0px 0px 30px',
        'spread': '0px 0px 30px',
        'spread-sm': '0px 0px 10px',
      },
      dropShadow: {
        'bottom': '0 20px 20px -1px',
        'up': '0 0 30px',
        'spread': '0px 0px 30px',
        'spread-sm': '0px 0px 10px',
      },
      fontFamily: {
        primary: ['AmericanTypewriter', 'Huninn', 'GenWanMin', 'sans-serif'],
        genwanmin: ['GenWanMin', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        paper: 'var(--paper)',
        'paper-dark': 'var(--paper-dark)',
        'main-yellow-50': 'var(--main-yellow-50)',
        'main-yellow-100': 'var(--main-yellow-100)',
        'main-yellow-200': 'var(--main-yellow-200)',
        'main-yellow-300': 'var(--main-yellow-300)',
        'main-yellow-400': 'var(--main-yellow-400)',
        'main-yellow-500': 'var(--main-yellow-500)',
        'main-yellow-600': 'var(--main-yellow-600)',
        'main-yellow-700': 'var(--main-yellow-700)',
        'main-yellow-800': 'var(--main-yellow-800)',
        'main-yellow-900': 'var(--main-yellow-900)',
        'black-1/2': 'rgba(0,0,0,0.5)',
        'black-1/4': 'rgba(0,0,0,0.25)'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }),
        },
        { values: theme('translate'), supportsNegativeValues: true }
      )
    }),
  ],
};
