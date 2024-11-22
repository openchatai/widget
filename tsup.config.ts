import { defineConfig } from 'tsup';

const nativeLibConfig = defineConfig({
  target: 'esnext',
  entry: {
    "index": 'lib/index.native.ts',
  },
  outDir: 'dist/native',
  tsconfig: 'tsconfig.native.json',
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-native'],
});

const webLibConfig = defineConfig({
  target: 'esnext',
  entry: ['lib/index.ts'],
  outDir: 'dist/web',
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react'],
});

const embedConfig = defineConfig({
  entry: {
    script: 'src/index.tsx',
  },
  outDir: 'dist-embed',
  outExtension() {
    return { js: '.js' }
  },
  format: ["iife"],
  clean: true,
  bundle: true,
  splitting: false,
  noExternal: [/(.*)/],
  minify: true,
  platform: "browser",
  loader: { '.png': 'dataurl', '.css': "text" }, // embed images
});

export default [
  nativeLibConfig,
  webLibConfig,
  embedConfig
]