import { diffLines } from 'diff';

import { cn } from '@/shared/lib/cn';

interface Props {
  oldCode: string;
  newCode: string;
  startLine?: number;
}

export default function CodeDiffView({ oldCode, newCode, startLine = 1 }: Props) {
  const changes = diffLines(oldCode, newCode);

  let lineNumber = startLine;
  const rows: { key: string; line: string; type: 'added' | 'removed' | 'unchanged' }[] = [];

  changes.forEach((part, partIndex) => {
    const type = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
    const lines = part.value.replace(/\n$/, '').split('\n');

    lines.forEach((line, lineIndex) => {
      rows.push({ key: `${partIndex}-${lineIndex}`, line, type });
    });
  });

  return (
    <div className="scrollbar-custom-gray overflow-x-auto rounded-lg border border-gray-200 font-mono text-xs">
      {rows.map((row) => (
        <div
          key={row.key}
          className={cn(
            'flex gap-3 px-3 py-0.5',
            row.type === 'added' && 'bg-emerald-100',
            row.type === 'removed' && 'bg-red-100',
          )}
        >
          <span className="w-6 shrink-0 text-right text-gray-400">
            {row.type === 'removed' ? '' : lineNumber++}
          </span>
          <span
            className={cn(
              'w-3 shrink-0 font-semibold',
              row.type === 'added' && 'text-emerald-600',
              row.type === 'removed' && 'text-red-600',
              row.type === 'unchanged' && 'text-gray-300',
            )}
          >
            {row.type === 'added' ? '+' : row.type === 'removed' ? '-' : ' '}
          </span>
          <span
            className={cn(
              'whitespace-pre',
              row.type === 'added' && 'text-emerald-950',
              row.type === 'removed' && 'text-red-950',
              row.type === 'unchanged' && 'text-gray-800',
            )}
          >
            {row.line}
          </span>
        </div>
      ))}
    </div>
  );
}
