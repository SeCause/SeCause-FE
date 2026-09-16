'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const lastEmittedValue = useRef(input);

  const emitChange = useCallback(
    (value: string) => {
      if (lastEmittedValue.current === value) return;
      lastEmittedValue.current = value;
      onChange(value);
    },
    [onChange],
  );

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    emitChange(debouncedInput);
  }, [debouncedInput, emitChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') emitChange(input);
    if (e.key === 'Escape' && input) {
      setInput('');
      emitChange('');
    }
  };

  const clearInput = () => {
    setInput('');
    emitChange('');
    inputRef.current?.focus();
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
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-body-md w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-500"
      />
      {input ? (
        <button
          type="button"
          onClick={clearInput}
          aria-label="검색어 지우기"
          className="focus-visible:outline-blue shrink-0 rounded p-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
