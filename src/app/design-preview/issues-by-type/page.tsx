import Image from 'next/image';

import type {
  RepositoryIssueTypeCount,
  RepositorySeverityCount,
} from '@/features/repositories/model/types';
import CodeDetailsCard from '@/features/repositories/ui/dashboard/CodeDetailsCard';
import IssuesByTypeCard from '@/features/repositories/ui/dashboard/IssuesByTypeCard';
import RepositoryDashboardHeader from '@/features/repositories/ui/dashboard/RepositoryDashboardHeader';
import SeverityBreakdownChart from '@/features/repositories/ui/dashboard/SeverityBreakdownChart';
import IssueIcon from '@/icons/icon_issue.svg';
import OverviewIcon from '@/icons/icon_overview.svg';

const mockIssuesByType: RepositoryIssueTypeCount[] = [
  { type: 'SQL_INJECTION', severity: 'CRITICAL', count: 12 },
  { type: 'SSRF', severity: 'CRITICAL', count: 7 },
  { type: 'UNSAFE_FORMATSTRING', severity: 'HIGH', count: 9 },
  { type: 'HARDCODED_CREDENTIALS', severity: 'HIGH', count: 7 },
  { type: 'PATH_TRAVERSAL', severity: 'HIGH', count: 6 },
  { type: 'INSECURE_DESERIALIZATION', severity: 'HIGH', count: 5 },
  { type: 'CROSS_SITE_SCRIPTING', severity: 'MEDIUM', count: 5 },
  { type: 'WEAK_HASH', severity: 'MEDIUM', count: 4 },
  { type: 'CSRF', severity: 'MEDIUM', count: 3 },
  { type: 'LOG_INJECTION', severity: 'MEDIUM', count: 3 },
  { type: 'MISSING_RATE_LIMIT', severity: 'LOW', count: 2 },
  { type: 'VERBOSE_ERROR_MESSAGE', severity: 'LOW', count: 1 },
];

const mockSeverityBreakdown: RepositorySeverityCount[] = [
  { severity: 'CRITICAL', count: 19, percentage: 29 },
  { severity: 'HIGH', count: 27, percentage: 41 },
  { severity: 'MEDIUM', count: 15, percentage: 23 },
  { severity: 'LOW', count: 3, percentage: 5 },
];

const mockRecentIssues = [
  ['CRITICAL', 'SQL_INJECTION', 'src/db/payment.ts', '사용자 입력이 SQL 쿼리에 직접 포함됩니다.'],
  ['HIGH', 'UNSAFE_FORMATSTRING', 'src/utils/logger.ts', '검증되지 않은 포맷 문자열을 사용합니다.'],
  [
    'HIGH',
    'HARDCODED_CREDENTIALS',
    'src/config/client.ts',
    '인증 정보가 코드에 포함되어 있습니다.',
  ],
  ['MEDIUM', 'CROSS_SITE_SCRIPTING', 'src/routes/profile.tsx', '사용자 입력이 HTML로 출력됩니다.'],
  ['LOW', 'MISSING_RATE_LIMIT', 'src/api/auth.ts', '요청 제한이 설정되지 않았습니다.'],
];

function MockSidebar() {
  return (
    <aside className="md:top-header bg-surface max-md:border-border-subtle md:border-border-subtle flex shrink-0 max-md:h-12 max-md:w-full max-md:items-center max-md:gap-1 max-md:border-b max-md:px-3 md:sticky md:h-[calc(100dvh-var(--spacing-header))] md:w-64 md:flex-col md:gap-4 md:border-r md:px-3 md:py-4">
      <div className="text-label-lg text-foreground-secondary flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 max-md:hidden">
        <span aria-hidden="true">←</span>
        <span>Back to Repositories</span>
      </div>
      <div className="border-border-subtle border-t max-md:hidden" />
      <nav
        className="flex gap-1 max-md:min-w-0 max-md:flex-1 md:flex-col"
        aria-label="레포지토리 상세 메뉴"
      >
        <div className="text-label-lg bg-blue/10 text-blue flex items-center gap-2 rounded-lg px-3 py-2 max-md:flex-1 max-md:justify-center">
          <Image
            src={OverviewIcon}
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className="icon-blue"
          />
          Overview
        </div>
        <div className="text-label-lg text-foreground-secondary flex items-center gap-2 rounded-lg px-3 py-2 max-md:flex-1 max-md:justify-center">
          <Image
            src={IssueIcon}
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className="icon-gray"
          />
          Issues
        </div>
      </nav>
    </aside>
  );
}

function MockRecentIssues() {
  return (
    <section className="border-border-subtle bg-surface rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground-tertiary text-xs font-semibold tracking-[0.08em]">
            RECENT ISSUES
          </h2>
          <p className="text-body-sm text-foreground-secondary mt-1">전체 64개 중 최근 5개</p>
        </div>
        <span className="text-label-sm text-blue shrink-0">전체 보기</span>
      </div>
      <div className="scrollbar-custom-gray overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left">
          <thead>
            <tr className="border-border-subtle border-b">
              {['취약도', '이슈', '파일 위치', '설명'].map((label) => (
                <th
                  key={label}
                  className="text-label-sm text-foreground-tertiary px-3 pb-3 font-medium"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockRecentIssues.map(([severity, issue, filePath, summary]) => (
              <tr key={issue} className="border-border-subtle border-b last:border-0">
                <td className="text-label-sm text-foreground-secondary px-3 py-3">{severity}</td>
                <td className="text-body-sm text-foreground max-w-52 truncate px-3 py-3">
                  {issue}
                </td>
                <td className="text-body-sm text-foreground-secondary max-w-60 truncate px-3 py-3">
                  {filePath}
                </td>
                <td className="text-body-sm text-foreground-secondary max-w-72 truncate px-3 py-3">
                  {summary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function IssuesByTypePreviewPage() {
  return (
    <div className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-1 overflow-hidden">
      <MockSidebar />
      <div className="bg-canvas min-h-[calc(100dvh-var(--spacing-header))] min-w-0 flex-1 overflow-auto px-5 py-7 md:h-[calc(100dvh-var(--spacing-header))] md:px-8 md:py-9">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
          <div className="border-border-subtle bg-surface-subtle text-body-sm text-foreground-secondary rounded-lg border px-4 py-2">
            목업 데이터 · 이슈 유형 12개
          </div>
          <RepositoryDashboardHeader
            owner="secause"
            name="payment-service"
            githubUrl="https://github.com/secause/payment-service"
          />
          <CodeDetailsCard
            codeDetails={{
              branch: 'main',
              fileCount: 128,
              lineCount: 12_400,
              languages: ['TypeScript', 'Python'],
            }}
            lastAnalysisAt={new Date().toISOString()}
          />
          <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
            <SeverityBreakdownChart breakdown={mockSeverityBreakdown} totalIssues={64} />
            <IssuesByTypeCard issuesByType={mockIssuesByType} />
          </div>
          <MockRecentIssues />
        </div>
      </div>
    </div>
  );
}
