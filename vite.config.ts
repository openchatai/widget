import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsconfigPaths from "vite-tsconfig-paths";
import { version } from "./package.json";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      include: ["src"],
      outDir: "dist/types",
    }),
    externalizeDeps({
      except: ["rehype-raw"],
    }),
    react(),
  ],
  server: {
    port: 3005,
  },
  build: {
    outDir: "dist",
    lib: {
      name: "@opencx/widget",
      formats: ["cjs", "es"],
      entry: {
        basic: resolve(__dirname, "src/designs/react/basic/index.tsx"),
        react: resolve(__dirname, "src/headless/react/index.ts"),
        index: resolve(__dirname, "src/headless/core/index.ts"),
      },
    },
    sourcemap: true,
  },
  define: {
    __VERSION__: JSON.stringify(version),
  },
  clearScreen: false,
});