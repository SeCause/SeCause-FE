import dynamic from 'next/dynamic';

import type { RepositoryDashboard } from '@/features/repositories/model/types';

import CodeDetailsCard from './CodeDetailsCard';
import IssuesByTypeCard from './IssuesByTypeCard';
import RecentIssuesCard from './RecentIssuesCard';

const SeverityBreakdownChart = dynamic(() => import('./SeverityBreakdownChart'), {
  loading: () => (
    <div className="border-border-subtle bg-surface-subtle h-[13.275rem] animate-pulse rounded-xl border" />
  ),
});

interface Props {
  repositoryId: number;
  dashboard: RepositoryDashboard;
}

export default function OverviewTab({ repositoryId, dashboard }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <CodeDetailsCard
        codeDetails={dashboard.codeDetails}
        lastAnalysisAt={
          dashboard.analysis.status === 'COMPLETED'
            ? dashboard.analysis.completedAt
            : dashboard.analysis.requestedAt
        }
        analysisDateLabel={dashboard.analysis.status === 'COMPLETED' ? '마지막 분석' : '분석 요청'}
      />

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
        <SeverityBreakdownChart
          breakdown={dashboard.severityBreakdown}
          totalIssues={dashboard.summary.totalIssues}
        />
        <IssuesByTypeCard issuesByType={dashboard.issuesByType} />
      </div>

      <RecentIssuesCard repositoryId={repositoryId} />
    </div>
  );
}
