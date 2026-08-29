import { CodeDiffView, SeverityBadge } from '@/features/repositories';
import { MOCK_ISSUE_DETAIL } from '@/widgets/landing/model/mockHowItWorksData';

import MockRepositoryHeader from './MockRepositoryHeader';
import PreviewShell from './PreviewShell';

export default function IssueDetailPreview() {
  return (
    <PreviewShell align="start">
      <MockRepositoryHeader />

      <article className="flex shrink-0 grow flex-col rounded-2xl border border-gray-900/10 bg-white p-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <SeverityBadge severity={MOCK_ISSUE_DETAIL.severity} />
          <h3 className="text-label-lg text-gray-900">{MOCK_ISSUE_DETAIL.vulnerabilityType}</h3>
          <span className="text-body-sm text-gray-500">
            {MOCK_ISSUE_DETAIL.filePath}:{MOCK_ISSUE_DETAIL.lineStart}-{MOCK_ISSUE_DETAIL.lineEnd}
          </span>
        </div>
        <p className="text-body-sm mt-2 text-gray-600">{MOCK_ISSUE_DETAIL.summary}</p>

        <div className="mt-4">
          <CodeDiffView
            oldCode={MOCK_ISSUE_DETAIL.codeSnippet}
            newCode={MOCK_ISSUE_DETAIL.fixCode}
            startLine={MOCK_ISSUE_DETAIL.lineStart}
          />
        </div>

        <div className="mt-4 border-t border-gray-900/10 pt-3">
          <p className="text-label-mono font-mono text-gray-400">ATTACK SCENARIO</p>
          <p className="text-body-sm mt-1.5 text-gray-600">{MOCK_ISSUE_DETAIL.attackScenario}</p>
        </div>

        <div className="mt-auto pt-4">
          <div className="rounded-xl border border-gray-900/10 p-4">
            <p className="text-label-md text-gray-900">수정 방법</p>
            <p className="text-body-sm mt-2 text-gray-600">{MOCK_ISSUE_DETAIL.fixSummary}</p>
          </div>
        </div>
      </article>
    </PreviewShell>
  );
}
