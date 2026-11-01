'use client';

import Link from 'next/link';

import { useRepositoryIssues } from '@/features/repositories/hooks/useRepositoriesApi';
import SeverityBadge from '@/features/repositories/ui/SeverityBadge';
import RetryState from '@/shared/ui/RetryState';

interface Props {
  repositoryId: number;
}

export default function RecentIssuesCard({ repositoryId }: Props) {
  const { data, isLoading, isError, refetch } = useRepositoryIssues(repositoryId, {
    page: 1,
    size: 5,
  });
  const issues = data?.content ?? [];

  return (
    <section className="border-border-subtle bg-surface rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground-tertiary text-xs font-semibold tracking-[0.08em]">
            RECENT ISSUES
          </h2>
          {data && (
            <p className="text-body-sm text-foreground-secondary mt-1">
              전체 {data.totalElements}개 중 최근 {data.content.length}개
            </p>
          )}
        </div>
        <Link
          href="?tab=issues"
          className="text-label-sm text-blue hover:text-blue-action shrink-0 transition-colors"
        >
          전체 보기
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3" aria-label="최근 이슈 불러오는 중">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="bg-surface-subtle h-12 animate-pulse rounded-lg"
              aria-hidden="true"
            />
          ))}
        </div>
      ) : isError ? (
        <RetryState message="최근 이슈를 불러오지 못했습니다." onRetry={() => refetch()} compact />
      ) : issues.length === 0 ? (
        <p className="text-body-sm text-foreground-tertiary py-5 text-center">
          표시할 보안 이슈가 없습니다.
        </p>
      ) : (
        <div className="scrollbar-custom-gray overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-left">
            <thead>
              <tr className="border-border-subtle border-b">
                <th className="text-label-sm text-foreground-tertiary px-3 pb-3 font-medium">
                  취약도
                </th>
                <th className="text-label-sm text-foreground-tertiary px-3 pb-3 font-medium">
                  이슈
                </th>
                <th className="text-label-sm text-foreground-tertiary px-3 pb-3 font-medium">
                  파일 위치
                </th>
                <th className="text-label-sm text-foreground-tertiary px-3 pb-3 font-medium">
                  설명
                </th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr
                  key={issue.analysisResultId}
                  className="border-border-subtle border-b last:border-0"
                >
                  <td className="px-3 py-3 align-middle">
                    <SeverityBadge
                      severity={issue.severity}
                      className="text-label-sm px-2 py-0.5 [&>span]:h-2 [&>span]:w-2"
                    />
                  </td>
                  <td className="text-body-sm text-foreground max-w-52 truncate px-3 py-3">
                    {issue.vulnerabilityType}
                  </td>
                  <td className="text-body-sm text-foreground-secondary max-w-60 truncate px-3 py-3">
                    {issue.filePath}:{issue.lineStart}
                  </td>
                  <td className="text-body-sm text-foreground-secondary max-w-72 truncate px-3 py-3">
                    {issue.summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
