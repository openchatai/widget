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
      insertTypesEntry: true,
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
        basic: resolve(__dirname, "src/designs/basic/index.tsx"),
        react: resolve(__dirname, "react-web/index.tsx"),
        index: resolve(__dirname, "core/index.ts"),
      },
    },
    sourcemap: true,
  },
  clearScreen: false,
});
