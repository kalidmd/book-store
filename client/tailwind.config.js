// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFCE1A',
        text: '#0D0842',
        searchBg: '#EAEAEA',
        bookDesc: 'rgba(13, 8, 66, 52%)',
        discount: '#6C6C6C',
        websiteBg: '#FFFFFF',
        websiteMobileBg: '#F3F3F3',
        adminNavBg: '#1e2834',
        adminHomeBg: '#9432e9',
        icon: '#BBBBBB'
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      width: {
        large: '90%',
        xLarge: '80%'
      },
      screens: {
        'xxs': '0px',
        'xs': '375px'
      },
    },
  },
  plugins: [],
}

