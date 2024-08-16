/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*js', './app/**/*html'],
  theme: {
    extend: {
      fontFamily: {
        "Ubuntu": ['Ubuntu', ...defaultTheme.fontFamily.sans]
      },
    },
    screens: {
      'max-xl': {'max': '1399.98px'},
      // => @media screen and (max-width: 1399.98px) { ... }

      'max-lg': {'max': '1199.98px'},
      // => @media screen and (max-width: 1199.98px) { ... }

      'max-md': {'max': '991.98px'},
      // => @media screen and (max-width: 991.98px) { ... }

      'max-sm': {'max': '767.98px'},
      // => @media screen and (max-width: 767.98px) { ... }

      'max-xs': {'max': '575.98px'},
      // => @media screen and (max-width: 575.98px) { ... }

      'max-xxs': {'max': '399.98px'},
      // => @media screen and (max-width: 399.98px) { ... }
    }
  },
  plugins: [],
}

