import { defineConfig } from "tsup"

const libraryConfig = defineConfig({
    dts: true,
    minify: true,
    outDir: "dist-lib",
    splitting: true,
    clean: true,
    treeshake: true,
    format: [
        "cjs",
        "esm",
    ],

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
    outDir: "dist-embed",
    entry: {
        index: "./src/index.tsx",
    },
    clean: true,
    minify: true,
    external: [],
    define: {
        'import.meta.vitest': 'undefined',
    },
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    platform: "browser",
})

export default [
    libraryConfig,
    browserEmbed
]