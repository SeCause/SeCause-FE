interface Props {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
}

const BADGES = [
  { key: 'critical' as const, label: '심각', color: '#FC4F4F' },
  { key: 'high' as const, label: '높음', color: '#FFCE3A' },
  { key: 'medium' as const, label: '보통', color: '#4FA0FC' },
] as const;

const COUNT_MAP = {
  critical: (p: Props) => p.criticalCount,
  high: (p: Props) => p.highCount,
  medium: (p: Props) => p.mediumCount,
};

export default function SeverityBadges(props: Props) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
      {BADGES.map(({ key, label, color }) => (
        <span key={key} className="text-label-sm flex shrink-0 items-center gap-1">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span style={{ color }} className="font-semibold">
            {COUNT_MAP[key](props)}
          </span>
          <span className="text-gray-600">{label}</span>
        </span>
      ))}
    </div>
  );
}
