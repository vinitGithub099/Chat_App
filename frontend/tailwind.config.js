/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: {
        msgMaxWidth: "200px",
        msgMinWidth: "100px",
      },
      width: {
        sidebar: "80%",
        dropdown: "150px",
      },
      screens: {
        mobile: "426px",
      },
    },
  },
  plugins: [],
};
