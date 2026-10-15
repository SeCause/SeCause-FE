import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import { expect, it, vi } from 'vitest';

import LoginCallbackClient from './LoginCallbackClient';

const { mutate, replace, showToast } = vi.hoisted(() => ({
  mutate: vi.fn(),
  replace: vi.fn(),
  showToast: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('code=github-code'),
  useRouter: () => ({ replace }),
}));
vi.mock('@/features/auth', () => ({
  useGithubLogin: () => ({ mutate, isPending: true }),
}));
vi.mock('@/shared/ui/Toast', () => ({ useToast: () => ({ showToast }) }));

it('submits the one-time code once across Strict Mode effects and rerenders', () => {
  const { rerender } = render(
    <StrictMode>
      <LoginCallbackClient />
    </StrictMode>,
  );

  rerender(
    <StrictMode>
      <LoginCallbackClient />
    </StrictMode>,
  );

  expect(mutate).toHaveBeenCalledExactlyOnceWith('github-code', {
    onError: expect.any(Function),
  });
});
