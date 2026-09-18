import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = '';
    localStorage.clear();
  });

  it('테마를 전환하고 사용자 선택을 저장한다', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: '다크 모드로 전환' }));
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('secause-theme')).toBe('dark');

    await user.click(screen.getByRole('button', { name: '라이트 모드로 전환' }));
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('secause-theme')).toBe('light');
  });
});
