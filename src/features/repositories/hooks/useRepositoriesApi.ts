'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteRepository,
  getRepositories,
  getRepositoryDashboard,
  getRepositoryIssueDetail,
  getRepositoryIssueFiles,
  getRepositoryIssues,
} from '@/features/repositories/api/repositories';
import type {
  IssueSeverity,
  RepositoryIssueListParams,
  RepositoryListParams,
} from '@/features/repositories/model/types';

const repositoriesKey = (params?: RepositoryListParams) => ['repositories', params] as const;
const repositoryDashboardKey = (repositoryId: number) => ['repositories', repositoryId] as const;
const repositoryIssuesKey = (repositoryId: number, params?: RepositoryIssueListParams) =>
  ['repositories', repositoryId, 'issues', params] as const;
const repositoryIssueFilesKey = (repositoryId: number, severity?: IssueSeverity | 'ALL') =>
  ['repositories', repositoryId, 'issue-files', severity] as const;
const repositoryIssueDetailKey = (repositoryId: number, analysisResultId: number) =>
  ['repositories', repositoryId, 'issues', analysisResultId] as const;

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

export function useRepositoryIssues(
  repositoryId: number,
  params?: RepositoryIssueListParams,
  { enabled = true }: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: repositoryIssuesKey(repositoryId, params),
    queryFn: () => getRepositoryIssues(repositoryId, params),
    enabled,
  });
}

export function useRepositoryIssueFiles(repositoryId: number, severity?: IssueSeverity | 'ALL') {
  return useQuery({
    queryKey: repositoryIssueFilesKey(repositoryId, severity),
    queryFn: () => getRepositoryIssueFiles(repositoryId, severity),
  });
}

export function useRepositoryIssueDetail(
  repositoryId: number,
  analysisResultId: number,
  { enabled = true }: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: repositoryIssueDetailKey(repositoryId, analysisResultId),
    queryFn: () => getRepositoryIssueDetail(repositoryId, analysisResultId),
    enabled,
  });
}
