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
    <div className="border-border-subtle bg-surface rounded-2xl border p-5">
      <h2 className="text-foreground-tertiary mb-3 text-xs font-semibold tracking-[0.08em]">
        CODE DETAILS
      </h2>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ label, value }) => (
          <div key={label} className="border-border-subtle flex flex-col gap-1 border-l pl-4">
            <dt className="text-foreground-secondary text-xs font-medium">{label}</dt>
            <dd className="text-foreground text-sm font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
