import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      '.now/*',
      '**/*.css',
      '**/.changeset',
      '**/dist',
      'esm/*',
      'public/*',
      'tests/*',
      'scripts/*',
      '**/*.config.js',
      '**/.DS_Store',
      '**/node_modules',
      '**/coverage',
      '**/.next',
      '**/build',
      '!**/.commitlintrc.cjs',
      '!**/.lintstagedrc.cjs',
      '!**/jest.config.js',
      '!**/plopfile.js',
      '!**/react-shim.js',
      '!**/tsup.config.ts'
    ]
  },
  ...compat.extends(
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];
