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
        "cpr-blue-light": "#CDECF4",
        "inactive-border": "#5E5E5E",
        "inactive-bg": "#F0F0F0",
        "active-border": "#000B71",
      },
      backgroundImage: {
        'red-start': "url('/before-red-start.svg')",
        'blue-start': "url('/before-blue-start.svg')",
        'cone-empty': "url('/cone-empty.svg')",
        'cone-filled': "url('/cone-filled.svg')",
        'cube-empty': "url('/cube-empty.svg')",
        'cube-filled': "url('/cube-filled.svg')",
        'bottom-empty': "url('/bottom-empty.svg')",
        'bottom-cube': "url('/bottom-cube.svg')",
        'bottom-cone': "url('/bottom-cone.svg')",
        'auto-mob-score-s': "url('/auto-mob-score-s.svg')",
        'auto-mob-score': "url('/auto-mob-score.svg')",
        'auto-mob-failed': "url('/auto-mob-failed.svg')",
        'auto-mob-failed-s': "url('/auto-mob-failed-s.svg')",
        'auto-mob-no-s': "url('/auto-mob-no-s.svg')",
        'auto-mob-no': "url('/auto-mob-no.svg')",
        'auto-engaged': "url('/auto-engaged.svg')",
        'auto-engaged-s': "url('/auto-engaged-s.svg')",
        'auto-docked': "url('/auto-docked.svg')",
        'auto-docked-s': "url('/auto-docked-s.svg')",
        'auto-bal-na': "url('/auto-bal-na.svg')",
        'auto-bal-na-s': "url('/auto-bal-na-s.svg')",
        'auto-foul-pieces': "url('/auto-foul-pieces.svg')",
        'auto-foul-pieces-s': "url('/auto-foul-pieces-s.svg')",
        'auto-foul-other-s': "url('/auto-foul-other-s.svg')",
        'auto-foul-other': "url('/auto-foul-other.svg')",
        'auto-foul-cross-s': "url('/auto-foul-cross-s.svg')",
        'auto-foul-cross': "url('/auto-foul-cross.svg')",
        'endgame-red': "url('/endgame-red.svg')",
        'endgame-blue': "url('/endgame-blue.svg')",

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
