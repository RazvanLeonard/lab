/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0c0e',
        surface: '#14151a',
        'surface-2': '#101116',
        text: '#e9eaf0',
        muted: '#a3a6b3',
        accent: '#00b7ff',
        'accent-weak': 'rgba(0,183,255,0.1)',
        line: '#262833',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
      },
      boxShadow: {
        card: '0 12px 28px rgba(0,0,0,0.35)',
        'card-hover': '0 16px 34px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}
