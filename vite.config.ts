import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';
import { version } from './package.json';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
    }),
    externalizeDeps({
      except: [
        '@uiw/react-iframe',
        'rehype-raw',
        'remark-gfm',
        'react-markdown',
      ],
    }),
    react(),
  ],
  server: {
    port: 3005,
  },
  build: {
    outDir: 'dist',
    lib: {
      name: '@opencx/widget',
      formats: ['cjs', 'es'],
      entry: {
        designs: resolve(__dirname, 'src/designs/react/index.tsx'),
        react: resolve(__dirname, 'src/headless/react/index.ts'),
        index: resolve(__dirname, 'src/headless/core/index.ts'),
      },
    },
    sourcemap: true,
  },
  define: {
    __VERSION__: JSON.stringify(version),
  },
  clearScreen: false,
});
