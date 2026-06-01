export type AnalysisStatus = 'COMPLETED' | 'IN_PROGRESS' | 'FAILED' | 'PENDING';

export interface RepositoryAnalysis {
  analysisId: number;
  analysisStatus: AnalysisStatus;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  totalIssues: number;
  completedAt: string;
}

export interface Repository {
  repositoryId: number;
  title: string;
  githubLink: string;
  branch: string;
  totalFiles: number;
  createdAt: string;
  analysis: RepositoryAnalysis | null;
}

export interface RepositoryListResult {
  content: Repository[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
