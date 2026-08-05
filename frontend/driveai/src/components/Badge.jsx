export default function Badge({ children, color = 'slate', size = 'md', dot = false }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
    violet: 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
    primary: 'bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300',
  };
  const dotColors = {
    slate: 'bg-slate-400', green: 'bg-emerald-500', blue: 'bg-blue-500',
    amber: 'bg-amber-500', rose: 'bg-rose-500', violet: 'bg-violet-500', primary: 'bg-primary-500',
  };
  const sizes = { sm: 'text-[11px] px-2 py-0.5', md: 'text-xs px-2.5 py-1' };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${colors[color]} ${sizes[size]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[color]}`} />}
      {children}
    </span>
  );
}
