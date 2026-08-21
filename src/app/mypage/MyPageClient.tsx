'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { AccountTab } from '@/features/account';
import { RepositoriesTab } from '@/features/repositories';
import { ROUTES } from '@/shared/config/routes';
import { MyPageSidebar, type MyPageTab } from '@/widgets/mypage-sidebar';

export default function MyPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <MyPageSidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="h-[calc(100dvh-var(--spacing-header))] min-w-0 flex-1 overflow-auto px-4 py-8 md:px-8 md:py-12">
        {activeTab === 'repositories' && <RepositoriesTab />}
        {activeTab === 'account' && <AccountTab />}
      </div>
    </div>
  );
}
