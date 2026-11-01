'use client';

import { ChevronDown, FileCode2, SearchCheck, ShieldAlert, Wrench } from 'lucide-react';
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
  const trimmedSummary = summary.trim();
  const numberedSteps = trimmedSummary
    .trim()
    .split(/(?=\d+\.\s)/)
    .map((step) => step.trim())
    .filter(Boolean);

  if (numberedSteps.length >= 2 && numberedSteps.every((step) => /^\d+\.\s/.test(step))) {
    return numberedSteps.map((step) => step.replace(/^\d+\.\s/, ''));
  }

  const sentences = trimmedSummary
    .split(/(?<=[.!?])\s+(?=\S)/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences.length >= 2 ? sentences : null;
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
  const lineLabel =
    detail.lineStart === detail.lineEnd
      ? `${detail.lineStart}`
      : `${detail.lineStart}–${detail.lineEnd}`;

  return (
    <div className="border-border-subtle flex min-w-0 flex-col gap-5 border-t pt-5">
      <section
        className="border-border-strong min-w-0 border-l-2 py-1 pl-4"
        aria-label="취약점 요약"
      >
        <h4 className="text-label-md text-foreground mb-1">한눈에 보기</h4>
        <p className="text-body-md text-foreground leading-7 wrap-break-word">
          <InlineCodeText text={detail.summary} />
        </p>
      </section>

      <section className="min-w-0" aria-label="코드 위치">
        <h4 className="text-label-md text-foreground mb-2">취약 코드 및 수정 코드</h4>
        <div className="text-body-sm text-foreground-secondary mb-2 flex min-w-0 items-start justify-between gap-3">
          <span className="inline-flex min-w-0 items-start gap-1.5">
            <FileCode2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 wrap-break-word">{detail.filePath}</span>
          </span>
          <span className="text-caption text-foreground-tertiary shrink-0 pt-0.5">
            {lineLabel}행
          </span>
        </div>
        <CodeDiffView
          oldCode={detail.codeSnippet}
          newCode={fixCode ?? detail.codeSnippet}
          startLine={detail.lineStart}
        />
      </section>

      <section className="border-border-subtle min-w-0 border-t pt-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-label-md text-foreground inline-flex items-center">수정 방법</h3>
          </div>
          {fixCode && <CopyButton text={fixCode} label="코드 복사" />}
        </div>
        {fixSteps ? (
          <ol className="flex max-w-4xl flex-col gap-3">
            {fixSteps.map((step, index) => (
              <li
                key={`${index}-${step}`}
                className="grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-3"
              >
                <span className="text-label-sm text-foreground-secondary bg-surface-subtle flex size-6 items-center justify-center rounded-full">
                  {index + 1}
                </span>
                <span className="text-body-md text-foreground min-w-0 leading-7 wrap-break-word">
                  <InlineCodeText text={step} />
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-body-md text-foreground max-w-4xl leading-7 wrap-break-word">
            <InlineCodeText text={detail.fixSummary} />
          </p>
        )}
        {!fixCode && (
          <div className="bg-surface-subtle mt-3 rounded-lg p-4">
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

      <details className="group border-border-subtle min-w-0 border-t pt-4">
        <summary className="text-label-md text-foreground flex cursor-pointer list-none items-center justify-between gap-3">
          <span>{references.length > 0 ? '분석 상세 및 참고 자료' : '분석 상세'}</span>
          <ChevronDown
            className="text-foreground-tertiary size-4 shrink-0 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-4 flex min-w-0 flex-col gap-5">
          <section className="min-w-0">
            <h4 className="text-label-sm text-foreground-secondary inline-flex items-center gap-2">
              <SearchCheck className="size-4 shrink-0" aria-hidden="true" />
              분석 근거
            </h4>
            <p className="text-body-md text-foreground mt-2 max-w-4xl leading-7 wrap-break-word">
              <InlineCodeText text={detail.description} />
            </p>
          </section>

          <section className="min-w-0">
            <h4 className="text-label-sm text-foreground-secondary inline-flex items-center gap-2">
              <ShieldAlert className="size-4 shrink-0" aria-hidden="true" />
              공격 시나리오
            </h4>
            <p className="text-body-md text-foreground mt-2 max-w-4xl leading-7 wrap-break-word">
              <InlineCodeText text={detail.attackScenario} />
            </p>
          </section>

          {references.length > 0 && (
            <section className="min-w-0">
              <h4 className="text-label-sm text-foreground-secondary">참고 자료</h4>
              <ul className="mt-1 flex min-w-0 flex-col">
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
      </details>
    </div>
  );
}
