'use client';

import { useSearchParams } from 'next/navigation';
import { useSyncExternalStore } from 'react';

import { AccountTab } from '@/features/account';
import { useGithubAccounts } from '@/features/analysis/hooks/useAnalysisApi';
import { resolveActiveAccount } from '@/features/analysis/model/activeAccount';
import type { GithubAccount } from '@/features/analysis/model/types';
import { RepositoriesTab } from '@/features/repositories';
import { ROUTES } from '@/shared/config/routes';
import { MyPageSidebar, type MyPageTab } from '@/widgets/mypage-sidebar';

const subscribeToHydration = () => () => {};

interface Props {
  initialAccounts: GithubAccount[];
  initialActiveAccount: string | null;
}

export default function MyPageClient({ initialAccounts, initialActiveAccount }: Props) {
  const searchParams = useSearchParams();
  const { data: clientAccounts = [] } = useGithubAccounts();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const accounts = isHydrated ? clientAccounts : initialAccounts;
  const activeAccount = isHydrated
    ? resolveActiveAccount(accounts, searchParams.get('account'))
    : initialActiveAccount;
  const activeTab: MyPageTab = searchParams.get('tab') === 'account' ? 'account' : 'repositories';

  const updateQuery = (mutate: (params: URLSearchParams) => void, replace = false) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);

    const query = params.toString();
    const url = query ? `${ROUTES.mypage}?${query}` : ROUTES.mypage;
    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  };

  const handleTabChange = (tab: MyPageTab) => {
    updateQuery((params) => {
      if (tab === 'repositories') params.delete('tab');
      else params.set('tab', tab);
    });
  };

  const handleAccountChange = (accountName: string) => {
    updateQuery((params) => params.set('account', accountName), true);
  };

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <MyPageSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        accounts={accounts}
        selectedAccount={activeAccount}
        onAccountChange={handleAccountChange}
      />

      <div className="h-[calc(100dvh-var(--spacing-header))] min-w-0 flex-1 overflow-auto bg-white px-5 pt-7 pb-14 md:px-8 md:pt-9 md:pb-16">
        {activeTab === 'repositories' && <RepositoriesTab accountName={activeAccount} />}
        {activeTab === 'account' && <AccountTab />}
      </div>
    </div>
  );
}
