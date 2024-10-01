import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  clearScreen: false,
  logLevel: "info",
  test: {
    exclude: [],
  },
  plugins: [
    tsconfigPaths(),
  ]
});
