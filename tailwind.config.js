/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b49a7a', // Oro chiaro/bronzo
        secondary: '#f5f3ef', // Grigio perla
        accent: '#d1bfa3', // Beige caldo
        cream: '#f9f7f3', // Crema molto chiara
        sand: '#e5ded6', // Sabbia
        lightgray: '#f2f2f2', // Grigio chiarissimo
        darkgray: '#222', // Testo quasi nero
        gold: '#c2a46b', // Accento oro
      },
      fontFamily: {
        sans: ['Montserrat', 'Lato', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 