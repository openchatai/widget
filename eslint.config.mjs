import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/dist', '**/dist-embed', '**/node_modules']),
  {
    extends: compat.extends('plugin:@typescript-eslint/recommended'),

    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      'unused-imports': unusedImports,
      vitest: vitest,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'unused-imports/no-unused-imports': 'warn',
      'vitest/expect-expect': 'warn',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
    },
  },
]);
