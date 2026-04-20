/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d3557',
        accent: '#457b9d',
        danger: '#e63946',
        warning: '#f4a261',
        success: '#2a9d8f',
        surface: '#f8f9fa',
        card: '#ffffff',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
