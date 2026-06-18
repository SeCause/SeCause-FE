import type { RepositoryIssueTypeCount } from '@/features/repositories/model/types';
import { cn } from '@/shared/lib/cn';

import { SEVERITY_TAG_LABEL, SEVERITY_TAG_STYLE } from './severityTag';

interface Props {
  issuesByType: RepositoryIssueTypeCount[];
}

export default function IssuesByTypeCard({ issuesByType }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h2 className="text-label-lg mb-3 text-gray-900">Issues by Type</h2>
      {issuesByType.length === 0 ? (
        <p className="text-body-md text-gray-500">발견된 이슈가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {issuesByType.map((item) => (
            <li key={item.type} className="flex items-center gap-3">
              <span
                className={cn(
                  'text-label-sm shrink-0 rounded px-1.5 py-0.5 font-medium',
                  SEVERITY_TAG_STYLE[item.severity] ?? 'bg-gray-100 text-gray-600',
                )}
              >
                {SEVERITY_TAG_LABEL[item.severity] ?? item.severity}
              </span>
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
