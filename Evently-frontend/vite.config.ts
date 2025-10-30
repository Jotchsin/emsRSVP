import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Laravel backend
        changeOrigin: true,
        secure: false,
      },
      "/sanctum": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/logout": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/register": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
