'use client';

import { useState } from 'react';

import { AccountTab } from '@/features/account';
import { RepositoriesTab } from '@/features/repositories';
import { MyPageSidebar, type MyPageTab } from '@/widgets/mypage-sidebar';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageTab>('repositories');

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <MyPageSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="h-[calc(100dvh-var(--spacing-header))] min-w-0 flex-1 overflow-auto px-4 py-8 md:px-8 md:py-12">
        {activeTab === 'repositories' && <RepositoriesTab />}
        {activeTab === 'account' && <AccountTab />}
      </div>
    </div>
  );
}
