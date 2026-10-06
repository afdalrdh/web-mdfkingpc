/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#1E293B',
          'blue-subtle': '#0F172A',
          cyan: '#06B6D4',
          'cyan-hover': '#0891B2',
          red: '#F43F5E',
          'red-hover': '#E11D48',
          'red-light': '#881337',
          canvas: '#07080B',
          surface: '#0D0E15',
          'surface-elevated': '#12141F',
          card: '#0F121C',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
          dark: '#07080B',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        display: ['Realce', 'Outfit', 'Space Grotesk', 'sans-serif'],
        sans: ['General Sans', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px 0 rgba(0, 0, 0, 0.3)',
        'soft-md': '0 8px 24px -4px rgba(0, 0, 0, 0.45)',
        'soft-xl': '0 20px 40px -10px rgba(0, 0, 0, 0.6)',
        'pill-blue': '0 0 24px 0 rgba(37, 99, 235, 0.4)',
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.5)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.45)',
        'glass-edge': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
