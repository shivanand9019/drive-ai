import { UploadCloud, FileText, Sparkles } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = UploadCloud,
  title = 'Upload your first file',
  description = 'Drag & drop files here, or click the button below to get started with AI-powered storage.',
  actionLabel = 'Upload',
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in-up">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 dark:from-primary-900/40 dark:to-secondary-900/40 blur-2xl rounded-full" />
        <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-800 dark:to-slate-800 grid place-items-center shadow-soft">
          <Icon className="h-11 w-11 text-primary-500 dark:text-primary-400" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-xl bg-white dark:bg-slate-800 shadow-soft grid place-items-center animate-float">
          <FileText className="h-4 w-4 text-secondary-500" />
        </div>
        <div className="absolute -bottom-2 -left-3 h-7 w-7 rounded-xl bg-white dark:bg-slate-800 shadow-soft grid place-items-center animate-float" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="h-3.5 w-3.5 text-accent-500" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {actionLabel && (
        <div className="mt-6">
          <Button variant="gradient" leftIcon={UploadCloud} onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
