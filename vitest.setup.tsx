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
