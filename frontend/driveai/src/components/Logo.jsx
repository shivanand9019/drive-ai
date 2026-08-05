import { Sparkles } from 'lucide-react';

export default function Logo({ compact = false, light = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 grid place-items-center shadow-glow">
          <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 opacity-20 blur-md -z-10" />
      </div>
      {!compact && (
        <span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          Drive<span className="text-gradient">AI</span>
        </span>
      )}
    </div>
  );
}
