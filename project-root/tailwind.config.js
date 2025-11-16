module.exports = {
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A3FF",
        accent: "#FFD44D",
        softbg: "#F6FBFF",
        pinkbg: "#FFF5F6",
        figmaFooter: "#0B0B0B"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};