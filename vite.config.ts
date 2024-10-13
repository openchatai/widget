import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      insertTypesEntry: true
    }),
    externalizeDeps(), react()],
  server: {
    port: 3005,
  },
  clearScreen: false,
  build: {
    sourcemap: false,
    minify: true,
    emptyOutDir: true,
    reportCompressedSize: false,
    lib: {
      entry: {
        "basic": resolve(__dirname, "src/designs/basic/index.tsx"),
        "index": resolve(__dirname, "lib/index.tsx"),
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'cjs'],
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
