/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        card: "#1A1A1A",
        primary: "#EF4444",
        secondary: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
