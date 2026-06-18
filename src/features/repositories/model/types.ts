export type AnalysisStatus = 'COMPLETED' | 'IN_PROGRESS' | 'FAILED' | 'PENDING';

export type RepositoryDetailTab = 'overview' | 'issues';

export type IssueSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface RepositoryIssueCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface Repository {
  repositoryId: number;
  owner: string;
  name: string;
  fullName: string;
  branch: string;
  fileCount: number;
  lineCount: number;
  languages: string[];
  issueCounts: RepositoryIssueCounts;
  analysisStatus: AnalysisStatus;
  progressPercent: number;
  analysisRequestedAt: string;
  completedAt: string | null;
}

export interface RepositoryListParams {
  accountName?: string;
  keyword?: string;
}

export interface RepositoryListResult {
  repositories: Repository[];
}

export interface RepositoryCodeDetails {
  branch: string;
  fileCount: number;
  lineCount: number;
  languages: string[];
}

export interface RepositoryDashboardAnalysis {
  status: AnalysisStatus;
  progressPercent: number;
  requestedAt: string;
  completedAt: string | null;
  failureReason: string | null;
}

export interface RepositoryIssueTypeCount {
  type: string;
  severity: IssueSeverity;
  count: number;
}

export interface RepositorySeverityCount {
  severity: IssueSeverity;
  count: number;
  percentage: number;
}

export interface RepositoryDashboard {
  repositoryId: number;
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  githubUrl: string;
  codeDetails: RepositoryCodeDetails;
  analysis: RepositoryDashboardAnalysis;
  summary: {
    totalIssues: number;
  };
  issuesByType: RepositoryIssueTypeCount[];
  severityBreakdown: RepositorySeverityCount[];
}

export interface RepositoryIssue {
  analysisResultId: number;
  vulnerabilityType: string;
  severity: IssueSeverity;
  filePath: string;
  lineStart: number;
  lineEnd: number;
  summary: string;
}

export interface RepositoryIssueListParams {
  severity?: IssueSeverity | 'ALL';
  page?: number;
  size?: number;
}

export interface RepositoryIssueListResult {
  content: RepositoryIssue[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
