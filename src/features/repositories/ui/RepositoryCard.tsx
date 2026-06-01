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

function parseOwner(githubLink: string): string {
  try {
    return new URL(githubLink).pathname.split('/')[1];
  } catch {
    return '';
  }
}

interface Props {
  repo: Repository;
  starred: boolean;
  onToggleStar: (id: number) => void;
}

export default function RepositoryCard({ repo, starred, onToggleStar }: Props) {
  const owner = parseOwner(repo.githubLink);
  const status = repo.analysis?.analysisStatus;

  return (
    <div className="flex cursor-pointer flex-col gap-3 rounded-xl border border-gray-200 px-4 py-3.5 shadow-sm hover:bg-gray-50 sm:px-5">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="flex min-w-0 gap-x-3 gap-y-2 max-lg:flex-col lg:items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(repo.repositoryId);
              }}
              aria-label={starred ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              aria-pressed={starred}
              className="flex h-5 w-5 shrink-0 items-center justify-center text-lg leading-none transition-transform hover:scale-110"
            >
              <span className={cn(starred ? 'text-yellow-400' : 'text-gray-300')}>★</span>
            </button>
            <span className="text-label-lg text-blue max-w-full min-w-0 font-bold wrap-break-word sm:truncate">
              {owner} / {repo.title}
            </span>
          </div>

          {repo.analysis && (
            <SeverityBadges
              criticalCount={repo.analysis.criticalCount}
              highCount={repo.analysis.highCount}
              mediumCount={repo.analysis.mediumCount}
            />
          )}
        </div>

        {status && (
          <span
            className={cn(
              'text-label-md shrink-0 self-start whitespace-nowrap sm:pt-1',
              STATUS_STYLE[status] ?? 'text-gray-500',
            )}
          >
            {STATUS_LABEL[status] ?? status}
          </span>
        )}
      </div>
      <p className="text-body-md min-w-0 wrap-break-word text-gray-600">
        {repo.analysis?.completedAt ? (
          <>
            <span className="font-semibold text-gray-800">Last analysis:</span>{' '}
            <span>{formatAnalysisDate(repo.analysis.completedAt)}</span>
            <span className="mx-1 text-gray-300">|</span>
            <span>{repo.totalFiles} Files</span>
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
