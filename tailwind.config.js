module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Source Han Sans', 'sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        'sub-purple': '#E200FF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
