import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

export default function ConfirmDialog({
  open, title = 'Are you sure?', message, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  danger = true, onConfirm, onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onCancel?.();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float p-6 animate-scale-in">
        <button onClick={onCancel} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
          <X className="h-4 w-4" />
        </button>
        <div className={`h-12 w-12 rounded-2xl grid place-items-center ${danger ? 'bg-rose-50 dark:bg-rose-950/40' : 'bg-amber-50 dark:bg-amber-950/40'}`}>
          <AlertTriangle className={`h-6 w-6 ${danger ? 'text-rose-600' : 'text-amber-600'}`} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
        {message && <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{message}</p>}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
