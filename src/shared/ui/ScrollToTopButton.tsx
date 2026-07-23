'use client';

import Image from 'next/image';
import { type RefObject, useEffect, useState } from 'react';

import ArrowIcon from '@/icons/icon_arrow.svg';
import { cn } from '@/shared/lib/cn';

interface Props {
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
}

const SHOW_THRESHOLD = 300;

export default function ScrollToTopButton({ containerRef, className }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      setVisible(container.scrollTop > SHOW_THRESHOLD);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로 이동"
      className={cn(
        'fixed right-6 bottom-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white drop-shadow-sm transition-colors hover:bg-gray-50',
        className,
      )}
    >
      <Image src={ArrowIcon} alt="" aria-hidden="true" width={16} height={16} />
    </button>
  );
}
