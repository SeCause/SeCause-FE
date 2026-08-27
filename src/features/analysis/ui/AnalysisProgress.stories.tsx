import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import AnalysisProgress from './AnalysisProgress';

const meta = {
  title: 'Features/Analysis/AnalysisProgress',
  component: AnalysisProgress,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '분석 진행률과 완료·실패 상태를 안내하는 화면입니다.',
      },
      story: {
        inline: false,
        height: '520px',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED'],
    },
    progressPercent: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  args: {
    status: 'IN_PROGRESS',
    progressPercent: 52,
    failureReason: null,
    isError: false,
    onBack: fn(),
  },
} satisfies Meta<typeof AnalysisProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground = {} satisfies Story;

export const Completed = {
  args: {
    status: 'COMPLETED',
    progressPercent: 100,
  },
} satisfies Story;

export const Failed = {
  args: {
    status: 'FAILED',
    progressPercent: 47,
    failureReason: '분석을 완료하지 못했습니다. 잠시 후 다시 시도해주세요.',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: '분석 설정으로 돌아가기' }));
    await expect(args.onBack).toHaveBeenCalledOnce();
  },
} satisfies Story;
