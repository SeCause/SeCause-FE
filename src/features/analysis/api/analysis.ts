import type {
  AnalysisRepository,
  AnalysisRequestParams,
  AnalysisRequestResult,
  GithubAccount,
  GithubBranch,
} from '@/features/analysis/model/types';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export async function getGithubAccounts(): Promise<GithubAccount[]> {
  const res = await apiClient.get<{ accounts: GithubAccount[] }>(ENDPOINTS.analysis.accounts);
  return res.result.accounts;
}

export async function getAnalysisRepositories(accountName: string): Promise<AnalysisRepository[]> {
  const res = await apiClient.get<{ repositories: AnalysisRepository[] }>(
    ENDPOINTS.analysis.repositories,
    { searchParams: { accountName } },
  );
  return res.result.repositories;
}

export async function getGithubBranches(
  ownerName: string,
  repositoryName: string,
): Promise<GithubBranch[]> {
  const res = await apiClient.get<{ branches: GithubBranch[] }>(
    ENDPOINTS.analysis.branches(ownerName, repositoryName),
  );
  return res.result.branches;
}

export async function postAnalysisRequest(
  body: AnalysisRequestParams,
): Promise<AnalysisRequestResult> {
  const res = await apiClient.post<AnalysisRequestResult>(ENDPOINTS.analysis.request, {
    json: body,
  });
  return res.result;
}
