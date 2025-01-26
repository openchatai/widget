import reactPlugin from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactPlugin(), tsconfigPaths()],
  build: {
    assetsInlineLimit: 10 * 1024,
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: "src/embedded/index.tsx",
      output: {
        format: "iife", // Immediately-Invoked Function Expression
        dir: "dist-embed",
        entryFileNames: "script.js",
        extend: true,
      },
    },
  },
  server: {
    port: 3005,
  },
});
