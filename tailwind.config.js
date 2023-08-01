/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      'md': '800px',
      // => @media (min-width: 768px) { ... }
    },
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
