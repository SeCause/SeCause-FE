'use client';

import { useRepositoryIssueDetail } from '@/features/repositories/hooks/useRepositoriesApi';

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
    return <p className="text-body-md py-4 text-center text-gray-500">불러오는 중...</p>;
  }

  if (isError || !detail) {
    return (
      <p className="text-body-md py-4 text-center text-gray-500">
        이슈 상세 정보를 불러오지 못했습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 pt-4">
      <CodeDiffView
        oldCode={detail.codeSnippet}
        newCode={detail.fixCode}
        startLine={detail.lineStart}
      />

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-label-lg mb-2 text-gray-900">취약점: {detail.vulnerabilityType}</p>
          <p className="text-body-md text-gray-700">
            <span className="font-semibold">원인:</span> {detail.description}
          </p>
          <p className="text-body-md mt-3 text-gray-700">
            <span className="font-semibold">공격 예시:</span>
          </p>
          <p className="text-body-sm mt-1 rounded bg-gray-50 p-3 font-mono wrap-break-word whitespace-pre-wrap text-gray-700">
            {detail.attackScenario}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-label-lg mb-2 text-gray-900">수정 방법</p>
          <p className="text-body-md text-gray-700">{detail.fixSummary}</p>
          <pre className="text-body-sm mt-2 rounded bg-gray-50 p-3 font-mono wrap-break-word whitespace-pre-wrap text-gray-700">
            {detail.fixCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
