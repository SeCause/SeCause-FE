import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '서비스 전반에서 주요 행동과 위험 행동에 사용하는 공통 버튼입니다.',
      },
    },
  },
  args: {
    children: '버튼',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;

export const Danger = {
  args: {
    variant: 'danger',
    children: '삭제',
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
    children: '처리 중',
  },
} satisfies Story;
