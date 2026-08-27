import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { userEvent, within } from 'storybook/test';

import Button from './Button';
import { ToastProvider, useToast } from './Toast';

interface ToastStoryExampleProps {
  message: string;
  type: 'success' | 'error';
}

// Toast는 Provider의 훅으로 실행되므로, Story에서 알림을 호출하기 위한 전용 예시 컴포넌트다.
function ToastStoryExample({ message, type }: ToastStoryExampleProps) {
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
  component: ToastStoryExample,
  parameters: {
    docs: {
      description: {
        component:
          'ToastProvider 안에서 useToast를 호출하는 사용 예시입니다. 각 Story는 play 함수로 알림을 자동 표시합니다.',
      },
    },
  },
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
} satisfies Meta<typeof ToastStoryExample>;

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
