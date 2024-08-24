// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3f8dfc',
        primaryDark: 'hsl(208, 100%, 40%)', // Color oscuro al 15% del color primario
        secondary: '#ff6f61',
        accent: '#fbbf24',
        background: '#f3f4f6',
        text: '#1f2937',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
