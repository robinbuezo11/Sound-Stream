// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#3f8dfc',
        primary: 'hsl(208, 100%, 40%)', // Color oscuro al 15% del color primario
        secondary: '#ff6f61',
        accent: '#fbbf24',
        background: '#f3f4f6',
        mainBackground: '#1E2022',
        secondaryBackground: '#181A1B',
        inputBackground: '#121212',
        colorText: '#f3f4f6',
        border: '#1f2937',
        text: '#1f2937',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
