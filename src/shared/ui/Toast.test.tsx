import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ToastProvider, useToast } from './Toast';

function ToastTrigger({
  message = '테스트 알림',
  type = 'error',
}: {
  message?: string;
  type?: 'error' | 'success';
}) {
  const { showToast } = useToast();

  return <button onClick={() => showToast(message, type)}>{message} 표시</button>;
}

describe('ToastProvider', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('오류와 성공 알림을 각각 적절한 live region으로 제공한다', () => {
    const { rerender } = render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: '테스트 알림 표시' }));
    expect(screen.getByRole('alert')).toHaveTextContent('테스트 알림');

    rerender(
      <ToastProvider>
        <ToastTrigger type="success" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: '테스트 알림 표시' }));
    expect(screen.getByRole('status')).toHaveTextContent('테스트 알림');
  });

  it('닫기 버튼을 누르면 알림을 즉시 제거한다', () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: '테스트 알림 표시' }));

    fireEvent.click(screen.getByRole('button', { name: '알림 닫기' }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('표시 시간이 지나면 알림을 자동으로 제거한다', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: '테스트 알림 표시' }));

    act(() => vi.advanceTimersByTime(3500));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('새 알림이 표시되면 기존 알림을 교체한다', () => {
    render(
      <ToastProvider>
        <ToastTrigger message="첫 번째 알림" />
        <ToastTrigger message="두 번째 알림" type="success" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: '첫 번째 알림 표시' }));

    fireEvent.click(screen.getByRole('button', { name: '두 번째 알림 표시' }));

    expect(screen.queryByText('첫 번째 알림')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('두 번째 알림');
  });
});
