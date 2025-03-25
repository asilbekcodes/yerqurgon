import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  envPrefix: "APP_",
  assetsInclude: ["**/*.xlsx"], // Bu qatorda .xlsx fayllarini aktivlar sifatida ko'rsatamiz
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
