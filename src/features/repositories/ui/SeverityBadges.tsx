interface Props {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
}

const BADGES = [
  {
    key: 'critical' as const,
    label: '심각',
    dotClass: 'bg-severity-critical',
    textClass: 'text-severity-critical-text',
  },
  {
    key: 'high' as const,
    label: '높음',
    dotClass: 'bg-severity-high',
    textClass: 'text-severity-high-text',
  },
  {
    key: 'medium' as const,
    label: '보통',
    dotClass: 'bg-severity-medium',
    textClass: 'text-severity-medium-text',
  },
  {
    key: 'low' as const,
    label: '낮음',
    dotClass: 'bg-severity-low',
    textClass: 'text-severity-low-text',
  },
] as const;

const COUNT_MAP = {
  critical: (p: Props) => p.criticalCount,
  high: (p: Props) => p.highCount,
  medium: (p: Props) => p.mediumCount,
  low: (p: Props) => p.lowCount,
};

export default function SeverityBadges(props: Props) {
  return (
    <div className="scrollbar-hide flex min-w-0 flex-nowrap items-center gap-x-2 overflow-x-auto">
      {BADGES.map(({ key, label, dotClass, textClass }) => (
        <span key={key} className="text-label-sm flex shrink-0 items-center gap-1">
          <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
          <span className={`font-semibold ${textClass}`}>{COUNT_MAP[key](props)}</span>
          <span className="text-foreground-secondary">{label}</span>
        </span>
      ))}
    </div>
  );
}
