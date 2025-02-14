import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
      jsdoc.configs['flat/recommended-typescript'],
    ],
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      jsdoc,
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 1,
        },
      ],
      'no-constructor-return': 'error',
      'no-duplicate-imports': ['error', { includeExports: true }],
      'class-methods-use-this': 'error',
      'default-case-last': 'error',
      eqeqeq: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: ['case', 'default'],
          next: '*',
        },
      ],
      'jsdoc/no-types': 0,
    },
    settings: {
      react: {
        version: 'detect', // 自動でReactのバージョンを検出
      },
    },
  },
);
