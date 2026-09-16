import { CodeDiffView, SeverityBadge } from '@/features/repositories';
import { MOCK_ISSUE_DETAIL } from '@/widgets/landing/model/mockHowItWorksData';

import MockRepositoryHeader from './MockRepositoryHeader';
import PreviewShell from './PreviewShell';

export default function IssueDetailPreview() {
  return (
    <PreviewShell align="start">
      <MockRepositoryHeader />

      <article className="border-border-subtle bg-surface flex shrink-0 grow flex-col rounded-2xl border p-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <SeverityBadge severity={MOCK_ISSUE_DETAIL.severity} />
          <h3 className="text-label-lg text-foreground">{MOCK_ISSUE_DETAIL.vulnerabilityType}</h3>
          <span className="text-body-sm text-foreground-tertiary">
            {MOCK_ISSUE_DETAIL.filePath}:{MOCK_ISSUE_DETAIL.lineStart}-{MOCK_ISSUE_DETAIL.lineEnd}
          </span>
        </div>
        <p className="text-body-sm text-foreground-secondary mt-2">{MOCK_ISSUE_DETAIL.summary}</p>

        <div className="mt-4">
          <CodeDiffView
            oldCode={MOCK_ISSUE_DETAIL.codeSnippet}
            newCode={MOCK_ISSUE_DETAIL.fixCode}
            startLine={MOCK_ISSUE_DETAIL.lineStart}
          />
        </div>

        <div className="border-border-subtle mt-4 border-t pt-3">
          <p className="text-label-mono text-foreground-disabled font-mono">ATTACK SCENARIO</p>
          <p className="text-body-sm text-foreground-secondary mt-1.5">
            {MOCK_ISSUE_DETAIL.attackScenario}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <div className="border-border-subtle rounded-xl border p-4">
            <p className="text-label-md text-foreground">수정 방법</p>
            <p className="text-body-sm text-foreground-secondary mt-2">
              {MOCK_ISSUE_DETAIL.fixSummary}
            </p>
          </div>
        </div>
      </article>
    </PreviewShell>
  );
}
