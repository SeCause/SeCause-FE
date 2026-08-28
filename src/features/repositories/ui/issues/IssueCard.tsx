import Image from 'next/image';

import type { RepositoryIssue } from '@/features/repositories/model/types';
import SeverityBadge from '@/features/repositories/ui/SeverityBadge';
import ArrowIcon from '@/icons/icon_arrow.svg';
import { cn } from '@/shared/lib/cn';

import IssueDetailPanel from './IssueDetailPanel';

interface Props {
  issue: RepositoryIssue;
  repositoryId: number;
  expanded: boolean;
  onToggle: (analysisResultId: number) => void;
}

export default function IssueCard({ issue, repositoryId, expanded, onToggle }: Props) {
  return (
    <div className="hover:border-blue/25 flex min-w-0 flex-col gap-3 rounded-2xl border border-gray-900/10 bg-white px-5 py-5 transition-colors md:px-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <SeverityBadge severity={issue.severity} />
            <span className="text-label-lg text-gray-900">{issue.vulnerabilityType}</span>
            <span className="text-body-sm truncate text-gray-500">
              {issue.filePath}:{issue.lineStart}-{issue.lineEnd}
            </span>
          </div>
          <p className="text-body-md mt-2 text-gray-700">{issue.summary}</p>
        </div>

        <button
          type="button"
          onClick={() => onToggle(issue.analysisResultId)}
          className="text-label-md hover:border-blue hover:text-blue flex shrink-0 items-center gap-1 rounded-full border border-gray-900/15 px-4 py-2 text-gray-700"
        >
          {expanded ? 'Close Issue' : 'View Issue'}
          <Image
            src={ArrowIcon}
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className={cn(!expanded && 'rotate-180')}
          />
        </button>
      </div>

      {expanded && (
        <div className="min-w-0 overflow-hidden motion-safe:animate-[issueDetailDown_220ms_ease-out]">
          <IssueDetailPanel repositoryId={repositoryId} analysisResultId={issue.analysisResultId} />
        </div>
      )}
    </div>
  );
}
