import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [dts(), tsconfigPaths(), externalizeDeps(), UnoCSS(), react()],
  server: {
    port: 3005,
  },
  clearScreen: false,
  build: {
    minify: true,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "lib/index.tsx"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        preserveModules: false,
        exports: "named",
      },
    },
    outDir: "dist",
  },
});
