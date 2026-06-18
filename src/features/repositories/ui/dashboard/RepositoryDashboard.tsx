'use client';

import { useState } from 'react';

import { useRepositoryDashboard } from '@/features/repositories/hooks/useRepositoriesApi';
import type { RepositoryDetailTab } from '@/features/repositories/model/types';
import IssuesTab from '@/features/repositories/ui/issues/IssuesTab';

import OverviewTab from './OverviewTab';
import RepositoryDashboardHeader from './RepositoryDashboardHeader';
import RepositoryDetailSidebar from './RepositoryDetailSidebar';

interface Props {
  repositoryId: number;
}

export default function RepositoryDashboard({ repositoryId }: Props) {
  const [activeTab, setActiveTab] = useState<RepositoryDetailTab>('overview');
  const { data: dashboard, isLoading, isError } = useRepositoryDashboard(repositoryId);

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <RepositoryDetailSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="h-[calc(100dvh-var(--spacing-header))] min-w-0 flex-1 overflow-auto px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
          {isLoading ? (
            <p className="text-body-md m-auto text-gray-500">불러오는 중...</p>
          ) : isError || !dashboard ? (
            <p className="text-body-md m-auto text-gray-500">
              레포지토리 정보를 불러오지 못했습니다.
            </p>
          ) : (
            <>
              <RepositoryDashboardHeader
                owner={dashboard.owner}
                name={dashboard.name}
                githubUrl={dashboard.githubUrl}
              />

              {activeTab === 'overview' ? (
                <OverviewTab dashboard={dashboard} />
              ) : (
                <IssuesTab repositoryId={repositoryId} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
