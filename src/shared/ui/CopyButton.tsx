'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface Props {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ text, label = '복사', className }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? '복사 완료' : label}
      className={cn(
        'text-label-sm hover:border-blue hover:text-blue flex shrink-0 items-center gap-1.5 rounded-full border border-gray-900/15 px-3 py-1 text-gray-600 transition-colors',
        copied && 'border-blue/40 text-blue',
        className,
      )}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      <span aria-hidden="true">{copied ? '복사됨' : label}</span>
    </button>
  );
}
