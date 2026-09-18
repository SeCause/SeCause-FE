'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import {
  useRepositoryIssueFiles,
  useRepositoryIssues,
} from '@/features/repositories/hooks/useRepositoriesApi';
import { filterIssueFiles } from '@/features/repositories/model/issueFilters';
import type { IssueSeverity } from '@/features/repositories/model/types';
import Pagination from '@/features/repositories/ui/Pagination';
import { SEVERITY_TAG_LABEL } from '@/features/repositories/ui/severityTag';
import SwitchIcon from '@/icons/icon_switch.svg';
import Dropdown from '@/shared/ui/Dropdown';
import SearchBar from '@/shared/ui/SearchBar';

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
  const [fileKeyword, setFileKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(() => new Set());

  const {
    data: files = EMPTY_FILES,
    isLoading: isFilesLoading,
    isError: isFilesError,
  } = useRepositoryIssueFiles(repositoryId, severity);
  const filteredFiles = useMemo(() => filterIssueFiles(files, fileKeyword), [files, fileKeyword]);
  const effectiveSelectedFilePath =
    selectedFilePath && filteredFiles.some((file) => file.filePath === selectedFilePath)
      ? selectedFilePath
      : (filteredFiles[0]?.filePath ?? null);
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

  const handleFileSearch = (value: string) => {
    setFileKeyword(value);
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
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-foreground-tertiary">
          {data
            ? `선택한 파일의 이슈 ${data.totalElements}개 · 전체 ${totalIssueCount}개`
            : '보안 이슈를 불러오는 중입니다.'}
        </p>

        <Dropdown
          options={SEVERITY_FILTER_OPTIONS}
          value={severity}
          onChange={handleSeverityChange}
          trailingIcon={<Image src={SwitchIcon} alt="" aria-hidden="true" width={12} height={22} />}
          className="w-35"
          buttonClassName="h-9 w-full py-0"
        />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-[15rem_1fr]">
        <div className="flex min-h-0 flex-col gap-2">
          <SearchBar
            onChange={handleFileSearch}
            placeholder="파일 경로 검색"
            aria-label="이슈 파일 검색"
            debounce={300}
            containerClassName="h-9 py-1.5"
          />
          <IssueFileTabs
            files={filteredFiles}
            selectedFilePath={effectiveSelectedFilePath}
            isLoading={isFilesLoading}
            isError={isFilesError}
            emptyMessage={fileKeyword ? '검색 결과가 없습니다.' : undefined}
            onSelect={handleFileSelect}
          />
        </div>
        <div className="scrollbar-hide lg:scrollbar-custom-gray flex min-h-0 min-w-0 flex-col gap-3 overflow-y-auto lg:pr-3">
          {isFilesLoading || isIssuesLoading ? (
            <p className="text-body-md text-foreground-tertiary m-auto">불러오는 중...</p>
          ) : isFilesError || isIssuesError ? (
            <p className="text-body-md text-foreground-tertiary m-auto">
              이슈를 불러오지 못했습니다.
            </p>
          ) : files.length === 0 ? (
            <p className="text-body-md text-foreground-tertiary m-auto">발견된 이슈가 없습니다.</p>
          ) : filteredFiles.length === 0 ? (
            <p className="text-body-md text-foreground-tertiary m-auto">
              검색한 파일 경로와 일치하는 결과가 없습니다.
            </p>
          ) : selectedFileIssueCount === 0 ? (
            <p className="text-body-md text-foreground-tertiary m-auto">
              선택한 파일에 발견된 이슈가 없습니다.
            </p>
          ) : issues.length === 0 ? (
            <p className="text-body-md text-foreground-tertiary m-auto">
              현재 조건에 맞는 이슈가 없습니다.{' '}
            </p>
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
        <div className="shrink-0">
          <Pagination current={data.page} total={data.totalPages} onChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
