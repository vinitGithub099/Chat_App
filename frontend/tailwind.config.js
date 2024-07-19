/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "#EF4444",
        success: "#22c55e",
        warn: "#ffcc00",
        primary: "#0f172a",
        secondary: "#1e293b",
        "accent-1": "#38bdf8",
        "accent-2": "#eb6fb1",
        highlight: "#293548",
        "primary-text-1": "#e2e8f0",
        "primary-text-2": "#94a3b8",
      },
    },
  },
  darkMode: "class",
  plugins: [],
});
