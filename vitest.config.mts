import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: '@/icons', replacement: path.resolve(rootDir, 'public/icons') },
      { find: '@', replacement: path.resolve(rootDir, 'src') },
    ],
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.{ts,tsx}', 'src/**/*.test.{ts,tsx}', 'src/**/*.d.ts'],
      // 지금 수치를 하한선으로 고정해 커버리지가 역행하지 않도록 막는다.
      // 테스트를 추가해 실제 수치가 올라가면 이 값도 같이 올린다.
      thresholds: {
        statements: 13,
        branches: 9,
        functions: 12,
        lines: 13,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./vitest.setup.tsx'],
          include: ['src/**/*.test.{ts,tsx}'],
          css: false,
          clearMocks: true,
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(rootDir, '.storybook'),
            storybookScript: 'pnpm storybook --no-open',
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
