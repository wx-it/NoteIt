/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      'sm' : "500px",
      'md': '800px',
      'lg': '1024px',
    },
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'forms': '0px 2px 0px 1px #000',
        'button': '1px 2px 0px 0px #000',
        'auth' : "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",

      },
    },
  },
  plugins: [],
};
