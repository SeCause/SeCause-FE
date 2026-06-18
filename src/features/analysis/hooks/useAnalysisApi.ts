'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getAnalysisRepositories,
  getGithubAccounts,
  getGithubBranches,
  postAnalysisRequest,
} from '@/features/analysis/api/analysis';
import type { AnalysisRequestParams, AnalysisRequestResult } from '@/features/analysis/model/types';

export function useGithubAccounts() {
  return useQuery({
    queryKey: ['analysisAccounts'],
    queryFn: getGithubAccounts,
  });
}

export function useAnalysisRepositories(accountName: string | null) {
  return useQuery({
    queryKey: ['analysisRepositories', accountName],
    queryFn: () => {
      if (!accountName) throw new Error('Account name is required');
      return getAnalysisRepositories(accountName);
    },
    enabled: accountName !== null,
  });
}

export function useGithubBranches(ownerName: string | null, repositoryName: string | null) {
  return useQuery({
    queryKey: ['githubBranches', ownerName, repositoryName],
    queryFn: () => {
      if (!ownerName || !repositoryName) {
        throw new Error('Owner name and repository name are required');
      }
      return getGithubBranches(ownerName, repositoryName);
    },
    enabled: ownerName !== null && repositoryName !== null,
  });
}

export function useCreateAnalysisRequest() {
  return useMutation<AnalysisRequestResult, Error, AnalysisRequestParams>({
    mutationFn: postAnalysisRequest,
  });
}
