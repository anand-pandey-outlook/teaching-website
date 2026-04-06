/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c'
        },
        ink: '#0f172a'
      },
      boxShadow: {
        soft: '0 12px 35px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
