import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  css: {
    transformer: "lightningcss",
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
