/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
const authCover = "./src/assets/6310507.jpg";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auth-cover": `url(${authCover})`,
      },
      screens: {
        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "1536px",
      },
      colors: {
        error: "#EF4444",
        success: "#22c55e",
        warn: "#f97316",
        info: "#0ea5e9",
        primary: "#0f172a",
        secondary: "#1e293b",
        "accent-1": "#38bdf8",
        "accent-2": "#eb6fb1",
        highlight: "#293548",
        "primary-text-1": "#e2e8f0",
        "primary-text-2": "#94a3b8",
      },
      fontSize: {
        xxs: "0.1rem",
      },
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".bg-auth-cover": {
            backgroundImage: `url(${authCover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
        },
        ["responsive", "hover", "focus"]
      );
    },
  ],
  safelist: [
    "text-error",
    "text-info",
    {
      pattern:
        /(bg|text|border)-(light-1|light-2|light-3|dark-1|dark-2|dark-3|btn|success|error|warn|info)/,
    },
  ],
});
