import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Input from './Input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: {
    'aria-label': '이름',
    placeholder: '이름을 입력해주세요',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty = {} satisfies Story;

export const Filled = {
  args: {
    defaultValue: 'SeCause',
  },
} satisfies Story;

export const ReadOnly = {
  args: {
    readOnly: true,
    value: '수정할 수 없는 값',
  },
} satisfies Story;
