import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.tsx'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
    clearMocks: true,
  },
});
