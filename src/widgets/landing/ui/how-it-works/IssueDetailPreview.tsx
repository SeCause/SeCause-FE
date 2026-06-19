import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { CodeDiffView, IssueFileTabs, SeverityBadge } from '@/features/repositories';
import ArrowIcon from '@/icons/icon_arrow.svg';
import { cn } from '@/shared/lib/cn';
import { MOCK_FILES, MOCK_ISSUE_DETAIL } from '@/widgets/landing/model/mockHowItWorksData';

import MockRepositoryHeader from './MockRepositoryHeader';
import PreviewShell from './PreviewShell';

const EXPAND_DELAY_MS = 500;

export default function IssueDetailPreview() {
  const [expanded, setExpanded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const expandTimer = setTimeout(() => setExpanded(true), EXPAND_DELAY_MS);
    return () => clearTimeout(expandTimer);
  }, [hasStarted]);

  return (
    <PreviewShell>
      <MockRepositoryHeader />

      <div className="grid grid-cols-1 gap-2 min-[1162px]:grid-cols-[8rem_1fr] min-[1162px]:items-start">
        <IssueFileTabs
          files={MOCK_FILES}
          selectedFilePath={MOCK_FILES[0].filePath}
          isLoading={false}
          isError={false}
          onSelect={() => {}}
        />

        <div
          ref={cardRef}
          className="flex flex-col gap-2 rounded-xl border border-gray-200 px-4 py-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                <SeverityBadge severity={MOCK_ISSUE_DETAIL.severity} />
                <span className="text-label-lg text-gray-900">
                  {MOCK_ISSUE_DETAIL.vulnerabilityType}
                </span>
                <span className="text-body-sm truncate text-gray-500">
                  {MOCK_ISSUE_DETAIL.filePath}:{MOCK_ISSUE_DETAIL.lineStart}-
                  {MOCK_ISSUE_DETAIL.lineEnd}
                </span>
              </div>
              <p className="text-body-sm mt-2 text-gray-700">{MOCK_ISSUE_DETAIL.summary}</p>
            </div>

            <span className="text-label-md flex shrink-0 items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-gray-700">
              {expanded ? 'Close Issue' : 'View Issue'}
              <Image
                src={ArrowIcon}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className={cn(!expanded && 'rotate-180')}
              />
            </span>
          </div>

          {expanded && (
            <div className="overflow-hidden motion-safe:animate-[issueDetailDown_220ms_ease-out]">
              <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                <CodeDiffView
                  oldCode={MOCK_ISSUE_DETAIL.codeSnippet}
                  newCode={MOCK_ISSUE_DETAIL.fixCode}
                  startLine={MOCK_ISSUE_DETAIL.lineStart}
                />

                <div className="grid grid-cols-1 gap-4 min-[1162px]:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 p-3.5">
                    <p className="text-label-lg mb-1 text-gray-900">
                      취약점: {MOCK_ISSUE_DETAIL.vulnerabilityType}
                    </p>
                    <p className="text-body-sm text-gray-700">
                      <span className="font-semibold">원인:</span> {MOCK_ISSUE_DETAIL.description}
                    </p>
                    <p className="text-body-sm mt-2 text-gray-700">
                      <span className="font-semibold">공격 예시:</span>
                    </p>
                    <p className="text-body-sm rounded bg-gray-50 p-2 font-mono text-gray-700">
                      {MOCK_ISSUE_DETAIL.attackScenario}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-3.5">
                    <p className="text-label-lg mb-1 text-gray-900">수정 방법</p>
                    <p className="text-body-sm text-gray-700">{MOCK_ISSUE_DETAIL.fixSummary}</p>
                    <pre className="text-body-sm rounded bg-gray-50 p-2 font-mono wrap-break-word whitespace-pre-wrap text-gray-700">
                      {MOCK_ISSUE_DETAIL.fixCode}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewShell>
  );
}
