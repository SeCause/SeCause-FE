import { CodeDetailsCard, IssueSummaryCards } from '@/features/repositories';
import { MOCK_DASHBOARD } from '@/widgets/landing/model/mockHowItWorksData';

import MockRepositoryHeader from './MockRepositoryHeader';
import PreviewShell from './PreviewShell';

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: 'bg-red-500',
  HIGH: 'bg-amber-400',
  MEDIUM: 'bg-blue',
  LOW: 'bg-gray-300',
};

export default function RepoOverviewPreview() {
  const criticalIssues =
    MOCK_DASHBOARD.severityBreakdown.find((item) => item.severity === 'CRITICAL')?.count ?? 0;

  return (
    <PreviewShell align="start">
      <MockRepositoryHeader />

      <CodeDetailsCard
        codeDetails={MOCK_DASHBOARD.codeDetails}
        lastAnalysisAt={MOCK_DASHBOARD.analysis.completedAt}
      />

      <div className="grid shrink-0 grow gap-4 sm:grid-cols-[0.9fr_1.1fr]">
        <IssueSummaryCards
          totalIssues={MOCK_DASHBOARD.summary.totalIssues}
          criticalIssues={criticalIssues}
        />

        <div className="flex flex-col rounded-2xl border border-gray-900/10 bg-white p-4">
          <p className="mb-3 text-xs font-semibold tracking-[0.08em] text-gray-500">
            SEVERITY BREAKDOWN
          </p>
          <ul className="space-y-3">
            {MOCK_DASHBOARD.severityBreakdown.map((item) => (
              <li
                key={item.severity}
                className="grid grid-cols-[4.5rem_1fr_1.5rem] items-center gap-3"
              >
                <span className="text-[10px] text-gray-500">{item.severity}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${SEVERITY_COLORS[item.severity] ?? 'bg-gray-300'}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-right text-[10px] font-semibold text-gray-700">
                  {item.count}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t border-gray-900/10 pt-4">
            <p className="text-label-mono font-mono text-gray-400">TOP TYPES</p>
            <ul className="mt-2.5 space-y-1.5">
              {MOCK_DASHBOARD.issuesByType.slice(0, 3).map((item) => (
                <li key={item.type} className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[11px] text-gray-600">{item.type}</span>
                  <span className="font-mono text-[11px] font-semibold text-gray-900">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}
