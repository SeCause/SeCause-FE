import type { RepositoryIssueTypeCount } from '@/features/repositories/model/types';
import SeverityBadge from '@/features/repositories/ui/SeverityBadge';

interface Props {
  issuesByType: RepositoryIssueTypeCount[];
}

export default function IssuesByTypeCard({ issuesByType }: Props) {
  return (
    <div className="border-border-subtle bg-surface rounded-2xl border p-6">
      <h2 className="text-foreground-tertiary mb-5 text-xs font-semibold tracking-[0.08em]">
        ISSUES BY TYPE
      </h2>
      {issuesByType.length === 0 ? (
        <p className="text-body-md text-foreground-tertiary">발견된 이슈가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {issuesByType.map((item) => (
            <li key={item.type} className="flex items-center gap-3">
              <SeverityBadge severity={item.severity} className="text-label-sm px-2 py-0.5" />
              <span className="text-body-md text-foreground flex-1">{item.type}</span>
              <span className="text-label-sm bg-surface-muted text-foreground-secondary rounded px-1.5 py-0.5">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
