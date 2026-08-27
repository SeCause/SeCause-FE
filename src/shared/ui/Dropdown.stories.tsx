import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Building2, UserRound } from 'lucide-react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import Dropdown from './Dropdown';

const ACCOUNT_OPTIONS = [
  {
    value: 'secause-user',
    label: 'secause-user',
    icon: <UserRound size={18} aria-label="개인 계정" />,
  },
  {
    value: 'secause-organization',
    label: 'secause-organization-with-a-very-long-name',
    icon: <Building2 size={18} aria-label="조직" />,
  },
];

const meta = {
  title: 'Shared/Dropdown',
  component: Dropdown,
  args: {
    options: ACCOUNT_OPTIONS,
    value: null,
    onChange: fn(),
    placeholder: 'GitHub 계정 선택',
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
    value: ACCOUNT_OPTIONS[0].value,
  },
} satisfies Story;

export const LongLabel = {
  args: {
    value: ACCOUNT_OPTIONS[1].value,
  },
} satisfies Story;

export const SelectOrganization = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'GitHub 계정 선택' }));
    await userEvent.click(canvas.getByRole('option', { name: /조직/ }));

    await expect(args.onChange).toHaveBeenCalledWith('secause-organization');
  },
} satisfies Story;
