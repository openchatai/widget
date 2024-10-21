import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  clearScreen: true,
  logLevel: "info",
  test: {
    includeSource: ["./src/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
    include: [
      "./src/**/*.test.{ts,tsx}",
      "./lib/**/*.test.{ts,tsx}",
      ...configDefaults.exclude],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest/setup.ts"],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [
    tsconfigPaths(),
    react()
  ]
});
