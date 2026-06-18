'use client';

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
  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={onCancel}
      className="z-modal fixed inset-0 flex items-center justify-center bg-black/40"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
      >
        <h2 className="text-label-lg text-gray-900">{title}</h2>
        {description && (
          <p className="text-body-md mt-2 whitespace-pre-line text-gray-600">{description}</p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={isConfirming}
            className="text-label-md rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <Button variant="danger" onClick={onConfirm} disabled={isConfirming} className="px-4!">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
