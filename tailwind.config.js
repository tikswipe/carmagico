/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-orange': '#FF8C00', // Adjust this hex code to match your desired orange color
        'purple': {
          600: '#9333EA',
        },
      },
      backgroundImage: {
        'gradient-orange-purple': 'linear-gradient(90deg, var(--tw-gradient-stops))',
        'fade-gray-right': 'linear-gradient(to right, rgb(243 244 246), rgba(243, 244, 246, 0))',
        'fade-gray-left': 'linear-gradient(to left, rgb(243 244 246), rgba(243, 244, 246, 0))',
      },
      borderRadius: {
        'full': '9999px',
      },
    },
  },
  plugins: [],
}