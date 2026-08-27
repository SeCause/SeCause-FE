import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => ({
    ...config,
    // `@/icons`는 Next.js에서 public/icons를 모듈로 import한다.
    // Storybook의 정적 파일 복사는 staticDirs가 담당하므로 Vite의 publicDir 처리는 끈다.
    publicDir: false,
  }),
};

export default config;
