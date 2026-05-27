'use client';

import Image from 'next/image';
import { useCallback, useId, useRef, useState } from 'react';

import ArrowIcon from '@/icons/icon_arrow.svg';
import { useClickOutside } from '@/shared/lib/useClickOutside';

export interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  fullWidth?: boolean;
  'aria-labelledby'?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  leadingIcon,
  fullWidth = false,
  'aria-labelledby': ariaLabelledby,
}: Props) {
  const id = useId();
  const listboxId = `${id}-listbox`;

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    containerRef,
    useCallback(() => setOpen(false), []),
  );

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? 'w-full' : 'w-fit'}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={ariaLabelledby}
        className={`text-body-md flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 ${fullWidth ? 'w-full' : ''}`}
      >
        {leadingIcon && (
          <span className="shrink-0 text-gray-700" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <span
          className={`flex-1 text-left font-medium ${selected ? 'text-gray-900' : 'text-gray-500'}`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <Image
          src={ArrowIcon}
          className={`h-5 w-5 shrink-0 text-gray-700 ${open ? 'rotate-180' : ''}`}
          alt=""
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          id={listboxId}
          aria-labelledby={ariaLabelledby}
          className="z-dropdown absolute mt-1 w-full min-w-max rounded-lg border border-gray-300 bg-white py-1 drop-shadow-sm"
        >
          {options.map((option) => (
            <li key={option.value} role="presentation">
              <button
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`text-body-md flex w-full items-center gap-2 px-3 py-2.5 text-left font-medium transition-colors hover:bg-gray-100 ${
                  value === option.value ? 'text-blue' : 'text-gray-900'
                }`}
              >
                {leadingIcon && (
                  <span className="shrink-0 text-gray-700" aria-hidden="true">
                    {leadingIcon}
                  </span>
                )}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
