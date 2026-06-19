'use client';

import Image from 'next/image';
import { type ReactNode, useState } from 'react';

import AnalysisSidebar from '@/features/analysis/ui/AnalysisSidebar';
import RepoIcon from '@/features/analysis/ui/RepoIcon';
import type {
  RepositoryDashboard,
  RepositoryIssueDetail,
  RepositoryIssueFile,
} from '@/features/repositories/model/types';
import CodeDetailsCard from '@/features/repositories/ui/dashboard/CodeDetailsCard';
import IssuesByTypeCard from '@/features/repositories/ui/dashboard/IssuesByTypeCard';
import IssueSummaryCards from '@/features/repositories/ui/dashboard/IssueSummaryCards';
import RepositoryDashboardHeader from '@/features/repositories/ui/dashboard/RepositoryDashboardHeader';
import SeverityBreakdownChart from '@/features/repositories/ui/dashboard/SeverityBreakdownChart';
import CodeDiffView from '@/features/repositories/ui/issues/CodeDiffView';
import IssueFileTabs from '@/features/repositories/ui/issues/IssueFileTabs';
import SeverityBadge from '@/features/repositories/ui/SeverityBadge';
import GithubIcon from '@/icons/icon_github.svg';
import { SECTION_IDS } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import Dropdown from '@/shared/ui/Dropdown';
import SearchBar from '@/shared/ui/SearchBar';

const TABS = ['Analysis Request', 'Repo Overview', 'Issue Detail'] as const;

const TWO_DAYS_AGO = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString();

const MOCK_DASHBOARD: RepositoryDashboard = {
  repositoryId: 1,
  owner: 'secure-corp',
  name: 'secure-app',
  fullName: 'secure-corp/secure-app',
  description: null,
  githubUrl: '#',
  codeDetails: {
    branch: 'main',
    fileCount: 128,
    lineCount: 12400,
    languages: ['TypeScript', 'Python'],
  },
  analysis: {
    status: 'COMPLETED',
    progressPercent: 100,
    requestedAt: TWO_DAYS_AGO,
    completedAt: TWO_DAYS_AGO,
    failureReason: null,
  },
  summary: { totalIssues: 24 },
  issuesByType: [
    { type: 'SQL Injection', severity: 'CRITICAL', count: 3 },
    { type: 'Cross-Site Scripting', severity: 'HIGH', count: 7 },
    { type: 'Insecure Deserialization', severity: 'MEDIUM', count: 9 },
    { type: 'Outdated Dependency', severity: 'LOW', count: 5 },
  ],
  severityBreakdown: [
    { severity: 'CRITICAL', count: 3, percentage: 12.5 },
    { severity: 'HIGH', count: 7, percentage: 29.2 },
    { severity: 'MEDIUM', count: 9, percentage: 37.5 },
    { severity: 'LOW', count: 5, percentage: 20.8 },
  ],
};

const MOCK_ISSUE_DETAIL: RepositoryIssueDetail = {
  analysisResultId: 1,
  vulnerabilityType: 'SQL Injection',
  severity: 'CRITICAL',
  filePath: 'auth/login.php',
  lineStart: 16,
  lineEnd: 18,
  codeSnippet: '$query = $_GET["q"];\n$result = mysql_query($query);',
  description: '사용자 입력값을 검증 없이 쿼리에 그대로 삽입하고 있습니다.',
  summary: '사용자 입력값이 검증 없이 쿼리에 그대로 삽입되고 있습니다.',
  attackScenario: "q=' OR '1'='1",
  fixCode:
    '$stmt = $pdo->prepare("SELECT * FROM users WHERE name = ?");\n$stmt->execute([$query]);',
  fixSummary: 'Prepared Statement로 쿼리를 분리하고 입력값을 바인딩하세요.',
  references: [],
};

const MOCK_FILES: RepositoryIssueFile[] = [
  { filePath: 'auth/login.php', issueCount: 2 },
  { filePath: 'utils/db.py', issueCount: 1 },
  { filePath: 'api/payment.ts', issueCount: 1 },
];

const ACCOUNT_OPTIONS = [{ value: 'secure-corp', label: 'secure-corp' }];
const REPO_OPTIONS = ['secure-app', 'payment-api', 'admin-dashboard'];

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-gray-200 bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50">{children}</div>
    </div>
  );
}

