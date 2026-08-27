import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import ErrorState from './ErrorState';

const meta = {
  title: 'Shared/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '420px',
      },
    },
  },
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomMessage = {
  args: {
    title: '대시보드를 불러오지 못했습니다.',
    description: '저장소 분석 정보를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
} satisfies Story;

export const RetryInteraction = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: '다시 시도' }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
} satisfies Story;
