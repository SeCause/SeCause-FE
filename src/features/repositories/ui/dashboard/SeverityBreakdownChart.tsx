'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import type { RepositorySeverityCount } from '@/features/repositories/model/types';

const SEVERITY_LABEL: Record<string, string> = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: 'var(--color-severity-critical)',
  HIGH: 'var(--color-severity-high)',
  MEDIUM: 'var(--color-severity-medium)',
  LOW: 'var(--color-severity-low)',
};

interface Props {
  breakdown: RepositorySeverityCount[];
}

export default function SeverityBreakdownChart({ breakdown }: Props) {
  const total = breakdown.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h2 className="text-label-lg mb-3 text-gray-900">Severity Breakdown</h2>
      <div className="flex items-center gap-6">
        <div className="relative h-36 w-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdown}
                dataKey="count"
                nameKey="severity"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={breakdown.length > 1 ? 2 : 0}
                stroke="none"
                isAnimationActive={false}
              >
                {breakdown.map((item) => (
                  <Cell key={item.severity} fill={SEVERITY_COLOR[item.severity] ?? '#d0d0d0'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-heading-md text-gray-900">{total}</span>
            <span className="text-caption text-gray-500">issues</span>
          </div>
        </div>

        <ul className="flex flex-1 flex-col gap-2">
          {breakdown.map((item) => (
            <li key={item.severity} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: SEVERITY_COLOR[item.severity] ?? '#d0d0d0' }}
                />
                <span className="text-body-md text-gray-900">
                  {SEVERITY_LABEL[item.severity] ?? item.severity}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-label-sm rounded bg-gray-100 px-1.5 py-0.5 text-gray-700">
                  {item.count}
                </span>
                <span className="text-body-md w-10 text-right text-gray-500">
                  {item.percentage.toFixed(0)}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
