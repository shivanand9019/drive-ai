import {
  Sparkles, TrendingUp, Activity, Clock, ShieldCheck, Zap, ScanText, FileText, Image as ImageIcon,
} from 'lucide-react';
import Badge from './Badge';

const METRICS = [
  { label: 'Documents Processed', value: '1,284', icon: Sparkles, accent: 'primary', delta: '+12%', sub: 'Last 30 days' },
  { label: 'Duplicates Found', value: '37', icon: TrendingUp, accent: 'rose', delta: '-8%', sub: 'Auto-detected' },
  { label: 'OCR Completed', value: '942', icon: ScanText, accent: 'secondary', delta: '+23%', sub: 'High accuracy' },
  { label: 'Images Classified', value: '3,571', icon: ImageIcon, accent: 'violet', delta: '+5%', sub: 'AI vision' },
  { label: 'Documents Summarized', value: '218', icon: FileText, accent: 'emerald', delta: '+18%', sub: 'GPT-style' },
  { label: 'Avg Processing Time', value: '1.4s', icon: Zap, accent: 'amber', delta: '-0.3s', sub: 'Per file' },
];

export default function AIInsightsCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
      <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 grid place-items-center shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">AI Insights</h3>
            <p className="text-xs text-slate-500">Real-time intelligence overview</p>
          </div>
        </div>
        <Badge color="green" dot>Healthy</Badge>
      </div>

      <div className="p-5 grid grid-cols-2 lg:grid-cols-3 gap-3">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="group rounded-xl border border-slate-100 dark:border-slate-800 p-4 hover:shadow-soft hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <m.icon className={`h-5 w-5 ${accentText(m.accent)}`} />
              <span className={`text-[11px] font-semibold ${m.delta.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'}`}>
                {m.delta}
              </span>
            </div>
            <p className="mt-3 text-xl font-bold text-slate-800 dark:text-white">{m.value}</p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{m.label}</p>
            <p className="mt-1 text-[11px] text-slate-400">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          Last AI scan: <span className="font-medium text-slate-700 dark:text-slate-300">2 min ago</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-xs font-medium text-emerald-600">AI Health: Operational</span>
        </div>
      </div>
    </div>
  );
}

function accentText(a) {
  return {
    primary: 'text-primary-600 dark:text-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-400',
    accent: 'text-accent-600 dark:text-accent-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    amber: 'text-amber-600 dark:text-amber-400',
    rose: 'text-rose-600 dark:text-rose-400',
    violet: 'text-violet-600 dark:text-violet-400',
  }[a] || 'text-primary-600';
}
