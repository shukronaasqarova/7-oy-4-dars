/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class', // dark mode klassini ishga tushirish

    extend: {},
  },
  plugins: [require('daisyui')],
}