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
    <div className="rounded-2xl border border-gray-900/10 bg-white p-5">
      <h2 className="mb-3 text-xs font-semibold tracking-[0.08em] text-gray-500">CODE DETAILS</h2>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1 border-l border-gray-900/10 pl-4">
            <dt className="text-xs font-medium text-gray-600">{label}</dt>
            <dd className="text-sm font-semibold text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
