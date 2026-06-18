export const SEVERITY_TAG_LABEL: Record<string, string> = {
  CRITICAL: '심각',
  HIGH: '높음',
  MEDIUM: '보통',
  LOW: '낮음',
};

export const SEVERITY_TAG_STYLE: Record<string, string> = {
  CRITICAL: 'border-severity-critical bg-severity-critical/10 text-severity-critical',
  HIGH: 'border-severity-high bg-severity-high/15 text-severity-high',
  MEDIUM: 'border-severity-medium bg-severity-medium/10 text-severity-medium',
  LOW: 'border-severity-low bg-severity-low/20 text-gray-600',
};

export const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: 'var(--color-severity-critical)',
  HIGH: 'var(--color-severity-high)',
  MEDIUM: 'var(--color-severity-medium)',
  LOW: 'var(--color-severity-low)',
};
