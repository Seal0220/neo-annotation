/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['AmericanTypewriter', 'Huninn', 'GenWanMin', 'sans-serif'],
        genwanmin: ['GenWanMin', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        paper: 'var(--paper)',
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
      },
      boxShadow: {
        'bottom': '0 20px 20px -1px rgba(0, 0, 0, 0.25)',
        'up': '0px 0px 30px rgba(0, 0, 0, 0.4)',
        'spread': '0px 0px 20px',
      },
      dropShadow: {
        'bottom': '0 20px 20px -1px rgba(0, 0, 0, 0.25)',
        'up': '0 0 30px rgba(0, 0, 0, 0.4)',
        'spread': '0px 0px 20px',
      }
    },
  },
  plugins: [],
};
