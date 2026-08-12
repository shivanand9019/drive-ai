import { HardDrive, FileStack, Clock } from 'lucide-react';

export default function StorageCard({ used = 0, limit = 100, filesCount = 0 }) {
  const pct = Math.min((used / limit) * 100, 100);
  const remaining = Math.max(limit - used, 0);
  const tone = pct > 90 ? 'rose' : pct > 70 ? 'amber' : 'primary';

  const barClass = {
    primary: 'from-primary-500 to-secondary-500',
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-500 to-red-500',
  }[tone];

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 grid place-items-center">
            <HardDrive className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Storage</h3>
            <p className="text-xs text-slate-500">DriveAI Cloud</p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-400">{pct.toFixed(0)}%</span>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800 dark:text-white">{used.toFixed(1)}</span>
          <span className="text-sm text-slate-400">/ {limit} GB</span>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${barClass} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <FileStack className="h-4 w-4" />
            <span className="text-xs">Files</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-white">{filesCount.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Remaining</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-white">{remaining.toFixed(1)} GB</p>
        </div>
      </div>
    </div>
  );
}
