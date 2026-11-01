import { FileCode2 } from 'lucide-react';
import Image from 'next/image';

import type { RepositoryIssue } from '@/features/repositories/model/types';
import SeverityBadge from '@/features/repositories/ui/SeverityBadge';
import ArrowIcon from '@/icons/icon_arrow.svg';
import { cn } from '@/shared/lib/cn';

import InlineCodeText from './InlineCodeText';
import IssueDetailPanel from './IssueDetailPanel';

interface Props {
  issue: RepositoryIssue;
  repositoryId: number;
  expanded: boolean;
  onToggle: (analysisResultId: number) => void;
}

export default function IssueCard({ issue, repositoryId, expanded, onToggle }: Props) {
  return (
    <div className="hover:border-blue/25 border-border-subtle bg-surface flex min-w-0 flex-col gap-3 rounded-2xl border px-5 py-5 transition-colors md:px-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <SeverityBadge severity={issue.severity} />
            <span className="text-label-lg text-foreground">{issue.vulnerabilityType}</span>
          </div>
          <span className="text-body-sm text-foreground-tertiary mt-2 inline-flex min-w-0 items-center gap-1.5">
            <FileCode2 className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate">
              {issue.filePath}:{issue.lineStart}
              {issue.lineEnd !== issue.lineStart ? `–${issue.lineEnd}` : ''}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggle(issue.analysisResultId)}
          className="text-label-md hover:border-blue hover:text-blue border-border-subtle text-foreground-secondary flex shrink-0 items-center gap-1 rounded-full border px-4 py-2 whitespace-nowrap"
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

      <p className="text-body-md text-foreground-secondary -mt-1 wrap-break-word">
        <InlineCodeText text={issue.summary} />
      </p>

      {expanded && (
        <div className="min-w-0 overflow-hidden motion-safe:animate-[issueDetailDown_220ms_ease-out]">
          <IssueDetailPanel repositoryId={repositoryId} analysisResultId={issue.analysisResultId} />
        </div>
      )}
    </div>
  );
}
