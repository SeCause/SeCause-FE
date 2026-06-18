'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { Repository } from '@/features/repositories/model/types';
import TrashIcon from '@/icons/icon_trash.svg';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { formatAnalysisDate } from '@/shared/lib/formatDate';
import ConfirmDialog from '@/shared/ui/ConfirmDialog';

import SeverityBadges from './SeverityBadges';

const STATUS_LABEL: Record<string, string> = {
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  FAILED: 'Failed',
  PENDING: 'Pending',
};

const STATUS_STYLE: Record<string, string> = {
  COMPLETED: 'text-emerald-600',
  IN_PROGRESS: 'text-blue',
  FAILED: 'text-red-500',
  PENDING: 'text-gray-500',
};

interface Props {
  repo: Repository;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export default function RepositoryCard({ repo, onDelete, isDeleting }: Props) {
  const router = useRouter();
  const status = repo.analysisStatus;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCardClick = () => {
    router.push(ROUTES.repositoryDetail(repo.repositoryId));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(repo.repositoryId);
    setIsConfirmOpen(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex cursor-pointer flex-col gap-3 rounded-xl border border-gray-200 px-4 py-3.5 shadow-sm hover:bg-gray-50 sm:px-5"
    >
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 lg:items-center">
        <div className="flex min-w-0 gap-x-3 gap-y-2 max-lg:flex-col lg:items-center">
          <div className="flex items-center gap-2">
            <span className="text-label-lg text-blue max-w-full min-w-0 font-bold wrap-break-word sm:truncate">
              {repo.owner} / {repo.name}
            </span>
          </div>

          <SeverityBadges
            criticalCount={repo.issueCounts.critical}
            highCount={repo.issueCounts.high}
            mediumCount={repo.issueCounts.medium}
          />
        </div>

        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          aria-label="레포지토리 삭제"
          className="shrink-0 self-start rounded-lg p-1.5 text-gray-500 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <Image src={TrashIcon} alt="" aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex min-w-0 items-start justify-between gap-2.5">
        <p className="text-body-md min-w-0 wrap-break-word text-gray-600">
          {repo.completedAt ? (
            <>
              <span className="font-semibold text-gray-800">Last analysis:</span>{' '}
              <span>{formatAnalysisDate(repo.completedAt)}</span>
              <span className="mx-1 text-gray-300">|</span>
              <span>{repo.fileCount} Files</span>
              <span className="mx-1 text-gray-300">|</span>
              <span className="break-all">{repo.branch}</span>
            </>
          ) : (
            <span className="text-gray-400">분석 기록 없음</span>
          )}
        </p>

        {status && (
          <span
            className={cn(
              'text-label-md shrink-0 whitespace-nowrap',
              STATUS_STYLE[status] ?? 'text-gray-500',
            )}
          >
            {STATUS_LABEL[status] ?? status}
          </span>
        )}
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        title={`'${repo.name}' 분석 기록을 삭제하시겠어요?`}
        description={`GitHub 저장소에는 영향을 주지 않으며, \n 삭제 후 복구할 수 없습니다.`}
        confirmLabel="삭제"
        isConfirming={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}
