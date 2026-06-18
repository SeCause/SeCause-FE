'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteRepository,
  getRepositories,
  getRepositoryDashboard,
} from '@/features/repositories/api/repositories';
import type { RepositoryListParams } from '@/features/repositories/model/types';

const repositoriesKey = (params?: RepositoryListParams) => ['repositories', params] as const;
const repositoryDashboardKey = (repositoryId: number) => ['repositories', repositoryId] as const;

export function useRepositories(params?: RepositoryListParams) {
  return useQuery({
    queryKey: repositoriesKey(params),
    queryFn: () => getRepositories(params),
  });
}

export function useRepositoryDashboard(
  repositoryId: number,
  { enabled = true }: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: repositoryDashboardKey(repositoryId),
    queryFn: () => getRepositoryDashboard(repositoryId),
    enabled,
  });
}

export function useDeleteRepository() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (repositoryId: number) => deleteRepository(repositoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repositories'] });
    },
  });
}
