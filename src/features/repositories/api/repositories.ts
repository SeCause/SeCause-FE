import {
  getMockRepositoryIssueDetail,
  getMockRepositoryIssueFiles,
  getMockRepositoryIssues,
  mockRepositoryDashboard,
} from '@/features/repositories/model/mockRepositoryData';
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

const USE_REPOSITORY_MOCK =
  process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_REPOSITORY_MOCK !== 'false';

export async function getRepositories(
  params?: RepositoryListParams,
): Promise<RepositoryListResult> {
  const res = await apiClient.get<RepositoryListResult>(ENDPOINTS.repositories.list, {
    searchParams: params as Record<string, string>,
  });
  return res.result;
}

export async function getRepositoryDashboard(repositoryId: number): Promise<RepositoryDashboard> {
  if (USE_REPOSITORY_MOCK) {
    return { ...mockRepositoryDashboard, repositoryId };
  }

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
  if (USE_REPOSITORY_MOCK) {
    return getMockRepositoryIssues(params);
  }

  const res = await apiClient.get<RepositoryIssueListResult>(ENDPOINTS.issues.list(repositoryId), {
    searchParams: params as Record<string, string>,
  });
  return res.result;
}

export async function getRepositoryIssueFiles(
  repositoryId: number,
  severity?: IssueSeverity | 'ALL',
): Promise<RepositoryIssueFile[]> {
  if (USE_REPOSITORY_MOCK) {
    return getMockRepositoryIssueFiles(severity);
  }

  const res = await apiClient.get<RepositoryIssueFile[]>(ENDPOINTS.issues.files(repositoryId), {
    searchParams: severity && severity !== 'ALL' ? { severity } : undefined,
  });
  return res.result;
}

export async function getRepositoryIssueDetail(
  repositoryId: number,
  analysisResultId: number,
): Promise<RepositoryIssueDetail> {
  if (USE_REPOSITORY_MOCK) {
    return getMockRepositoryIssueDetail(analysisResultId);
  }

  const res = await apiClient.get<RepositoryIssueDetail>(
    ENDPOINTS.issues.detail(repositoryId, analysisResultId),
  );
  return res.result;
}
