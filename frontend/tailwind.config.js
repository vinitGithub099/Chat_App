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
      width: {
        sidebar: "80%",
        dropdown: "150px",
      },
      screens: {
        mobile: "426px",
      },
      colors: {
        btn: "#2F80ED",
        error: "#EF4444",
        success: "#22c55e",
        warn: "#f97316",
        info: "#0ea5e9",
        background: "#0B0C10",
        primary: "#1F2833",
        secondary: "#C5C6C7",
        accent: "#66FCF1",
        highlight: "#45A29E",
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
