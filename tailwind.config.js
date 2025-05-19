/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        pinkAccent: "#FF2D75",
        darkBg: "#10141C",
        cardBg: "#1A1F2E",
        borderLight: "rgba(255,255,255,0.1)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
