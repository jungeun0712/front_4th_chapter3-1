import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import compat from 'eslint-plugin-compat';
import node from 'eslint-plugin-node';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

export default [
  {
    ignores: ['**/node_modules/**', 'dist/**'],
  },
  sonarjs.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescript,
      compat,
      vitest: vitestPlugin,
      security,
      unicorn,
      node,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Prettier 통합 규칙
      'prettier/prettier': 'error',

      // React 관련 규칙
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript 관련 규칙
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // 최신 JavaScript 스타일 규칙
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

      // 코드 안전성 및 문제 방지
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': 'off',
      'no-undef': 'off',

      // Vitest 관련 규칙
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/expect-expect': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/prefer-to-be': 'error',
      'vitest/require-top-level-describe': 'error',

      // 브라우저 호환성 (Compat) 규칙
      'compat/compat': 'warn',

      // 보안 관련 규칙 (Security)
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-require': 'warn',
      'security/detect-eval-with-expression': 'error',

      // 코드 품질 향상 (SonarJS)
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/no-identical-expressions': 'warn',
      'sonarjs/pseudo-random': 'warn',

      // 모던 JavaScript (Unicorn)
      'unicorn/prefer-module': 'error',
      'unicorn/prefer-ternary': 'error',
      'unicorn/prefer-node-protocol': 'error',
    },
  },
  prettier,
];
