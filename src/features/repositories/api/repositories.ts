import type {
  IssueSeverity,
  RepositoryDashboard,
  RepositoryIssueDetail,
  RepositoryIssueFile,
  RepositoryIssueListParams,
  RepositoryIssueListResult,
  RepositoryListParams,
  RepositoryListResult,
} from '@/features/repositories/model/types';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export async function getRepositories(
  params?: RepositoryListParams,
): Promise<RepositoryListResult> {
  const res = await apiClient.get<RepositoryListResult>(ENDPOINTS.repositories.list, {
    searchParams: params as Record<string, string>,
  });
  return res.result;
}

export async function getRepositoryDashboard(repositoryId: number): Promise<RepositoryDashboard> {
  const res = await apiClient.get<RepositoryDashboard>(
    ENDPOINTS.repositories.dashboard(repositoryId),
  );
  return res.result;
}

export async function deleteRepository(repositoryId: number): Promise<void> {
  await apiClient.delete(ENDPOINTS.repositories.delete(repositoryId));
}

export async function getRepositoryIssues(
  repositoryId: number,
  params?: RepositoryIssueListParams,
): Promise<RepositoryIssueListResult> {
  const res = await apiClient.get<RepositoryIssueListResult>(ENDPOINTS.issues.list(repositoryId), {
    searchParams: params as Record<string, string>,
  });
  return res.result;
}

export async function getRepositoryIssueFiles(
  repositoryId: number,
  severity?: IssueSeverity | 'ALL',
): Promise<RepositoryIssueFile[]> {
  const res = await apiClient.get<RepositoryIssueFile[] | { files: RepositoryIssueFile[] }>(
    ENDPOINTS.issues.files(repositoryId),
    {
      searchParams: severity && severity !== 'ALL' ? { severity } : undefined,
    },
  );
  return Array.isArray(res.result) ? res.result : res.result.files;
}

export async function getRepositoryIssueDetail(
  repositoryId: number,
  analysisResultId: number,
): Promise<RepositoryIssueDetail> {
  const res = await apiClient.get<RepositoryIssueDetail>(
    ENDPOINTS.issues.detail(repositoryId, analysisResultId),
  );
  return res.result;
}
