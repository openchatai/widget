import { defineConfig } from "tsup"

const libraryConfig = defineConfig({
    dts: true,
    minify: true,
    outDir: "dist",
    clean: true,
    treeshake: true,
    format: ['esm'],
    splitting: true,
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    define: {
        'import.meta.vitest': 'undefined',
    },
    platform: "browser",
    entry: {
        index: "lib/index.tsx",
        advanced: "src/themes/advanced/index.tsx"
    },
})

const browserEmbed = defineConfig({
    entry: ['src/index.tsx'],
    outDir: "dist-embed",
    format: ['esm'],
    dts: false,
    sourcemap: false,
    minify: true,
    target: 'es2015',
    clean: true,
    platform: 'browser',
    define: {
        'import.meta.vitest': 'undefined',
    },
    noExternal: [ /(.*)/ ],
})

export default [
    libraryConfig,
    browserEmbed
]