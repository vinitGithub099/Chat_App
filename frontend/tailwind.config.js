/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
        "light-1": "#E0E0E0",
        "light-2": "#828282",
        "light-3": "#3C393F",
        "dark-1": "#252329",
        "dark-2": "#120F13",
        "dark-3": "#0B090C",
      },
      fontSize: {
        xxs: "0.1rem",
      },
    },
  },
  plugins: [],
  safelist: [
    "text-error",
    "text-info",
    {
      pattern:
        /(bg|text|border)-(light-1|light-2|light-3|dark-1|dark-2|dark-3|btn|success|error|warn|info)/,
    },
  ],
};
