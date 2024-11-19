import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'esnext',
  entryPoints: ['native/index.ts'],
  outDir: 'dist/native',
  tsconfig: 'tsconfig.native.json',
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native'],
});