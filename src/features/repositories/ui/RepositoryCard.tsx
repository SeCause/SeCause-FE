import { cn } from '@/shared/lib/cn';
import { formatAnalysisDate } from '@/shared/lib/formatDate';

import type { Repository } from '../model/types';
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
  const status = repo.analysisStatus;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`'${repo.name}' 레포지토리를 삭제하시겠습니까?`)) {
      onDelete(repo.repositoryId);
    }
  };

  return (
    <div className="flex cursor-pointer flex-col gap-3 rounded-xl border border-gray-200 px-4 py-3.5 shadow-sm hover:bg-gray-50 sm:px-5">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
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

        <div className="flex shrink-0 items-center gap-3 self-start sm:pt-1">
          {status && (
            <span
              className={cn(
                'text-label-md whitespace-nowrap',
                STATUS_STYLE[status] ?? 'text-gray-500',
              )}
            >
              {STATUS_LABEL[status] ?? status}
            </span>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label="레포지토리 삭제"
            className="text-label-md text-gray-400 transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            삭제
          </button>
        </div>
      </div>
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
    </div>
  );
}
