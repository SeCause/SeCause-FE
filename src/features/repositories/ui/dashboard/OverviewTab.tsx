import type { RepositoryDashboard } from '@/features/repositories/model/types';

import CodeDetailsCard from './CodeDetailsCard';
import IssuesByTypeCard from './IssuesByTypeCard';
import IssueSummaryCards from './IssueSummaryCards';
import SeverityBreakdownChart from './SeverityBreakdownChart';

interface Props {
  dashboard: RepositoryDashboard;
}

export default function OverviewTab({ dashboard }: Props) {
  const criticalIssues =
    dashboard.severityBreakdown.find((item) => item.severity === 'CRITICAL')?.count ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <CodeDetailsCard
        codeDetails={dashboard.codeDetails}
        lastAnalysisAt={dashboard.analysis.completedAt}
      />

      <div className="mt-4 flex flex-col gap-1">
        <h2 className="text-heading-md text-gray-900">Project Dashboard</h2>
        <p className="text-body-md text-gray-600">
          레포지토리의 보안 분석 결과와 위험도 분포를 확인할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IssueSummaryCards
          totalIssues={dashboard.summary.totalIssues}
          criticalIssues={criticalIssues}
        />
        <SeverityBreakdownChart breakdown={dashboard.severityBreakdown} />
      </div>

      <IssuesByTypeCard issuesByType={dashboard.issuesByType} />
    </div>
  );
}
