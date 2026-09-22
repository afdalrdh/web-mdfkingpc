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
          blue: '#1D4ED8',
          'blue-hover': '#1E40AF',
          'blue-light': '#EFF6FF',
          'blue-subtle': '#DBEAFE',
          red: '#EF4444',
          'red-hover': '#DC2626',
          'red-light': '#FEF2F2',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          dark: '#0F172A',
          muted: '#64748B',
        }
      },
      fontFamily: {
        display: ['Realce', 'Outfit', 'Space Grotesk', 'sans-serif'],
        sans: ['General Sans', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px 0 rgba(15, 23, 42, 0.04)',
        'soft-md': '0 8px 24px -4px rgba(15, 23, 42, 0.06)',
        'soft-xl': '0 20px 40px -10px rgba(15, 23, 42, 0.08)',
        'pill-blue': '0 4px 14px 0 rgba(29, 78, 216, 0.25)',
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
