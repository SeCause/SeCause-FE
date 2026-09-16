'use client';

import { useRepositoryIssueDetail } from '@/features/repositories/hooks/useRepositoriesApi';
import CopyButton from '@/shared/ui/CopyButton';

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
  } = useRepositoryIssueDetail(repositoryId, analysisResultId);

  if (isLoading) {
    return <p className="text-body-md text-foreground-tertiary py-4 text-center">불러오는 중...</p>;
  }

  if (isError || !detail) {
    return (
      <p className="text-body-md text-foreground-tertiary py-4 text-center">
        이슈 상세 정보를 불러오지 못했습니다.
      </p>
    );
  }

  return (
    <div className="border-border-subtle flex flex-col gap-4 border-t pt-4">
      <CodeDiffView
        oldCode={detail.codeSnippet}
        newCode={detail.fixCode}
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
            <CopyButton text={detail.fixCode} label="코드 복사" />
          </div>
          <p className="text-body-md text-foreground-secondary">{detail.fixSummary}</p>
          <pre className="text-body-sm bg-surface-subtle text-foreground-secondary mt-2 rounded p-3 font-mono wrap-break-word whitespace-pre-wrap">
            {detail.fixCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
