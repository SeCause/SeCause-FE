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
      <div className="rounded-xl border border-gray-200 p-4">
        <p className="text-label-md text-gray-500">Total Issues</p>
        <p className="text-heading-lg mt-1 text-gray-900">{animatedTotal}</p>
      </div>
      <div className="rounded-xl border border-gray-200 p-4">
        <p className="text-label-md text-gray-500">Critical Issues</p>
        <p className="text-heading-lg text-severity-critical mt-1">{animatedCritical}</p>
      </div>
    </div>
  );
}
