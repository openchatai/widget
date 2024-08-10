import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    assetsInlineLimit: 10 * 1024,
    rollupOptions: {
      input: "src/index.tsx",
      output: {
        name: "copilot-widget",
        dir: "dist-embed",
        entryFileNames: "script.js",
      },
    },
  },
  server: {
    port: 3005,
  },
});
