import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import RetryState from './RetryState';

const meta = {
  title: 'Shared/RetryState',
  component: RetryState,
  args: {
    message: '레포지토리를 불러오지 못했습니다.',
    onRetry: fn(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RetryState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    message: '파일 목록을 불러오지 못했습니다.',
    compact: true,
  },
  decorators: [
    (Story) => (
      <div className="border-border-subtle bg-surface w-60 rounded-2xl border p-3">
        <Story />
      </div>
    ),
  ],
};
