export const SEVERITY_TAG_LABEL: Record<string, string> = {
  CRITICAL: '심각',
  HIGH: '높음',
  MEDIUM: '보통',
  LOW: '낮음',
};

export const SEVERITY_TAG_STYLE: Record<string, string> = {
  CRITICAL: 'border-severity-critical bg-severity-critical-bg text-severity-critical-text',
  HIGH: 'border-severity-high bg-severity-high-bg text-severity-high-text',
  MEDIUM: 'border-severity-medium bg-severity-medium-bg text-severity-medium-text',
  LOW: 'border-severity-low bg-severity-low-bg text-severity-low-text',
};

export const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: 'var(--color-severity-critical)',
  HIGH: 'var(--color-severity-high)',
  MEDIUM: 'var(--color-severity-medium)',
  LOW: 'var(--color-severity-low)',
};
