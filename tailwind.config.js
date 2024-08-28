/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ffc727",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        dark: "#111111",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(rgba(0, 13, 107, 0.6), rgba(0, 13, 107, 0.6)), url("src/assets/drive.jpg")',
        'gradient-orange-red': 'linear-gradient(#ef621c, #e1424e)',
        'gradient-green': 'linear-gradient(#01d293, #56c57a)',
      },
      backgroundSize: {
        'cover': 'cover',
      },
    },
  },
  plugins: [require("daisyui")],
};
