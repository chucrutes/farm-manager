import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
          DEFAULT: "#2ecc71", // Default shade of green
          // Add more shades of green if needed
        },
        brown: {
          DEFAULT: "rgb(227, 186, 125)", // Default shade of brown
          dark: 'rgb(167, 118, 65)'
        },
        blue: {
          DEFAULT: "#3498db", // Default shade of blue
          // Add more shades of blue if needed
        },
        yellow: {
          DEFAULT: "#f1c40f", // Default shade of yellow
          // Add more shades of yellow if needed
        },
        orange: {
          DEFAULT: "#f68a09", // Default shade of orange
          // Add more shades of orange if needed
        },
        red: {
          DEFAULT: "#e74c3c", // Default shade of red
          // Add more shades of red if needed
        },
      },
    },
  },
  plugins: [],
};
export default config;
