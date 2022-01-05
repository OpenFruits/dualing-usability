module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  darkMode: false, // 'media' or 'class'
  theme: { extend: {} },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
