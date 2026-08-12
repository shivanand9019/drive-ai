export default function LoadingSkeleton({ count = 5, type = 'row' }) {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shimmer">
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3 h-6 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    );
  }
  if (type === 'card') {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shimmer">
        <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-2.5 w-1/3 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 shimmer">
          <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-2.5 w-1/4 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}
