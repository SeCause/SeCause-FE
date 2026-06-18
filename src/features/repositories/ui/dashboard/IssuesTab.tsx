'use client';

import { useState } from 'react';

import { useRepositoryIssues } from '@/features/repositories/hooks/useRepositoriesApi';
import type { IssueSeverity } from '@/features/repositories/model/types';
import Pagination from '@/features/repositories/ui/Pagination';
import { cn } from '@/shared/lib/cn';
import Dropdown from '@/shared/ui/Dropdown';

import { SEVERITY_TAG_LABEL, SEVERITY_TAG_STYLE } from './severityTag';

const SEVERITY_FILTER_OPTIONS = [
  { value: 'ALL', label: '전체' },
  ...Object.entries(SEVERITY_TAG_LABEL).map(([value, label]) => ({ value, label })),
];

const PAGE_SIZE = 20;

interface Props {
  repositoryId: number;
}

export default function IssuesTab({ repositoryId }: Props) {
  const [severity, setSeverity] = useState<'ALL' | IssueSeverity>('ALL');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useRepositoryIssues(repositoryId, {
    severity,
    page,
    size: PAGE_SIZE,
  });

  const issues = data?.content ?? [];

  const handleSeverityChange = (value: string) => {
    setSeverity(value as 'ALL' | IssueSeverity);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-md text-gray-900">Issues</h2>
        <Dropdown
          options={SEVERITY_FILTER_OPTIONS}
          value={severity}
          onChange={handleSeverityChange}
        />
      </div>

      <div className="flex min-h-100 flex-col gap-2.5">
        {isLoading ? (
          <p className="text-body-md m-auto text-gray-500">불러오는 중...</p>
        ) : isError ? (
          <p className="text-body-md m-auto text-gray-500">이슈를 불러오지 못했습니다.</p>
        ) : issues.length === 0 ? (
          <p className="text-body-md m-auto text-gray-500">발견된 이슈가 없습니다.</p>
        ) : (
          issues.map((issue) => (
            <div
              key={issue.analysisResultId}
              className="flex flex-col gap-1.5 rounded-xl border border-gray-200 px-4 py-3.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-label-sm shrink-0 rounded px-1.5 py-0.5 font-medium',
                    SEVERITY_TAG_STYLE[issue.severity] ?? 'bg-gray-100 text-gray-600',
                  )}
                >
                  {SEVERITY_TAG_LABEL[issue.severity] ?? issue.severity}
                </span>
                <span className="text-label-md text-gray-900">{issue.vulnerabilityType}</span>
              </div>
              <p className="text-body-md text-gray-600">{issue.summary}</p>
              <p className="text-caption text-gray-500">
                {issue.filePath}:{issue.lineStart}-{issue.lineEnd}
              </p>
            </div>
          ))
        )}
      </div>

      {data && (
        <div className="mt-2">
          <Pagination current={data.page} total={data.totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
