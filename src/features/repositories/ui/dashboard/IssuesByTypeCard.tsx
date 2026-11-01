'use client';

import { useId, useState } from 'react';

import type { RepositoryIssueTypeCount } from '@/features/repositories/model/types';
import SeverityBadge from '@/features/repositories/ui/SeverityBadge';

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

  return (
    <div className="border-border-subtle bg-surface rounded-2xl border p-6 xl:min-h-58">
      <h2 className="text-foreground-tertiary mb-5 text-xs font-semibold tracking-[0.08em]">
        ISSUES BY TYPE
      </h2>
      {issuesByType.length === 0 ? (
        <p className="text-body-md text-foreground-tertiary">발견된 이슈가 없습니다.</p>
      ) : (
        <ul id={listId} className="flex flex-col gap-2">
          {visibleIssues.map((item) => (
            <li key={item.type} className="flex min-w-0 items-center gap-2.5">
              <SeverityBadge severity={item.severity} className="text-label-sm px-2 py-0.5" />
              <span
                className="text-body-md text-foreground min-w-0 flex-1 truncate"
                title={item.type}
              >
                {item.type}
              </span>
              <span className="text-label-sm text-foreground-secondary shrink-0 tabular-nums">
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
