/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131415",
        secondary: "#004CBD",
        tertiary: "#777777",
        white: "#FFFFFF",
        borderColor: "#E7F1E9",
        red: "#F41E10",
        black: "#000000",
        green: "#07982F",
        BACKGROUND_GRAY: "#555658",
        BACKGROUND_WHITE: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
