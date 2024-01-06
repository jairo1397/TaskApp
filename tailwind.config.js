/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colorrs: {
        primary: '#871cf8',
        secondary: '#ff0000',
        "background-100": '#1A1A1A',
        "background-200": '#292929',
        "background-300": '#404040',
        "background-400": '#585858',
      },
    },
  },
  plugins: [],
}