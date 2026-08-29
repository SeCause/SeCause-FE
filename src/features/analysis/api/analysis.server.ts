import type { GithubAccount } from '@/features/analysis/model/types';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { serverApiGet } from '@/shared/api/server';

export async function getGithubAccountsServer(): Promise<GithubAccount[]> {
  const { accounts } = await serverApiGet<{ accounts: GithubAccount[] }>(
    ENDPOINTS.analysis.accounts,
  );
  return accounts;
}
