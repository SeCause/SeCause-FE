import type {
  IssueSeverity,
  RepositoryDashboard,
  RepositoryIssue,
  RepositoryIssueDetail,
  RepositoryIssueFile,
  RepositoryIssueListParams,
  RepositoryIssueListResult,
} from './types';

const issueTemplates: Array<{
  vulnerabilityType: string;
  severity: IssueSeverity;
  filePath: string;
  lineStart: number;
  lineEnd: number;
  summary: string;
}> = [
  {
    vulnerabilityType: 'SQL Injection',
    severity: 'CRITICAL',
    filePath: 'src/utils/database.ts',
    lineStart: 25,
    lineEnd: 29,
    summary: '현재 코드에서 사용자 입력값이 검증 없이 SQL 쿼리에 직접 사용되고 있습니다.',
  },
  {
    vulnerabilityType: 'SQL Injection',
    severity: 'HIGH',
    filePath: 'src/services/userRepository.ts',
    lineStart: 42,
    lineEnd: 48,
    summary:
      '문자열 결합으로 생성한 쿼리가 외부 입력을 포함해 공격자가 데이터를 조회할 수 있습니다.',
  },
  {
    vulnerabilityType: 'Path Traversal',
    severity: 'MEDIUM',
    filePath: 'src/app/api/files/route.ts',
    lineStart: 18,
    lineEnd: 24,
    summary: '파일 경로 입력값이 정규화되지 않아 의도하지 않은 디렉터리 접근 가능성이 있습니다.',
  },
  {
    vulnerabilityType: 'Hardcoded Secret',
    severity: 'CRITICAL',
    filePath: 'src/config/payment.ts',
    lineStart: 9,
    lineEnd: 9,
    summary: '소스 코드에 민감한 키가 직접 포함되어 저장소 노출 시 인증 정보가 유출될 수 있습니다.',
  },
  {
    vulnerabilityType: 'Cross-site Scripting',
    severity: 'HIGH',
    filePath: 'src/components/comment/Preview.tsx',
    lineStart: 33,
    lineEnd: 38,
    summary: '사용자 작성 HTML을 이스케이프 없이 렌더링해 스크립트 실행 위험이 있습니다.',
  },
  {
    vulnerabilityType: 'Weak Password Policy',
    severity: 'LOW',
    filePath: 'src/features/auth/lib/password.ts',
    lineStart: 12,
    lineEnd: 16,
    summary: '비밀번호 검증 조건이 낮아 추측 공격에 취약한 계정이 생성될 수 있습니다.',
  },
];

export const mockRepositoryDashboard: RepositoryDashboard = {
  repositoryId: 1,
  owner: 'SeCause',
  name: 'frontend',
  fullName: 'SeCause/frontend',
  description: 'Security analysis dashboard mock repository',
  githubUrl: 'https://github.com/SeCause/frontend',
  codeDetails: {
    branch: 'main',
    fileCount: 128,
    lineCount: 18420,
    languages: ['TypeScript', 'JavaScript', 'CSS'],
  },
  analysis: {
    status: 'COMPLETED',
    progressPercent: 100,
    requestedAt: '2026-06-18T11:20:00Z',
    completedAt: '2026-06-18T11:24:31Z',
    failureReason: null,
  },
  summary: {
    totalIssues: 22,
  },
  issuesByType: [
    { type: 'SQL Injection', severity: 'CRITICAL', count: 8 },
    { type: 'Cross-site Scripting', severity: 'HIGH', count: 5 },
    { type: 'Path Traversal', severity: 'MEDIUM', count: 4 },
    { type: 'Hardcoded Secret', severity: 'CRITICAL', count: 3 },
    { type: 'Weak Password Policy', severity: 'LOW', count: 2 },
  ],
  severityBreakdown: [
    { severity: 'CRITICAL', count: 11, percentage: 50 },
    { severity: 'HIGH', count: 6, percentage: 27 },
    { severity: 'MEDIUM', count: 3, percentage: 14 },
    { severity: 'LOW', count: 2, percentage: 9 },
  ],
};

export const mockRepositoryIssues: RepositoryIssue[] = Array.from({ length: 22 }, (_, index) => {
  const template =
    index < 9
      ? issueTemplates[0]
      : index < 16
        ? issueTemplates[1]
        : issueTemplates[(index - 16) % issueTemplates.length];

  return {
    analysisResultId: index + 1,
    vulnerabilityType: template.vulnerabilityType,
    severity: template.severity,
    filePath: template.filePath,
    lineStart: template.lineStart + Math.floor(index / issueTemplates.length) * 7,
    lineEnd: template.lineEnd + Math.floor(index / issueTemplates.length) * 7,
    summary: template.summary,
  };
});