function AnalysisRequestPreview() {
  return (
    <BrowserFrame>
      <div className="pointer-events-none w-full px-4 py-4 select-none sm:px-6 sm:py-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-heading-md text-gray-900">New Project</h1>
            <p className="text-body-md text-gray-700">
              보안 분석을 진행할 GitHub 저장소를 선택해주세요.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_180px] lg:items-start lg:gap-8">
            <div className="rounded-2xl border border-gray-300 bg-gray-100/40 p-4 sm:p-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-label-md text-gray-900">Select Github Account</p>
                  <Dropdown
                    options={ACCOUNT_OPTIONS}
                    value={ACCOUNT_OPTIONS[0].value}
                    onChange={() => {}}
                    leadingIcon={
                      <Image
                        src={GithubIcon}
                        width={20}
                        height={20}
                        alt=""
                        aria-hidden="true"
                        className="brightness-0"
                      />
                    }
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-label-md text-gray-900">Import Git Repository</p>
                  <SearchBar onChange={() => {}} placeholder="Search for repositories" />
                  <ul className="flex flex-col gap-2">
                    {REPO_OPTIONS.map((name, idx) => (
                      <li key={name}>
                        <button
                          className={cn(
                            'text-body-md flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-2 text-left font-medium transition-colors',
                            idx === 0
                              ? 'border-blue bg-blue/5 text-blue font-semibold'
                              : 'border-gray-300 text-gray-900',
                          )}
                        >
                          <RepoIcon name={name} />
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <AnalysisSidebar label="Select Repository" disabled={false} onClick={() => {}} />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function RepoOverviewPreview() {
  const criticalIssues =
    MOCK_DASHBOARD.severityBreakdown.find((item) => item.severity === 'CRITICAL')?.count ?? 0;

  return (
    <BrowserFrame>
      <div className="pointer-events-none w-full px-4 py-4 select-none sm:px-6 sm:py-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <RepositoryDashboardHeader
            owner={MOCK_DASHBOARD.owner}
            name={MOCK_DASHBOARD.name}
            githubUrl={MOCK_DASHBOARD.githubUrl}
          />

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
            <SeverityBreakdownChart breakdown={MOCK_DASHBOARD.severityBreakdown} />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function IssueDetailPreview() {
  return (
    <BrowserFrame>
      <div className="pointer-events-none w-full px-4 py-4 select-none sm:px-6 sm:py-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <RepositoryDashboardHeader
            owner={MOCK_DASHBOARD.owner}
            name={MOCK_DASHBOARD.name}
            githubUrl={MOCK_DASHBOARD.githubUrl}
          />

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[8rem_1fr]">
            <IssueFileTabs
              files={MOCK_FILES}
              selectedFilePath={MOCK_FILES[0].filePath}
              isLoading={false}
              isError={false}
              onSelect={() => {}}
            />

            <div className="flex flex-col gap-1 rounded-xl border border-gray-200 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                    <SeverityBadge severity={MOCK_ISSUE_DETAIL.severity} />
                    <span className="text-label-lg text-gray-900">
                      {MOCK_ISSUE_DETAIL.vulnerabilityType}
                    </span>
                    <span className="text-body-sm truncate text-gray-500">
                      {MOCK_ISSUE_DETAIL.filePath}:{MOCK_ISSUE_DETAIL.lineStart}-
                      {MOCK_ISSUE_DETAIL.lineEnd}
                    </span>
                  </div>
                  <p className="text-body-md mt-2 text-gray-700">{MOCK_ISSUE_DETAIL.summary}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                <CodeDiffView
                  oldCode={MOCK_ISSUE_DETAIL.codeSnippet}
                  newCode={MOCK_ISSUE_DETAIL.fixCode}
                  startLine={MOCK_ISSUE_DETAIL.lineStart}
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-label-lg mb-2 text-gray-900">
                      취약점: {MOCK_ISSUE_DETAIL.vulnerabilityType}
                    </p>
                    <p className="text-body-md text-gray-700">
                      <span className="font-semibold">원인:</span> {MOCK_ISSUE_DETAIL.description}
                    </p>
                    <p className="text-body-md mt-3 text-gray-700">
                      <span className="font-semibold">공격 예시:</span>
                    </p>
                    <p className="text-body-sm mt-1 rounded bg-gray-50 p-3 font-mono text-gray-700">
                      {MOCK_ISSUE_DETAIL.attackScenario}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-label-lg mb-2 text-gray-900">수정 방법</p>
                    <p className="text-body-md text-gray-700">{MOCK_ISSUE_DETAIL.fixSummary}</p>
                    <pre className="text-body-sm mt-2 rounded bg-gray-50 p-3 font-mono wrap-break-word whitespace-pre-wrap text-gray-700">
                      {MOCK_ISSUE_DETAIL.fixCode}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

const TAB_PREVIEWS = [AnalysisRequestPreview, RepoOverviewPreview, IssueDetailPreview];

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState(0);
  const ActivePreview = TAB_PREVIEWS[activeTab];

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-header flex h-[calc(100dvh-var(--spacing-header))] items-center px-6 md:px-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <h2 className="text-heading-lg text-center">How it works</h2>

        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="flex flex-row gap-2 md:flex-col md:gap-3">
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`text-label-md rounded-xl border px-4 py-2.5 text-left transition-all max-sm:text-center md:w-40 ${
                  activeTab === idx
                    ? 'border-blue text-blue bg-blue/5'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="h-112 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md md:h-135 md:flex-1">
            <ActivePreview />
          </div>
        </div>
      </div>
    </section>
  );
}
