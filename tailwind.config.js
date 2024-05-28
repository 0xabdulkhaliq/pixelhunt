export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      colors: {
        primary: "#4f46e5",
      },
    },
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
  },
  plugins: [],
};
