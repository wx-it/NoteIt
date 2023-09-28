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
        'Poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'forms': '0px 2px 0px 1px #000',
        'button': '1px 2px 0px 0px #000',

      },
    },
  },
  plugins: [],
};
