/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter','sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(90deg, #9572FC 25%, #43E7AD 50%, #E1D55D 85%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 67%)',
      },
    },
  },
  plugins: [],
}
