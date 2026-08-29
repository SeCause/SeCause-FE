import type { GithubAccount } from './types';

export function resolveActiveAccount(
  accounts: GithubAccount[],
  requested: string | null,
): string | null {
  if (accounts.some((account) => account.name === requested)) return requested;
  return accounts[0]?.name ?? null;
}
