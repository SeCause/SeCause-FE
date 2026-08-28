'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { AccountTab } from '@/features/account';
import { useGithubAccounts } from '@/features/analysis/hooks/useAnalysisApi';
import { RepositoriesTab } from '@/features/repositories';
import { ROUTES } from '@/shared/config/routes';
import { MyPageSidebar, type MyPageTab } from '@/widgets/mypage-sidebar';

export default function MyPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: accounts = [] } = useGithubAccounts();
  const requestedAccount = searchParams.get('account');
  const activeAccount = accounts.some((account) => account.name === requestedAccount)
    ? requestedAccount
    : (accounts[0]?.name ?? null);
  const activeTab: MyPageTab = searchParams.get('tab') === 'account' ? 'account' : 'repositories';

  const handleTabChange = (tab: MyPageTab) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === 'repositories') {
      params.delete('tab');
    } else {
      params.set('tab', tab);
    }

    const query = params.toString();
    router.push(query ? `${ROUTES.mypage}?${query}` : ROUTES.mypage, { scroll: false });
  };

  const handleAccountChange = (accountName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('account', accountName);
    router.replace(`${ROUTES.mypage}?${params.toString()}`, { scroll: false });
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
