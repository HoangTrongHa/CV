export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'primary': '#36e27b',
        'primary-dark': '#2ab863',
        'background-light': '#f6f8f7',
        'background-dark': '#122118',
        'surface-dark': '#1a2c23',
        'surface-light': '#ffffff',
      },
      fontFamily: {
        'display': ['Spline Sans', 'sans-serif']
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        'full': '9999px'
      },
    },
  },
  plugins: [],
}
