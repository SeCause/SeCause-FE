'use client';

import { useId, useState } from 'react';

import type { RepositoryIssueTypeCount } from '@/features/repositories/model/types';
import { SEVERITY_COLOR } from '@/features/repositories/ui/severityTag';

const COLLAPSED_ITEM_COUNT = 4;

interface Props {
  issuesByType: RepositoryIssueTypeCount[];
}

export default function IssuesByTypeCard({ issuesByType }: Props) {
  const listId = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const sortedIssues = [...issuesByType].sort((a, b) => b.count - a.count);
  const visibleIssues = isExpanded ? sortedIssues : sortedIssues.slice(0, COLLAPSED_ITEM_COUNT);
  const remainingCount = Math.max(0, sortedIssues.length - COLLAPSED_ITEM_COUNT);
  const maxCount = Math.max(1, ...sortedIssues.map((item) => item.count));

  return (
    <div className="border-border-subtle bg-surface rounded-2xl border p-6 xl:min-h-58">
      <h2 className="text-foreground-tertiary mb-5 text-xs font-semibold tracking-[0.08em]">
        ISSUES BY TYPE
      </h2>
      {issuesByType.length === 0 ? (
        <p className="text-body-md text-foreground-tertiary">발견된 이슈가 없습니다.</p>
      ) : (
        <ul id={listId} className="flex flex-col gap-2.5">
          {visibleIssues.map((item) => (
            <li key={item.type} className="flex min-w-0 items-center gap-3">
              <span
                className="text-body-md text-foreground min-w-0 flex-[1.2] truncate"
                title={item.type}
              >
                {item.type}
              </span>
              <div
                className="bg-surface-muted h-2 min-w-0 flex-1 overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{
                    width: `${Math.max(6, (item.count / maxCount) * 100)}%`,
                    backgroundColor: SEVERITY_COLOR[item.severity] ?? 'var(--color-border-default)',
                  }}
                />
              </div>
              <span className="text-label-sm text-foreground-secondary w-6 shrink-0 text-right tabular-nums">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      )}
      {remainingCount > 0 && (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={listId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="text-label-sm text-foreground-secondary hover:text-foreground mt-3 transition-colors"
        >
          {isExpanded ? '접기' : `나머지 ${remainingCount}개 유형 더 보기`}
        </button>
      )}
    </div>
  );
}
