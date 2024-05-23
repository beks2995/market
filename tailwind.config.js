/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFA542",
          200: "#DF6464",
        },
        light: {
          100: "#F9F9F9",
          200: "#EAEAEA",
          300: "#D6D6D6",
        },
        dark: {
          50: "#AAAAAA",
          30:"#8E8E8E",
          100: "#838383",
          200: "#1C1C27",
          300: "#101010",
        },
      },
    },
  },
  plugins: [],
};
