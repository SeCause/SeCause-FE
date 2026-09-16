'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import ArrowIcon from '@/icons/icon_arrow.svg';
import { cn } from '@/shared/lib/cn';
import { useClickOutside } from '@/shared/lib/useClickOutside';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface Props {
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  buttonClassName?: string;
  listboxClassName?: string;
  'aria-labelledby'?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  className,
  buttonClassName,
  listboxClassName,
  'aria-labelledby': ariaLabelledby,
}: Props) {
  const id = useId();
  const listboxId = `${id}-listbox`;

  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useClickOutside(
    containerRef,
    useCallback(() => setOpen(false), []),
  );

  const selected = options.find((o) => o.value === value);
  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (open && focusedIndex >= 0) optionRefs.current[focusedIndex]?.focus();
  }, [focusedIndex, open]);

  const openDropdown = (index = selectedIndex >= 0 ? selectedIndex : 0) => {
    if (options.length === 0) return;
    setFocusedIndex(index);
    setOpen(true);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const fallbackIndex = event.key === 'ArrowDown' ? 0 : options.length - 1;
      openDropdown(selectedIndex >= 0 ? selectedIndex : fallbackIndex);
    }
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    setFocusedIndex((current) => {
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      return (current + offset + options.length) % options.length;
    });
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn('relative', fullWidth ? 'w-full' : 'w-fit', className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={ariaLabelledby}
        className={cn(
          'text-body-md border-border-default bg-surface flex items-center gap-2 rounded-lg border px-3 py-2.5',
          fullWidth && 'w-full',
          buttonClassName,
        )}
      >
        {leadingIcon && (
          <span className="text-foreground-secondary shrink-0" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {!leadingIcon && selected?.icon && (
          <span className="text-foreground-secondary shrink-0">{selected.icon}</span>
        )}
        <span
          title={selected?.label}
          className={cn(
            'min-w-0 flex-1 truncate text-left font-medium',
            selected ? 'text-foreground' : 'text-foreground-secondary',
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        {trailingIcon ? (
          <span className="shrink-0" aria-hidden="true">
            {trailingIcon}
          </span>
        ) : (
          <Image
            src={ArrowIcon}
            className={cn('text-foreground-secondary h-5 w-5 shrink-0', !open && 'rotate-180')}
            alt=""
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <ul
          role="listbox"
          id={listboxId}
          aria-labelledby={ariaLabelledby}
          onKeyDown={handleListboxKeyDown}
          className={cn(
            'scrollbar-custom-gray z-dropdown border-border-default bg-surface absolute mt-1 max-h-54 w-full min-w-max overflow-y-auto rounded-lg border py-1 drop-shadow-sm',
            listboxClassName,
          )}
        >
          {options.map((option, index) => (
            <li key={option.value} role="presentation">
              <button
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'text-body-md hover:bg-surface-muted flex w-full items-center gap-2 px-3 py-2.5 text-left font-medium transition-colors',
                  value === option.value ? 'text-blue' : 'text-foreground',
                )}
              >
                {leadingIcon && (
                  <span className="text-foreground-secondary shrink-0" aria-hidden="true">
                    {leadingIcon}
                  </span>
                )}
                {!leadingIcon && option.icon && (
                  <span className="text-foreground-secondary shrink-0">{option.icon}</span>
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
