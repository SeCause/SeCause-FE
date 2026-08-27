import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import ConfirmDialog from './ConfirmDialog';

const meta = {
  title: 'Shared/ConfirmDialog',
  component: ConfirmDialog,
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
    open: true,
    title: '분석 기록을 삭제하시겠어요?',
    description: 'GitHub 저장소에는 영향을 주지 않으며,\n삭제 후 복구할 수 없습니다.',
    confirmLabel: '삭제',
    cancelLabel: '취소',
    onConfirm: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Confirming = {
  args: {
    isConfirming: true,
    confirmLabel: '삭제 중',
  },
} satisfies Story;

export const LongDescription = {
  args: {
    title: '선택한 항목을 삭제하시겠어요?',
    description:
      '선택한 항목과 관련된 분석 결과가 모두 삭제됩니다. 이 작업은 완료 후 되돌릴 수 없으니 삭제할 대상을 다시 한번 확인해주세요.',
  },
} satisfies Story;

export const CancelInteraction = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: '취소' }));
    await expect(args.onCancel).toHaveBeenCalledOnce();
  },
} satisfies Story;
