export type AnalysisStep = 'repo' | 'branch';

export type GithubAccountType = 'PERSONAL' | 'ORGANIZATION';

export interface GithubAccount {
  name: string;
  type: GithubAccountType;
}

export interface AnalysisRepository {
  name: string;
  owner: string;
  defaultBranch: string;
  githubUrl: string;
  private: boolean;
}

export interface GithubBranch {
  name: string;
}

export interface AnalysisRequestParams {
  owner: string;
  repositoryName: string;
  branch: string;
}

export type AnalysisRequestStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface AnalysisRequestResult {
  analysisId: number;
  repositoryId: number;
  analysisStatus: AnalysisRequestStatus;
}

export interface AnalysisStatusResult {
  analysisId: number;
  analysisStatus: AnalysisRequestStatus;
  progressPercent: number;
  failureReason: string | null;
}
