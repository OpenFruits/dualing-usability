module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#9DD6E5",
        "theme-light": "#CEEBF2",
        "theme-dark": "#424242",
      },
      backgroundImage: {
        "first-view": "url('/firstview_bg.png')",
        persons: "url('/persons.png')",
      },
    },
    boxShadow: {
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
