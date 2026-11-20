import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
  }
});