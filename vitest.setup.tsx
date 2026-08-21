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
  // ViewTransition은 React canary 전용 API라 Next 빌드에서만 alias되어 존재하고,
  // Vitest가 쓰는 순정 react 패키지에는 없다. 테스트에서는 자식을 그대로 렌더링해
  // DOM 구조/접근성만 검증한다.
  ViewTransition: ({ children }: { children?: React.ReactNode }) => children,
}));
