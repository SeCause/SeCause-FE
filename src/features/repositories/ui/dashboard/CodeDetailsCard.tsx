import type { RepositoryCodeDetails } from '@/features/repositories/model/types';
import { formatRelativeTime } from '@/shared/lib/formatDate';

const lineCountFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

interface Props {
  codeDetails: RepositoryCodeDetails;
  lastAnalysisAt: string | null;
}

export default function CodeDetailsCard({ codeDetails, lastAnalysisAt }: Props) {
  const rows = [
    { label: '브랜치', value: codeDetails.branch },
    { label: '코드 라인 수', value: lineCountFormatter.format(codeDetails.lineCount) },
    { label: '사용 언어', value: codeDetails.languages.join(', ') || '-' },
    {
      label: '마지막 분석',
      value: lastAnalysisAt ? formatRelativeTime(lastAnalysisAt) : '분석 기록 없음',
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h2 className="text-label-lg mb-3 text-gray-900">Code Details</h2>
      <dl className="flex flex-col gap-2">
        {rows.map(({ label, value }) => (
          <div key={label} className="text-body-md flex items-center gap-2">
            <dt className="w-28 shrink-0 text-gray-500">{label}</dt>
            <dd className="text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
