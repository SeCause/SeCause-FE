import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import ConfirmDialog from './ConfirmDialog';

function DialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        다이얼로그 열기
      </button>
      <ConfirmDialog
        open={open}
        title="삭제 확인"
        description="삭제한 데이터는 복구할 수 없습니다."
        onConfirm={() => {}}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

describe('ConfirmDialog', () => {
  it('열릴 때 내부로 포커스를 이동하고 닫힐 때 기존 포커스를 복원한다', () => {
    render(<DialogExample />);
    const trigger = screen.getByRole('button', { name: '다이얼로그 열기' });
    trigger.focus();

    fireEvent.click(trigger);
    expect(screen.getByRole('button', { name: '취소' })).toHaveFocus();

    fireEvent.click(screen.getByRole('button', { name: '취소' }));
    expect(trigger).toHaveFocus();
  });

  it('제목과 설명을 접근 가능한 이름과 설명으로 연결한다', () => {
    render(<DialogExample />);
    fireEvent.click(screen.getByRole('button', { name: '다이얼로그 열기' }));

    expect(screen.getByRole('alertdialog', { name: '삭제 확인' })).toHaveAccessibleDescription(
      '삭제한 데이터는 복구할 수 없습니다.',
    );
  });

  it('Tab 키 포커스를 다이얼로그 내부에 유지한다', () => {
    render(<DialogExample />);
    fireEvent.click(screen.getByRole('button', { name: '다이얼로그 열기' }));
    const cancelButton = screen.getByRole('button', { name: '취소' });
    const confirmButton = screen.getByRole('button', { name: '확인' });

    confirmButton.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(cancelButton).toHaveFocus();

    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(confirmButton).toHaveFocus();
  });

  it('표시 중에는 배경 스크롤을 막고 닫히면 복원한다', () => {
    render(<DialogExample />);
    fireEvent.click(screen.getByRole('button', { name: '다이얼로그 열기' }));
    expect(document.body).toHaveStyle({ overflow: 'hidden' });

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
