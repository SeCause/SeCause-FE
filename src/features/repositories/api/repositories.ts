import type {
  RepositoryDashboard,
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
