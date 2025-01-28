/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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
