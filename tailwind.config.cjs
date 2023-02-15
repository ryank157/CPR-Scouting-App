/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cpr-blue-dark": "#000B71",
        "cpr-blue-light": "#CDECF4"
      },
      backgroundImage: {
        'scoring-grid': "url('/scoring-grid-cropped.png')",
        'red-start': "url('/red-start.svg')",
        'blue-start': "url('/blue-start.png')",
        'cone-empty': "url('/cone-empty.svg')",
        'cone-filled': "url('/cone-filled.svg')",
        'cube-empty': "url('/cube-empty.svg')",
        'cube-filled': "url('/cube-filled.svg')",
        'bottom-empty': "url('/bottom-empty.svg')",
        'bottom-cube': "url('/bottom-cube.svg')",
        'bottom-cone': "url('/bottom-cone.svg')",
      },
      spacing: {
        '1.25': '5px',
        '6.25': '25px',
        '7.5': '30px',
        '15' : '60px',
        '25' : '100px',
      }
    },
  },
};
