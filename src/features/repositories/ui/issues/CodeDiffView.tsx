import { diffLines } from 'diff';

import { cn } from '@/shared/lib/cn';

interface Props {
  oldCode: string;
  newCode: string;
  startLine?: number;
}

const ROW_STYLES = {
  added: {
    row: 'bg-emerald-100',
    lineNumber: 'text-emerald-600',
    sign: 'text-emerald-600',
    text: 'text-emerald-950',
    symbol: '+',
  },
  removed: {
    row: 'bg-red-100',
    lineNumber: 'text-red-500',
    sign: 'text-red-500',
    text: 'text-red-950',
    symbol: '-',
  },
  unchanged: {
    row: '',
    lineNumber: 'text-gray-400',
    sign: 'text-gray-300',
    text: 'text-gray-800',
    symbol: ' ',
  },
} as const;

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
      {rows.map((row) => {
        const style = ROW_STYLES[row.type];

        return (
          <div key={row.key} className={cn('flex gap-3 px-3 py-0.5', style.row)}>
            <span className={cn('w-7 shrink-0 text-right select-none', style.lineNumber)}>
              {row.lineNumber}
            </span>
            <span className={cn('w-3 shrink-0 font-semibold', style.sign)}>{style.symbol}</span>
            <span className={cn('whitespace-pre', style.text)}>{row.line}</span>
          </div>
        );
      })}
    </div>
  );
}
