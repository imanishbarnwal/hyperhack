/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFFFFF',
          200: '#FDF6E3',
          300: '#FAEAC7',
          400: '#F6DEAA',
          500: '#FBF4DE', // base color
          600: '#F2E4C0',
          700: '#E8D3A2',
          800: '#DDC285',
          900: '#D2B169',
        },
        secondary: {
          100: '#8CA6AD',
          200: '#68898D',
          300: '#4D7076',
          400: '#365862',
          500: '#02222F', // base color
          600: '#011D29',
          700: '#011823',
          800: '#01131D',
          900: '#010E18',
        },
      }      
    },
  },
  plugins: [],
};
