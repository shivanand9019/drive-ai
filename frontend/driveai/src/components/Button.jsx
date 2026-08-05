export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]';
  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-glow',
    secondary:
      'bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700',
    gradient:
      'bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-[length:200%_auto] hover:bg-[position:100%_50%] text-white shadow-glow hover:shadow-float',
    ghost:
      'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
    soft:
      'bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-950/50 dark:text-primary-300 dark:hover:bg-primary-900/40',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 shadow-soft',
    outline:
      'border border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-primary-800 dark:text-primary-300 dark:hover:bg-primary-950/40',
  };
  const sizes = {
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
    icon: 'p-2.5',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {!loading && LeftIcon && <LeftIcon className="h-4 w-4" />}
      {children}
      {!loading && RightIcon && <RightIcon className="h-4 w-4" />}
    </button>
  );
}
