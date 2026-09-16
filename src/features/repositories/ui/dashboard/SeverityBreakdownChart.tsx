'use client';

import { Pie, PieChart } from 'recharts';

import type { RepositorySeverityCount } from '@/features/repositories/model/types';
import { SEVERITY_COLOR, SEVERITY_TAG_LABEL } from '@/features/repositories/ui/severityTag';

const CHART_SIZE = 144;

interface Props {
  breakdown: RepositorySeverityCount[];
  animate?: boolean;
}

export default function SeverityBreakdownChart({ breakdown, animate = false }: Props) {
  const total = breakdown.reduce((sum, item) => sum + item.count, 0);
  const chartData = breakdown.map((item) => ({
    ...item,
    fill: SEVERITY_COLOR[item.severity] ?? '#d0d0d0',
  }));

  return (
    <div className="border-border-subtle bg-surface rounded-2xl border p-6">
      <h2 className="text-foreground-tertiary mb-5 text-xs font-semibold tracking-[0.08em]">
        SEVERITY BREAKDOWN
      </h2>
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative h-36 w-36 shrink-0">
          <PieChart width={CHART_SIZE} height={CHART_SIZE}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="severity"
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={breakdown.length > 1 ? 2 : 0}
              stroke="none"
              isAnimationActive={animate}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-heading-md text-foreground">{total}</span>
            <span className="text-caption text-foreground-tertiary">issues</span>
          </div>
        </div>

        <ul className="flex min-w-40 flex-1 flex-col gap-2">
          {breakdown.map((item) => (
            <li key={item.severity} className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: SEVERITY_COLOR[item.severity] ?? '#d0d0d0' }}
                />
                <span className="text-body-md text-foreground truncate">
                  {SEVERITY_TAG_LABEL[item.severity] ?? item.severity}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="text-label-sm bg-surface-muted text-foreground-secondary rounded px-1.5 py-0.5">
                  {item.count}
                </span>
                <span className="text-body-md text-foreground-tertiary w-10 text-right">
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
