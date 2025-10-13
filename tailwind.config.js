
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          400: "#00ff00",
          500: "#00cc00",
          600: "#009900",
          800: "#003300",
        },
      },
      fontFamily: {
        mono: ["Share Tech Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
