import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { userEvent, within } from 'storybook/test';

import Button from './Button';
import { ToastProvider, useToast } from './Toast';

interface ToastDemoProps {
  message: string;
  type: 'success' | 'error';
}

function ToastDemo({ message, type }: ToastDemoProps) {
  const { showToast } = useToast();

  return (
    <Button
      variant={type === 'error' ? 'danger' : 'primary'}
      onClick={() => showToast(message, type)}
    >
      알림 표시
    </Button>
  );
}

const meta = {
  title: 'Shared/Toast',
  component: ToastDemo,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  args: {
    message: '요청이 성공적으로 처리되었습니다.',
    type: 'success',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '알림 표시' }));
  },
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success = {} satisfies Story;

export const Error = {
  args: {
    message: '요청 처리 중 오류가 발생했습니다.',
    type: 'error',
  },
} satisfies Story;

export const LongMessage = {
  args: {
    message: '분석 요청을 처리하지 못했습니다. 잠시 후 다시 시도하거나 관리자에게 문의해주세요.',
    type: 'error',
  },
} satisfies Story;
