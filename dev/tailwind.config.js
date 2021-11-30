module.exports = {
  purge: [
    // './src/**/*.html',
    // './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        highlight: 'rgb(255, 61, 144)',
        checkWord: 'rgb(134, 200, 180)',
      },
      transitionProperty: {
        positioning: 'top, right, bottom, left',
        spacing: 'margin, padding',
        width: 'width',
        area: 'width, height',
        'spacing-area': 'width, height, margin, padding',
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
