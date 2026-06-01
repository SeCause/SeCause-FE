interface Props {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
}

const BADGES = [
  {
    key: 'critical' as const,
    label: '심각',
    dotClass: 'bg-severity-critical',
    textClass: 'text-severity-critical',
  },
  {
    key: 'high' as const,
    label: '높음',
    dotClass: 'bg-severity-high',
    textClass: 'text-severity-high',
  },
  {
    key: 'medium' as const,
    label: '보통',
    dotClass: 'bg-severity-medium',
    textClass: 'text-severity-medium',
  },
] as const;

const COUNT_MAP = {
  critical: (p: Props) => p.criticalCount,
  high: (p: Props) => p.highCount,
  medium: (p: Props) => p.mediumCount,
};

export default function SeverityBadges(props: Props) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
      {BADGES.map(({ key, label, dotClass, textClass }) => (
        <span key={key} className="text-label-sm flex shrink-0 items-center gap-1">
          <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
          <span className={`font-semibold ${textClass}`}>{COUNT_MAP[key](props)}</span>
          <span className="text-gray-600">{label}</span>
        </span>
      ))}
    </div>
  );
}
