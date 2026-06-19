import {
  CodeDetailsCard,
  IssuesByTypeCard,
  IssueSummaryCards,
  SeverityBreakdownChart,
} from '@/features/repositories';
import { MOCK_DASHBOARD } from '@/widgets/landing/model/mockHowItWorksData';

import MockRepositoryHeader from './MockRepositoryHeader';
import PreviewShell from './PreviewShell';

export default function RepoOverviewPreview() {
  const criticalIssues =
    MOCK_DASHBOARD.severityBreakdown.find((item) => item.severity === 'CRITICAL')?.count ?? 0;

  return (
    <PreviewShell>
      <MockRepositoryHeader />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CodeDetailsCard
          codeDetails={MOCK_DASHBOARD.codeDetails}
          lastAnalysisAt={MOCK_DASHBOARD.analysis.completedAt}
        />
        <IssuesByTypeCard issuesByType={MOCK_DASHBOARD.issuesByType} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IssueSummaryCards
          totalIssues={MOCK_DASHBOARD.summary.totalIssues}
          criticalIssues={criticalIssues}
        />
        <SeverityBreakdownChart breakdown={MOCK_DASHBOARD.severityBreakdown} animate />
      </div>
    </PreviewShell>
  );
}
