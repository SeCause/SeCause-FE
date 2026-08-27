import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FileText, Folder } from 'lucide-react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import Dropdown from './Dropdown';

const OPTIONS = [
  {
    value: 'option-1',
    label: '첫 번째 옵션',
  },
  {
    value: 'option-2',
    label: '두 번째 옵션',
  },
];

const ICON_OPTIONS = [
  {
    value: 'folder',
    label: '폴더',
    icon: <Folder size={18} aria-hidden="true" />,
  },
  {
    value: 'document',
    label: '문서',
    icon: <FileText size={18} aria-hidden="true" />,
  },
];

const LONG_LABEL_OPTION = {
  value: 'long-label',
  label: '고정 너비에서 말줄임 처리를 확인하기 위한 매우 긴 옵션 이름',
};

const meta = {
  title: 'Shared/Dropdown',
  component: Dropdown,
  args: {
    options: OPTIONS,
    value: null,
    onChange: fn(),
    placeholder: '옵션을 선택해주세요',
    className: 'w-48',
    buttonClassName: 'w-full',
  },
  render: function ControlledDropdown(args) {
    const [value, setValue] = useState(args.value);

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          args.onChange(nextValue);
        }}
      />
    );
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder = {} satisfies Story;

export const Selected = {
  args: {
    value: OPTIONS[0].value,
  },
} satisfies Story;

export const LongLabel = {
  args: {
    options: [LONG_LABEL_OPTION],
    value: LONG_LABEL_OPTION.value,
  },
} satisfies Story;

export const WithIcon = {
  args: {
    options: ICON_OPTIONS,
    value: ICON_OPTIONS[0].value,
  },
} satisfies Story;

export const Interaction = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: '옵션을 선택해주세요' }));
    await userEvent.click(canvas.getByRole('option', { name: '두 번째 옵션' }));

    await expect(args.onChange).toHaveBeenCalledWith('option-2');
  },
} satisfies Story;
