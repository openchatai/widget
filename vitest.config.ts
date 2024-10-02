import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
export default defineConfig({
  clearScreen: false,
  logLevel: "info",
  test: {
    include: ["./lib/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./lib/test/setup.ts"],
  },
  plugins: [
    tsconfigPaths(),
    react()
  ]
});
