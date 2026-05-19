import type { RefObject } from 'react';
import { useEffect } from 'react';

export function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  callback: () => void,
) {
  useEffect(() => {
    const refsArray = Array.isArray(refs) ? refs : [refs];

    const handler = (e: MouseEvent) => {
      const isInside = refsArray.some((ref) => ref.current?.contains(e.target as Node));
      if (!isInside) callback();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [refs, callback]);
}
