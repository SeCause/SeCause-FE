import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('검색어 지우기 버튼으로 값을 초기화하고 검색창에 포커스를 유지한다', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar onChange={onChange} debounce={0} aria-label="저장소 검색" />);
    const input = screen.getByRole('textbox', { name: '저장소 검색' });

    await user.type(input, 'frontend');
    await user.click(screen.getByRole('button', { name: '검색어 지우기' }));

    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(onChange).toHaveBeenLastCalledWith('');
  });

  it('Escape 키로 검색어를 초기화한다', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar onChange={onChange} debounce={0} aria-label="저장소 검색" />);
    const input = screen.getByRole('textbox', { name: '저장소 검색' });

    await user.type(input, 'backend');
    await user.keyboard('{Escape}');

    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenLastCalledWith('');
  });
});
