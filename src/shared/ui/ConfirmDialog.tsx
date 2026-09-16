'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '@/shared/ui/Button';

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  isConfirming = false,
  onConfirm,
  onCancel,
}: Props) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isConfirming) {
        onCancel();
      }

      if (e.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, isConfirming, onCancel]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cancelButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      role="presentation"
      onClick={isConfirming ? undefined : onCancel}
      className="z-modal fixed inset-0 flex items-center justify-center bg-black/40"
    >
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
      >
        <h2 id={titleId} className="text-label-lg text-gray-900">
          {title}
        </h2>
        {description && (
          <p id={descriptionId} className="text-body-md mt-2 whitespace-pre-line text-gray-700">
            {description}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            disabled={isConfirming}
            className="text-label-md rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={isConfirming}
            className="px-4!"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
