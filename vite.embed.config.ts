import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), UnoCSS()],
  build: {
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
