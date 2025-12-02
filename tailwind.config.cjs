/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8",
          dark: "#1E293B"
        },
        logo: "#C9B57A",
        sidebar: "#0F1B31",
        card: "#FFFFFF",
        muted: "#64748B",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};


