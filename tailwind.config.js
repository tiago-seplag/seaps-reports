// Tailwind fica no v3: o CSS do v4 (cascade layers, oklch, @property) o
// WeasyPrint não entende.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a3280",
      },
    },
  },
  plugins: [],
};
