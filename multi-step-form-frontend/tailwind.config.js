/* @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*js', './app/**/*html'],
  theme: {
    extend: {
      fontFamily: {
        "Ubuntu": ['Ubuntu', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          MarineBlue: "hsl(213, 96%, 18%)",
          PurplishBlue: "hsl(243, 100%, 62%)",
          PastelBlue: "hsl(228, 100%, 84%)",
          LightBlue: "hsl(206, 94%, 87%)",
          StrawberryRed: "hsl(354, 84%, 57%)",
          BackgroundBlue: "hsl(215, 100%, 97%)"
        },
        app_neutral: {
          CoolGray: "hsl(231, 11%, 63%)",
          LightGray: "hsl(229, 24%, 87%)",
          Magnolia: "hsl(217, 100%, 97%)",
          Alabaster: "hsl(231, 100%, 99%)"
        },
        status: {
          "success": "#17C653",
          "danger": "#F8285A",
          "warning": "#F6C000",
          "info": "#1B84FF"
        },
        validation: {
          danger: {
            "val-bg": "rgb(254 242 242)",
            "val-text": "rgb(153 27 27)"
          }
        }
      },
    },
    screens: {
      'max-xl': {'max': '1439.98px'},
      // => @media screen and (max-width: 1439.98px) { ... }

      'max-lg': {'max': '1199.98px'},
      // => @media screen and (max-width: 1199.98px) { ... }

      'max-md': {'max': '991.98px'},
      // => @media screen and (max-width: 991.98px) { ... }

      'max-sm': {'max': '767.98px'},
      // => @media screen and (max-width: 767.98px) { ... }

      'max-xs': {'max': '575.98px'},
      // => @media screen and (max-width: 575.98px) { ... }

      'max-2xs': {'max': '399.98px'},
      // => @media screen and (max-width: 399.98px) { ... }

      'max-3xs': {'max': '374.98px'},
      // => @media screen and (max-width: 374.98px) { ... }
    }
  },
  plugins: [],
}

