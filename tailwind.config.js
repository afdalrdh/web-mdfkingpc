/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3352C1',
          'blue-hover': '#2843A8',
          red: '#D13D5D',
          'red-hover': '#B82E4D',
          dark: '#141414',
          card: '#1C1C1E',
          'card-hover': '#242428',
          border: '#2A2A2E',
          muted: '#8E8E93',
          light: '#F5F5F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(51, 82, 193, 0.4)',
        'glow-red': '0 0 25px -5px rgba(209, 61, 93, 0.4)',
      }
    },
  },
  plugins: [],
}
