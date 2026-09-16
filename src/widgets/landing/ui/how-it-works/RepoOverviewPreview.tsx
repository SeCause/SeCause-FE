import { CodeDetailsCard, IssueSummaryCards } from '@/features/repositories';
import { MOCK_DASHBOARD } from '@/widgets/landing/model/mockHowItWorksData';

import MockRepositoryHeader from './MockRepositoryHeader';
import PreviewShell from './PreviewShell';

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: 'bg-red-500',
  HIGH: 'bg-amber-400',
  MEDIUM: 'bg-blue',
  LOW: 'bg-surface-muted',
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

        <div className="border-border-subtle bg-surface flex flex-col rounded-2xl border p-4">
          <p className="text-foreground-tertiary mb-3 text-xs font-semibold tracking-[0.08em]">
            SEVERITY BREAKDOWN
          </p>
          <ul className="space-y-3">
            {MOCK_DASHBOARD.severityBreakdown.map((item) => (
              <li
                key={item.severity}
                className="grid grid-cols-[4.5rem_1fr_1.5rem] items-center gap-3"
              >
                <span className="text-foreground-tertiary text-[10px]">{item.severity}</span>
                <div className="bg-surface-muted h-1.5 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${SEVERITY_COLORS[item.severity] ?? 'bg-surface-muted'}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-foreground-secondary text-right text-[10px] font-semibold">
                  {item.count}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-border-subtle mt-3 border-t pt-4">
            <p className="text-label-mono text-foreground-disabled font-mono">TOP TYPES</p>
            <ul className="mt-2.5 space-y-1.5">
              {MOCK_DASHBOARD.issuesByType.slice(0, 3).map((item) => (
                <li key={item.type} className="flex items-baseline justify-between gap-3">
                  <span className="text-foreground-secondary truncate text-[11px]">
                    {item.type}
                  </span>
                  <span className="text-foreground font-mono text-[11px] font-semibold">
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
