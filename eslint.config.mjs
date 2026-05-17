import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const FSD_ELEMENTS = [
  { type: 'app', pattern: 'app/*' },
  { type: 'widgets', pattern: 'widgets/*' },
  { type: 'features', pattern: 'features/*' },
  { type: 'entities', pattern: 'entities/*' },
  { type: 'shared', pattern: 'shared/*' },
];

const FSD_RULES = [
  {
    from: { type: 'app' },
    allow: [
      { to: { type: 'widgets' } },
      { to: { type: 'features' } },
      { to: { type: 'entities' } },
      { to: { type: 'shared' } },
    ],
  },
  {
    from: { type: 'widgets' },
    allow: [{ to: { type: 'features' } }, { to: { type: 'entities' } }, { to: { type: 'shared' } }],
  },
  { from: { type: 'features' }, allow: [{ to: { type: 'entities' } }, { to: { type: 'shared' } }] },
  { from: { type: 'entities' }, allow: [{ to: { type: 'shared' } }] },
  { from: { type: 'shared' }, allow: [] },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    plugins: { boundaries },
    settings: {
      'boundaries/include': ['src/**'],
      'boundaries/elements': FSD_ELEMENTS,
    },
    rules: {
      'boundaries/dependencies': ['error', { default: 'disallow', rules: FSD_RULES }],
    },
  },
]);

export default eslintConfig;
