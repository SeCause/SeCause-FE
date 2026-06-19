import type {
  RepositoryDashboard,
  RepositoryIssueDetail,
  RepositoryIssueFile,
} from '@/features/repositories/model/types';

const TWO_DAYS_AGO = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString();

export const MOCK_DASHBOARD: RepositoryDashboard = {
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
  summary: { totalIssues: 100 },
  issuesByType: [
    { type: 'SQL Injection', severity: 'CRITICAL', count: 12 },
    { type: 'Cross-Site Scripting', severity: 'HIGH', count: 29 },
    { type: 'Insecure Deserialization', severity: 'MEDIUM', count: 38 },
    { type: 'Outdated Dependency', severity: 'LOW', count: 21 },
  ],
  severityBreakdown: [
    { severity: 'CRITICAL', count: 12, percentage: 12 },
    { severity: 'HIGH', count: 29, percentage: 29 },
    { severity: 'MEDIUM', count: 38, percentage: 38 },
    { severity: 'LOW', count: 21, percentage: 21 },
  ],
};

export const MOCK_ISSUE_DETAIL: RepositoryIssueDetail = {
  analysisResultId: 1,
  vulnerabilityType: 'SQL Injection',
  severity: 'CRITICAL',
  filePath: 'auth/login.php',
  lineStart: 16,
  lineEnd: 18,
  codeSnippet:
    '$username = $_GET["username"];\n$query = "SELECT * FROM users WHERE name = \'$username\'";\n$result = mysql_query($query);',
  description: '사용자 입력값을 검증하거나 바인딩하지 않고 SQL 쿼리에 직접 삽입하고 있습니다.',
  summary: '사용자 입력값이 SQL 쿼리에 직접 삽입되어 SQL Injection이 발생할 수 있습니다.',
  attackScenario:
    "username=' OR '1'='1' -- 입력 시 조건문이 항상 참이 되어 인증 우회가 발생할 수 있습니다.",
  fixCode:
    '$stmt = $pdo->prepare("SELECT * FROM users WHERE name = ?");\n$stmt->execute([$username]);',
  fixSummary:
    'Prepared Statement를 사용해 쿼리와 사용자 입력값을 분리하고, 입력값은 바인딩 방식으로 처리하세요.',
  references: [],
};

export const MOCK_FILES: RepositoryIssueFile[] = [
  { filePath: 'auth/login.php', issueCount: 2 },
  { filePath: 'utils/db.py', issueCount: 1 },
  { filePath: 'api/payment.ts', issueCount: 1 },
];

export const ACCOUNT_OPTIONS = [{ value: 'secure-corp', label: 'secure-corp' }];
export const REPO_OPTIONS = ['secure-app', 'payment-api', 'admin-dashboard'];
