import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterEach, vi } from 'vitest';

afterEach(() => cleanup());

vi.mock('next/image', () => ({
  default: ({
    priority: _priority,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    void _priority;
    // next/image의 최적화 동작 대신 접근성/상호작용만 검증한다.
    return React.createElement('img', props);
  },
}));

vi.mock('@/shared/lib/viewTransition', () => ({
  // 순정 react 패키지엔 없는 canary API라, 자식을 그대로 렌더링해 통과시킨다.
  ViewTransition: ({ children }: { children?: React.ReactNode }) => children,
}));
