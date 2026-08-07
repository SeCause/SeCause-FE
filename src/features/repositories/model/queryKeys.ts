import type { IssueSeverity, RepositoryIssueListParams, RepositoryListParams } from './types';

// 클라이언트 훅(useRepositoriesApi)과 서버 컴포넌트의 prefetchQuery가 동일한 쿼리 키를
// 참조해야 hydration이 올바르게 연결되므로, 키 생성 로직을 여기 한 곳에 모아둔다.
export const repositoriesKey = (params?: RepositoryListParams) => ['repositories', params] as const;

export const repositoryDashboardKey = (repositoryId: number) =>
  ['repositories', repositoryId] as const;

export const repositoryIssuesKey = (repositoryId: number, params?: RepositoryIssueListParams) =>
  ['repositories', repositoryId, 'issues', params] as const;

export const repositoryIssueFilesKey = (repositoryId: number, severity?: IssueSeverity | 'ALL') =>
  ['repositories', repositoryId, 'issue-files', severity] as const;

export const repositoryIssueDetailKey = (repositoryId: number, analysisResultId: number) =>
  ['repositories', repositoryId, 'issues', analysisResultId] as const;
