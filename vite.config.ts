import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.0.65:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: ".",
    rollupOptions: {
      input: {
        index: "./index.html",
        background: "./src/background/index.ts",
        content: "./src/content/index.ts",
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
});
