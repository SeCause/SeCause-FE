'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { RepositoryDetailTab } from '@/features/repositories/model/types';
import IssueIcon from '@/icons/icon_issue.svg';
import OverviewIcon from '@/icons/icon_overview.svg';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';

const NAV_ITEMS: { id: RepositoryDetailTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: OverviewIcon },
  { id: 'issues', label: 'Issues', icon: IssueIcon },
];

interface Props {
  activeTab: RepositoryDetailTab;
  onTabChange: (tab: RepositoryDetailTab) => void;
}

export default function RepositoryDetailSidebar({ activeTab, onTabChange }: Props) {
  const router = useRouter();

  return (
    <aside className="top-header sticky flex h-[calc(100dvh-var(--spacing-header))] w-64 shrink-0 flex-col gap-4 border-r border-gray-200 bg-white px-3 py-4">
      <button
        onClick={() => router.push(ROUTES.mypage)}
        className="text-label-lg flex items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        ← Back to Repositories
      </button>

      <div className="border-t border-gray-200" />

      <nav className="flex flex-col gap-1" aria-label="레포지토리 상세 메뉴">
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            aria-current={activeTab === id ? 'page' : undefined}
            className={cn(
              'text-label-lg flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors',
              activeTab === id ? 'bg-blue/10 text-blue' : 'text-gray-700 hover:bg-gray-100',
            )}
          >
            <Image
              src={icon}
              alt=""
              aria-hidden="true"
              width={18}
              height={18}
              className={activeTab === id ? 'icon-blue' : 'icon-gray'}
            />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
