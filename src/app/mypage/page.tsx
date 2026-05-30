'use client';

import { useState } from 'react';

import MyPageSidebar, { type MyPageTab } from '@/widgets/mypage-sidebar/ui/MyPageSidebar';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageTab>('repositories');

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 overflow-hidden">
        <MyPageSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'repositories' && (
            <div>
              <h1 className="text-heading-md mb-6 text-gray-900">Repositories</h1>
            </div>
          )}
          {activeTab === 'account' && (
            <div>
              <h1 className="text-heading-md mb-6 text-gray-900">Account</h1>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
