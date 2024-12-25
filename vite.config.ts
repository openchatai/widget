import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
    }),
    externalizeDeps({
      except: ["rehype-raw"],
    }),
  ],
  server: {
    port: 3005,
  },
  build: {
    outDir: "dist",
    lib: {
      name: "@openchatai/widget",
      formats: ["cjs", "es"],
      entry: {
        basic: resolve(__dirname, "src/designs/basic/index.tsx"),
        react: resolve(__dirname, "react-lib/index.tsx"),
        index: resolve(__dirname, "core/index.ts"),
      },
    },
    sourcemap: true,
  },
  clearScreen: false,
});
