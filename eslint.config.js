import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import airbnb from 'eslint-config-airbnb-typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // убедитесь, что путь правильный
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      airbnb,
      reactHooks.configs['recommended-latest'],
      prettier, // отключает правила, конфликтующие с Prettier
    ],
    rules: {
      'prettier/prettier': 'error', // показывает ошибки форматирования как линт-ошибки
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'import/extensions': 'off', // TypeScript сам обрабатывает расширения
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: {} },
    },
  },
]);
