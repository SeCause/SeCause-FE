import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { IssueSeverity } from '@/features/repositories/model/types';

import SeverityBadge from './SeverityBadge';

const SEVERITIES: IssueSeverity[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

const meta = {
  title: 'Features/Repositories/SeverityBadge',
  component: SeverityBadge,
  args: {
    severity: 'CRITICAL',
  },
} satisfies Meta<typeof SeverityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground = {} satisfies Story;

export const AllSeverities = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {SEVERITIES.map((severity) => (
        <SeverityBadge key={severity} severity={severity} />
      ))}
    </div>
  ),
} satisfies Story;
