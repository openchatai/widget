import { resolve } from 'path'
import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        "basic": resolve(__dirname, "src/designs/basic/index.tsx"),
        "index": resolve(__dirname, "lib/index.tsx"),
    },
    outDir: "dist",
    platform:'browser',
    format: ['esm','cjs'],
    clean: true,
    dts: true,
    treeshake: true,
    splitting: false,
    external: ['react','react-dom'],
})