const vulnerableSqlCode = `const query =
  "SELECT * FROM users WHERE username = '" +
  username +
  "' AND password = '" +
  password +
  "'";
const result = await db.query(query);`;

const fixedSqlCode = `const query =
  "SELECT * FROM users WHERE username = ? AND password = ?";
const result = await db.query(query, [username, password]);`;

const getDetailCopy = (issue: RepositoryIssue) => {
  if (issue.vulnerabilityType === 'SQL Injection') {
    return {
      codeSnippet: vulnerableSqlCode,
      description:
        '사용자 입력값을 SQL 문자열에 직접 결합하면 입력값이 쿼리 구조로 해석될 수 있습니다.',
      attackScenario: `username: admin' --\npassword: anything`,
      fixCode: fixedSqlCode,
      fixSummary:
        'Prepared Statement 방식으로 쿼리와 파라미터를 분리하고, 입력값이 쿼리 구조를 바꾸지 못하게 합니다.',
    };
  }

  if (issue.vulnerabilityType === 'Cross-site Scripting') {
    return {
      codeSnippet: `return <div dangerouslySetInnerHTML={{ __html: comment.html }} />;`,
      description:
        '신뢰할 수 없는 HTML을 그대로 삽입하면 브라우저에서 악성 스크립트가 실행될 수 있습니다.',
      attackScenario: `<img src=x onerror="fetch('/api/session')">`,
      fixCode: `return <p>{comment.text}</p>;`,
      fixSummary:
        '가능하면 텍스트 렌더링을 사용하고, HTML이 필요하다면 허용 태그 기반으로 정제한 뒤 렌더링합니다.',
    };
  }

  return {
    codeSnippet: `const value = request.nextUrl.searchParams.get('value');\nreturn await run(value);`,
    description:
      '외부 입력값에 대한 검증과 제한이 부족해 의도하지 않은 동작으로 이어질 수 있습니다.',
    attackScenario: `value: ../../../../etc/passwd`,
    fixCode: `const value = validateInput(request.nextUrl.searchParams.get('value'));\nreturn await run(value);`,
    fixSummary: '입력값을 허용 목록으로 검증하고, 처리 가능한 값만 내부 로직으로 전달합니다.',
  };
};

export function getMockRepositoryIssues(
  params?: RepositoryIssueListParams,
): RepositoryIssueListResult {
  const page = params?.page ?? 1;
  const size = params?.size ?? 20;
  const filtered = mockRepositoryIssues.filter((issue) => {
    const matchesSeverity =
      !params?.severity || params.severity === 'ALL' || issue.severity === params.severity;
    const matchesFile = !params?.filePath || issue.filePath === params.filePath;

    return matchesSeverity && matchesFile;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const start = (page - 1) * size;
  const content = filtered.slice(start, start + size);

  return {
    content,
    page,
    size,
    totalElements: filtered.length,
    totalPages,
    hasNext: page < totalPages,
  };
}

export function getMockRepositoryIssueFiles(
  severity?: IssueSeverity | 'ALL',
): RepositoryIssueFile[] {
  const filtered = mockRepositoryIssues.filter(
    (issue) => !severity || severity === 'ALL' || issue.severity === severity,
  );
  const countByFilePath = filtered.reduce<Record<string, number>>((acc, issue) => {
    acc[issue.filePath] = (acc[issue.filePath] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(countByFilePath).map(([filePath, issueCount]) => ({
    filePath,
    issueCount,
  }));
}

export function getMockRepositoryIssueDetail(analysisResultId: number): RepositoryIssueDetail {
  const issue =
    mockRepositoryIssues.find((item) => item.analysisResultId === analysisResultId) ??
    mockRepositoryIssues[0];
  const copy = getDetailCopy(issue);

  return {
    ...issue,
    ...copy,
    references: [
      {
        securityReferenceId: analysisResultId * 10 + 1,
        referenceType: 'OWASP',
        title: `OWASP: ${issue.vulnerabilityType}`,
        referenceUrl: 'https://owasp.org/www-project-top-ten/',
      },
      {
        securityReferenceId: analysisResultId * 10 + 2,
        referenceType: 'CWE',
        title: 'CWE vulnerability reference',
        referenceUrl: 'https://cwe.mitre.org/',
      },
    ],
  };
}
