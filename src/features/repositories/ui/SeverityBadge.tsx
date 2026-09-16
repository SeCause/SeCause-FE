import type { IssueSeverity } from '@/features/repositories/model/types';
import { cn } from '@/shared/lib/cn';

import { SEVERITY_TAG_LABEL, SEVERITY_TAG_STYLE } from './severityTag';

interface Props {
  severity: IssueSeverity;
  className?: string;
}

export default function SeverityBadge({ severity, className }: Props) {
  return (
    <span
      className={cn(
        'text-label-md inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-semibold',
        SEVERITY_TAG_STYLE[severity] ??
          'border-border-default bg-surface-subtle text-foreground-secondary',
        className,
      )}
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
      {SEVERITY_TAG_LABEL[severity] ?? severity}
    </span>
  );
}
