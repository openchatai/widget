import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { name } from './package.json';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
    }),
    react(),
    externalizeDeps(),
  ],
  server: {
    port: 3005,
  },
  build: {
    outDir: 'dist',
    lib: {
      name,
      formats: ['cjs', 'es'],
      entry: {
        index: resolve(__dirname, 'src/index.tsx'),
      },
    },
    sourcemap: true,
  },
  clearScreen: false,
});
