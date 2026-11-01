'use client';

import { SearchCheck, ShieldAlert, Wrench } from 'lucide-react';
import Link from 'next/link';

import { useRepositoryIssueDetail } from '@/features/repositories/hooks/useRepositoriesApi';
import { ROUTES } from '@/shared/config/routes';
import CopyButton from '@/shared/ui/CopyButton';
import RetryState from '@/shared/ui/RetryState';

import CodeDiffView from './CodeDiffView';
import InlineCodeText from './InlineCodeText';

function getSafeReferenceUrl(referenceUrl: string) {
  const candidate = referenceUrl.match(/https:\/\/[^\s)\]]+/)?.[0];
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function getFixSteps(summary: string) {
  const steps = summary
    .trim()
    .split(/(?=\d+\.\s)/)
    .map((step) => step.trim())
    .filter(Boolean);

  if (steps.length < 2 || !steps.every((step) => /^\d+\.\s/.test(step))) return null;
  return steps.map((step) => step.replace(/^\d+\.\s/, ''));
}

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

  const fixCode = detail.fixCode?.trim() ? detail.fixCode : null;
  const fixSteps = getFixSteps(detail.fixSummary);
  const references = detail.references ?? [];

  return (
    <div className="border-border-subtle flex min-w-0 flex-col gap-4 border-t pt-4">
      <CodeDiffView
        oldCode={detail.codeSnippet}
        newCode={fixCode ?? detail.codeSnippet}
        startLine={detail.lineStart}
      />

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="border-border-subtle min-w-0 rounded-lg border p-4">
          <div className="flex min-w-0 flex-col items-start gap-2">
            <h3 className="text-label-lg text-foreground wrap-break-word">
              {detail.vulnerabilityType}
            </h3>
          </div>
          <h4 className="text-label-md text-foreground mt-4 inline-flex items-center gap-2">
            <SearchCheck className="size-4 shrink-0" aria-hidden="true" />
            분석 근거
          </h4>
          <p className="text-body-md text-foreground-secondary mt-1 wrap-break-word">
            <InlineCodeText text={detail.description} />
          </p>
          <h4 className="text-label-md text-foreground mt-3 inline-flex items-center gap-2">
            <ShieldAlert className="size-4 shrink-0" aria-hidden="true" />
            공격 시나리오
          </h4>
          <p className="text-body-md text-foreground-secondary mt-1 wrap-break-word">
            <InlineCodeText text={detail.attackScenario} />
          </p>
        </section>

        <section className="border-border-subtle min-w-0 rounded-lg border p-4">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-label-md text-foreground inline-flex items-center gap-2">
              <Wrench className="size-4 shrink-0" aria-hidden="true" />
              수정 방법
            </h3>
            {fixCode && <CopyButton text={fixCode} label="코드 복사" />}
          </div>
          {fixSteps ? (
            <ol className="text-body-md text-foreground-secondary list-inside list-decimal space-y-2">
              {fixSteps.map((step, index) => (
                <li key={`${index}-${step}`} className="wrap-break-word">
                  <InlineCodeText text={step} />
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-body-md text-foreground-secondary wrap-break-word">
              <InlineCodeText text={detail.fixSummary} />
            </p>
          )}
          {fixCode ? (
            <pre className="text-body-sm bg-surface-subtle text-foreground-secondary mt-3 rounded p-3 font-mono wrap-break-word whitespace-pre-wrap">
              {fixCode}
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
        </section>
      </div>

      {references.length > 0 && (
        <section className="border-border-subtle min-w-0 border-t pt-4">
          <h3 className="text-label-lg text-foreground">참고 자료</h3>
          <ul className="mt-2 flex min-w-0 flex-col">
            {references.map((reference) => {
              const href = getSafeReferenceUrl(reference.referenceUrl);

              return (
                <li
                  key={reference.securityReferenceId}
                  className="border-border-subtle min-w-0 border-b py-2 last:border-b-0"
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-sm text-blue inline-flex min-w-0 items-start gap-2 transition-colors hover:underline"
                    >
                      <span className="min-w-0 wrap-break-word">{reference.title}</span>
                      <span className="shrink-0" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="text-body-sm text-foreground-secondary wrap-break-word">
                      {reference.title}
                    </span>
                  )}
                  <span className="text-caption text-foreground-tertiary ml-2">
                    {reference.referenceType === 'OTHER' && href
                      ? new URL(href).hostname.replace(/^www\./, '')
                      : reference.referenceType}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
