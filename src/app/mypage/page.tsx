'use client';

import { useState } from 'react';

import AccountTab from '@/features/account/ui/AccountTab';
import RepositoriesTab from '@/features/repositories/ui/RepositoriesTab';
import MyPageSidebar, { type MyPageTab } from '@/widgets/mypage-sidebar/ui/MyPageSidebar';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageTab>('repositories');

  return (
    <div className="flex flex-1 overflow-hidden">
      <MyPageSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-auto px-4 py-8 md:px-8 md:py-12">
        {activeTab === 'repositories' && <RepositoriesTab />}
        {activeTab === 'account' && <AccountTab />}
      </div>
    </div>
  );
}
