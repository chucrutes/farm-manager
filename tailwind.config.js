/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        green: {
          DEFAULT: "#2ecc71",
        },
        brown: {
          DEFAULT: "rgb(227, 186, 125)",
          dark: "rgb(167, 118, 65)",
        },
        blue: {
          DEFAULT: "#3498db",
        },
        yellow: {
          DEFAULT: "#f1c40f",
        },
        orange: {
          DEFAULT: "#f68a09",
        },
        red: {
          DEFAULT: "#e74c3c",
        },
      },
    },
  },
  plugins: [],
};
