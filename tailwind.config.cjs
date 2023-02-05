/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cpr-blue": "rgb(0,11,113)",
      },
      backgroundImage: {
        'scoring-grid': "url('/scoring-grid-cropped.png')"
      }
    },
  },
};
