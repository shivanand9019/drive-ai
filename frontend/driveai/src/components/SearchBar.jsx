import { Search, Command } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search files, documents, content…', className = '' }) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-11 pr-16 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all shadow-soft dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
        <Command className="h-3 w-3" /> K
      </kbd>
    </div>
  );
}
