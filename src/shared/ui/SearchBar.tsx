'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import SearchIcon from '@/icons/icon_search.svg';
import { cn } from '@/shared/lib/cn';
import { useDebounce } from '@/shared/lib/useDebounce';

interface Props {
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  containerClassName?: string;
  'aria-label'?: string;
}

export default function SearchBar({
  onChange,
  placeholder = '검색',
  debounce = 300,
  containerClassName,
  'aria-label': ariaLabel,
}: Props) {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, debounce);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    onChange(debouncedInput);
  }, [debouncedInput, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onChange(input);
  };

  return (
    <div
      role="search"
      className={cn(
        'flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2',
        containerClassName,
      )}
    >
      <Image src={SearchIcon} className="h-4 w-4 shrink-0" alt="" aria-hidden="true" />
      <input
        type="text"
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-body-md w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-500"
      />
    </div>
  );
}
