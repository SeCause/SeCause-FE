'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
  useRepositoryIssueFiles,
  useRepositoryIssues,
} from '@/features/repositories/hooks/useRepositoriesApi';
import type { IssueSeverity } from '@/features/repositories/model/types';
import Pagination from '@/features/repositories/ui/Pagination';
import { SEVERITY_TAG_LABEL } from '@/features/repositories/ui/severityTag';
import SwitchIcon from '@/icons/icon_switch.svg';
import Dropdown from '@/shared/ui/Dropdown';

import IssueCard from './IssueCard';
import IssueFileTabs from './IssueFileTabs';

const SEVERITY_FILTER_OPTIONS = [
  { value: 'ALL', label: '취약도 전체' },
  ...Object.entries(SEVERITY_TAG_LABEL).map(([value, label]) => ({ value, label })),
];

const PAGE_SIZE = 5;
const EMPTY_ISSUES: never[] = [];
const EMPTY_FILES: never[] = [];

interface Props {
  repositoryId: number;
}

export default function IssuesTab({ repositoryId }: Props) {
  const [severity, setSeverity] = useState<'ALL' | IssueSeverity>('ALL');
  const [page, setPage] = useState(1);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(() => new Set());

  const {
    data: files = EMPTY_FILES,
    isLoading: isFilesLoading,
    isError: isFilesError,
  } = useRepositoryIssueFiles(repositoryId);
  const effectiveSelectedFilePath =
    selectedFilePath && files.some((file) => file.filePath === selectedFilePath)
      ? selectedFilePath
      : (files[0]?.filePath ?? null);
  const totalIssueCount = files.reduce((sum, file) => sum + file.issueCount, 0);
  const selectedFileIssueCount =
    files.find((file) => file.filePath === effectiveSelectedFilePath)?.issueCount ?? 0;

  const {
    data,
    isLoading: isIssuesLoading,
    isError: isIssuesError,
  } = useRepositoryIssues(
    repositoryId,
    {
      severity,
      filePath: effectiveSelectedFilePath ?? undefined,
      page,
      size: PAGE_SIZE,
    },
    {
      enabled: Boolean(effectiveSelectedFilePath),
    },
  );

  const issues = data?.content ?? EMPTY_ISSUES;

  const handleSeverityChange = (value: string) => {
    setSeverity(value as 'ALL' | IssueSeverity);
    setPage(1);
    setExpandedIds(new Set());
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setExpandedIds(new Set());
  };

  const handleFileSelect = (filePath: string) => {
    setSelectedFilePath(filePath);
    setPage(1);
    setExpandedIds(new Set());
  };

  const handleToggle = (analysisResultId: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);

      if (next.has(analysisResultId)) {
        next.delete(analysisResultId);
      } else {
        next.add(analysisResultId);
      }

      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading-md text-gray-900">Issues</h2>
          {data && (
            <p className="text-label-md mt-1 text-gray-900">
              {data.totalElements} / {selectedFileIssueCount} Security Issues
            </p>
          )}
        </div>

        <Dropdown
          options={SEVERITY_FILTER_OPTIONS}
          value={severity}
          onChange={handleSeverityChange}
          trailingIcon={<Image src={SwitchIcon} alt="" aria-hidden="true" width={12} height={22} />}
          className="w-35"
          buttonClassName="h-9 w-full py-0"
        />
      </div>

      <div className="grid min-h-100 grid-cols-1 gap-3 lg:grid-cols-[13rem_1fr]">
        <IssueFileTabs
          files={files}
          selectedFilePath={effectiveSelectedFilePath}
          isLoading={isFilesLoading}
          isError={isFilesError}
          onSelect={handleFileSelect}
        />

        <div className="flex min-h-100 min-w-0 flex-col gap-3">
          {isFilesLoading || isIssuesLoading ? (
            <p className="text-body-md m-auto text-gray-500">불러오는 중...</p>
          ) : isFilesError || isIssuesError ? (
            <p className="text-body-md m-auto text-gray-500">이슈를 불러오지 못했습니다.</p>
          ) : totalIssueCount === 0 ? (
            <p className="text-body-md m-auto text-gray-500">발견된 이슈가 없습니다.</p>
          ) : selectedFileIssueCount === 0 ? (
            <p className="text-body-md m-auto text-gray-500">
              선택한 파일에 발견된 이슈가 없습니다.
            </p>
          ) : issues.length === 0 ? (
            <p className="text-body-md m-auto text-gray-500">현재 조건에 맞는 이슈가 없습니다. </p>
          ) : (
            issues.map((issue) => (
              <IssueCard
                key={issue.analysisResultId}
                issue={issue}
                repositoryId={repositoryId}
                expanded={expandedIds.has(issue.analysisResultId)}
                onToggle={handleToggle}
              />
            ))
          )}
        </div>
      </div>

      {data && (
        <Pagination current={data.page} total={data.totalPages} onChange={handlePageChange} />
      )}
    </div>
  );
}
