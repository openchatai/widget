import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), dts(), externalizeDeps(), react()],
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
        exports: "named",
        intro: `"use client"`,
      },
    },
    outDir: "dist",
  },
});
