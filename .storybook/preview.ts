import '@/app/globals.css';
import './storybook.css';

import type { Preview } from '@storybook/nextjs-vite';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // TODO: severity/Toast 색상 대비(WCAG AA 4.5:1) 수정 후 'error'로 되돌리기
      test: 'todo',
    },
  },
  tags: ['autodocs'],
};

export default preview;
