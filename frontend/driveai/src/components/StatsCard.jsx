export default function StatsCard({
  label, value, icon: Icon, accent = 'primary', trend, sublabel,
}) {
  const accents = {
    primary: 'from-primary-500 to-primary-700 text-primary-600 bg-primary-50 dark:bg-primary-950/40',
    secondary: 'from-secondary-500 to-secondary-700 text-secondary-600 bg-secondary-50 dark:bg-secondary-950/40',
    accent: 'from-accent-500 to-accent-700 text-accent-600 bg-accent-50 dark:bg-accent-950/40',
    emerald: 'from-emerald-500 to-emerald-700 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40',
    amber: 'from-amber-500 to-amber-700 text-amber-600 bg-amber-50 dark:bg-amber-950/40',
    rose: 'from-rose-500 to-rose-700 text-rose-600 bg-rose-50 dark:bg-rose-950/40',
    violet: 'from-violet-500 to-violet-700 text-violet-600 bg-violet-50 dark:bg-violet-950/40',
  };
  const a = accents[accent] || accents.primary;
  const [grad, iconColor, iconBg] = a.split(' ').reduce(
    (acc, cls) => {
      if (cls.startsWith('from-') || cls.startsWith('to-')) acc[0].push(cls);
      else if (cls.startsWith('text-')) acc[1] = cls;
      else acc[2] = cls;
      return acc;
    },
    [[], '', '']
  );

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className={`h-11 w-11 rounded-xl grid place-items-center ${iconBg} ${iconColor}`}>
          {Icon && <Icon className="h-5.5 w-5.5" strokeWidth={2} />}
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.up ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'}`}>
            {trend.up ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
      {sublabel && <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{sublabel}</p>}
      <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${grad.join(' ')} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
    </div>
  );
}
