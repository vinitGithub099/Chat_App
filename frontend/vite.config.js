import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  webpack: (config) => {
    config.externals.push({
      "react-hook-form": "react-hook-form",
    });

    return config;
  },
});
