module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        positioning: 'top, right, bottom, left',
        spacing: 'margin, padding',
        width: 'width',
      },
    },
  },
  variants: {},
  plugins: [],
}
