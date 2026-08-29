'use client';

import { useCallback, useSyncExternalStore } from 'react';

// 서버는 미디어 쿼리를 알 수 없어 false로 시작한다.
const unmatchedOnServer = () => false;

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, unmatchedOnServer);
}
