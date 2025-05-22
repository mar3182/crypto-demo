/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ADE7B', // Green accent color from design
          hover: '#3bca6c',
        },
        background: {
          dark: '#0D0D0D', // Dark background
          card: '#1A1A1A', // Card background
          secondary: '#141414', // Secondary background
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#AAAAAA',
          disabled: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

