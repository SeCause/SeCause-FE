import { diffLines } from 'diff';

import { cn } from '@/shared/lib/cn';

interface Props {
  oldCode: string;
  newCode: string;
  startLine?: number;
}

export default function CodeDiffView({ oldCode, newCode, startLine = 1 }: Props) {
  const changes = diffLines(oldCode, newCode);

  let oldLineNumber = startLine;
  let newLineNumber = startLine;
  const rows: {
    key: string;
    line: string;
    type: 'added' | 'removed' | 'unchanged';
    lineNumber: number;
  }[] = [];

  changes.forEach((part, partIndex) => {
    const type = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
    const lines = part.value.replace(/\n$/, '').split('\n');

    lines.forEach((line, lineIndex) => {
      rows.push({
        key: `${partIndex}-${lineIndex}`,
        line,
        type,
        lineNumber: type === 'removed' ? oldLineNumber : newLineNumber,
      });

      if (type === 'added') {
        newLineNumber += 1;
      } else if (type === 'removed') {
        oldLineNumber += 1;
      } else {
        oldLineNumber += 1;
        newLineNumber += 1;
      }
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
          <span
            className={cn(
              'w-7 shrink-0 text-right select-none',
              row.type === 'added' && 'text-emerald-600',
              row.type === 'removed' && 'text-red-500',
              row.type === 'unchanged' && 'text-gray-400',
            )}
          >
            {row.lineNumber}
          </span>
          <span
            className={cn(
              'w-3 shrink-0 font-semibold',
              row.type === 'added' && 'text-emerald-600',
              row.type === 'removed' && 'text-red-500',
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
