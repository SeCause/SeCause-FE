'use client';

import Link from 'next/link';

import { useRepositoryIssueDetail } from '@/features/repositories/hooks/useRepositoriesApi';
import { ROUTES } from '@/shared/config/routes';
import CopyButton from '@/shared/ui/CopyButton';
import RetryState from '@/shared/ui/RetryState';

import CodeDiffView from './CodeDiffView';

interface Props {
  repositoryId: number;
  analysisResultId: number;
}

export default function IssueDetailPanel({ repositoryId, analysisResultId }: Props) {
  const {
    data: detail,
    isLoading,
    isError,
    refetch,
  } = useRepositoryIssueDetail(repositoryId, analysisResultId);

  if (isLoading) {
    return <p className="text-body-md text-foreground-tertiary py-4 text-center">불러오는 중...</p>;
  }

  if (isError || !detail) {
    return (
      <RetryState message="이슈 상세 정보를 불러오지 못했습니다." onRetry={() => void refetch()} />
    );
  }

  const hasFixCode = Boolean(detail.fixCode?.trim());

  return (
    <div className="border-border-subtle flex flex-col gap-4 border-t pt-4">
      <CodeDiffView
        oldCode={detail.codeSnippet}
        newCode={hasFixCode ? detail.fixCode : detail.codeSnippet}
        startLine={detail.lineStart}
      />

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        <div className="border-border-subtle rounded-lg border p-4">
          <p className="text-label-lg text-foreground mb-2">취약점: {detail.vulnerabilityType}</p>
          <p className="text-body-md text-foreground-secondary">
            <span className="font-semibold">원인:</span> {detail.description}
          </p>
          <p className="text-body-md text-foreground-secondary mt-3">
            <span className="font-semibold">공격 예시:</span>
          </p>
          <p className="text-body-sm bg-surface-subtle text-foreground-secondary mt-1 rounded p-3 font-mono wrap-break-word whitespace-pre-wrap">
            {detail.attackScenario}
          </p>
        </div>

        <div className="border-border-subtle rounded-lg border p-4">
          <div className="mb-2 flex items-start justify-between gap-3">
            <p className="text-label-lg text-foreground">수정 방법</p>
            {hasFixCode && <CopyButton text={detail.fixCode} label="코드 복사" />}
          </div>
          <p className="text-body-md text-foreground-secondary">{detail.fixSummary}</p>
          {hasFixCode ? (
            <pre className="text-body-sm bg-surface-subtle text-foreground-secondary mt-2 rounded p-3 font-mono wrap-break-word whitespace-pre-wrap">
              {detail.fixCode}
            </pre>
          ) : (
            <div className="bg-surface-subtle mt-2 rounded-lg p-4">
              <p className="text-label-md text-foreground">수정 코드 생성 실패</p>
              <p className="text-body-sm text-foreground-secondary mt-1">
                수정 코드를 받으려면 전체 분석을 다시 요청할 수 있습니다.
              </p>
              <Link
                href={ROUTES.analysis}
                className="text-label-md text-blue mt-3 inline-flex rounded underline underline-offset-4"
              >
                분석 설정으로 이동
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
