module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        highlight: '#123123',
      },
      transitionProperty: {
        positioning: 'top, right, bottom, left',
        spacing: 'margin, padding',
        width: 'width',
        area: 'width, height',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
