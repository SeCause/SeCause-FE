import type { RepositoryIssueTypeCount } from '@/features/repositories/model/types';
import SeverityBadge from '@/features/repositories/ui/SeverityBadge';

interface Props {
  issuesByType: RepositoryIssueTypeCount[];
}

export default function IssuesByTypeCard({ issuesByType }: Props) {
  return (
    <div className="rounded-2xl border border-gray-900/10 bg-white p-6">
      <h2 className="mb-5 text-xs font-semibold tracking-[0.08em] text-gray-500">ISSUES BY TYPE</h2>
      {issuesByType.length === 0 ? (
        <p className="text-body-md text-gray-500">발견된 이슈가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {issuesByType.map((item) => (
            <li key={item.type} className="flex items-center gap-3">
              <SeverityBadge severity={item.severity} className="text-label-sm px-2 py-0.5" />
              <span className="text-body-md flex-1 text-gray-900">{item.type}</span>
              <span className="text-label-sm rounded bg-gray-100 px-1.5 py-0.5 text-gray-700">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
