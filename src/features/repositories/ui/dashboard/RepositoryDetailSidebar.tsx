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
    <aside className="md:top-header flex shrink-0 bg-white max-md:h-12 max-md:w-full max-md:items-center max-md:gap-1 max-md:border-b max-md:border-gray-200 max-md:px-3 md:sticky md:h-[calc(100dvh-var(--spacing-header))] md:w-64 md:flex-col md:gap-4 md:border-r md:border-gray-200 md:px-3 md:py-4">
      <button
        onClick={() => router.push(ROUTES.mypage)}
        aria-label="저장소 목록으로 돌아가기"
        className="text-label-lg flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <span aria-hidden="true">←</span>
        <span aria-hidden="true" className="max-md:hidden">
          Back to Repositories
        </span>
      </button>

      <div className="border-t border-gray-200 max-md:hidden" />

      <nav
        className="flex gap-1 max-md:min-w-0 max-md:flex-1 md:flex-col"
        aria-label="레포지토리 상세 메뉴"
      >
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            aria-current={activeTab === id ? 'page' : undefined}
            className={cn(
              'text-label-lg flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors max-md:flex-1 max-md:justify-center',
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
