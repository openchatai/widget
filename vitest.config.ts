import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'

export default defineConfig({
  clearScreen: true,
  logLevel: "info",
  test: {
    testTimeout: 10 * 1000,
    typecheck: {
      enabled: true,
    },
    printConsoleTrace: true,
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest/setup.ts"],
  },
  plugins: [tsconfigPaths(), react()],
});
