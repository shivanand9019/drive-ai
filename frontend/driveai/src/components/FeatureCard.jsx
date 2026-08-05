export default function FeatureCard({ icon: Icon, title, description, accent = 'primary', index = 0 }) {
  const accents = {
    primary: 'from-primary-500 to-primary-700',
    secondary: 'from-secondary-500 to-secondary-700',
    accent: 'from-accent-500 to-accent-700',
    emerald: 'from-emerald-500 to-emerald-700',
    amber: 'from-amber-500 to-orange-500',
    violet: 'from-violet-500 to-fuchsia-600',
  };
  return (
    <div
      className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${accents[accent]} opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${accents[accent]} grid place-items-center shadow-glow group-hover:scale-110 transition-transform`}>
        {Icon && <Icon className="h-6 w-6 text-white" strokeWidth={2} />}
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-800 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
        Learn more →
      </div>
    </div>
  );
}
