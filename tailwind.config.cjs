/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        page: "rgb(0,11,113)", //Need this to recognize the tailwind.config.cjs
      },
      colors: {
        "cpr-blue": "rgb(0,11,113)",
      },
    },
  },
};
