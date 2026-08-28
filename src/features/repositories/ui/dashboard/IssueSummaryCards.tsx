'use client';

import { useCountUp } from '@/shared/lib/useCountUp';

interface Props {
  totalIssues: number;
  criticalIssues: number;
}

export default function IssueSummaryCards({ totalIssues, criticalIssues }: Props) {
  const animatedTotal = useCountUp(totalIssues);
  const animatedCritical = useCountUp(criticalIssues);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue rounded-2xl p-5 text-white">
        <p className="text-xs text-white/65">Total Issues</p>
        <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{animatedTotal}</p>
      </div>
      <div className="rounded-2xl border border-gray-900/10 bg-white p-5">
        <p className="text-xs text-gray-500">Critical Issues</p>
        <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-red-500">
          {animatedCritical}
        </p>
      </div>
    </div>
  );
}
