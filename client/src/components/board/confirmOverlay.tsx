'use client';

import { JSX } from 'react/jsx-dev-runtime';

interface IConfirmOverlayProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmOverlay({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: IConfirmOverlayProps): JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        className="flex w-80 flex-col gap-4 rounded-xl border border-gray-700 bg-gray-900 p-6 text-white shadow-2xl"
        onSubmit={(event) => {
          event.preventDefault();
          onConfirm();
        }}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-300">{message}</p>
        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            {confirmLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmOverlay;
