import { Building2, UserRound } from 'lucide-react';

import type { GithubAccount } from '@/features/analysis/model/types';
import type { DropdownOption } from '@/shared/ui/Dropdown';

export function createGithubAccountOptions(accounts: GithubAccount[]): DropdownOption[] {
  return accounts.map((account) => ({
    value: account.name,
    label: account.name,
    icon:
      account.type === 'ORGANIZATION' ? (
        <Building2 size={18} aria-label="조직" />
      ) : (
        <UserRound size={18} aria-label="개인 계정" />
      ),
  }));
}
