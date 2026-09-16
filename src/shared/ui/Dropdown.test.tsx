import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Dropdown from './Dropdown';

const options = [
  { value: 'first', label: '첫 번째' },
  { value: 'second', label: '두 번째' },
  { value: 'third', label: '세 번째' },
];

describe('Dropdown', () => {
  it('방향키로 열고 옵션 사이를 이동한다', () => {
    render(<Dropdown options={options} value="second" onChange={() => {}} />);
    const trigger = screen.getByRole('button', { name: '두 번째' });

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: '두 번째' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: '세 번째' })).toHaveFocus();
  });

  it('Enter 키로 포커스된 옵션을 선택한다', () => {
    const onChange = vi.fn();
    render(<Dropdown options={options} value="first" onChange={onChange} />);
    const trigger = screen.getByRole('button', { name: '첫 번째' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

    fireEvent.keyDown(screen.getByRole('option', { name: '두 번째' }), { key: 'Enter' });
    fireEvent.click(screen.getByRole('option', { name: '두 번째' }));

    expect(onChange).toHaveBeenCalledWith('second');
    expect(trigger).toHaveFocus();
  });

  it('Escape 키로 목록을 닫고 트리거로 포커스를 되돌린다', () => {
    render(<Dropdown options={options} value={null} onChange={() => {}} />);
    const trigger = screen.getByRole('button', { name: '선택해주세요' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
