import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { authService } from '@/services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Min 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

    const handleChange = (event) =>{
        const {name,value} =event.target;
        setForm((prev)=> ({
            ...prev,
            [name]:value
        }));


    };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
        const loginRequest ={
            email:form.email,
            password:form.password
        }

      await authService.login(loginRequest);
      navigate('/dashboard');

    } catch {
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="text-center">
        <Link to="/" className="inline-block"><Logo /></Link>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to your DriveAI account</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Field
          label="Email"
          icon={Mail}
          error={errors.email}
          inputProps={{
              name:"email",
            type: 'email',
            placeholder: 'you@company.com',
            value: form.email,
            onChange:handleChange
          }}
        />

        <div>
          <Field
            label="Password"
            icon={Lock}
            error={errors.password}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            }
            inputProps={{
                name:"password",
              type: showPassword ? 'text' : 'password',
              placeholder: '••••••••',
              value: form.password,
              onChange:handleChange
            }}
          />
          <div className="mt-3 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              <Checkbox checked={form.remember} onChange={(v) => setForm({ ...form, remember: v })} />
              Remember me
            </label>
            <a href="#" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">Forgot password?</a>
          </div>
        </div>

        <Button type="submit" variant="gradient" size="lg" loading={loading} rightIcon={ArrowRight} className="w-full">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <Divider />

      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={() => { /* TODO: authService.loginWithGoogle() */ authService.loginWithGoogle().then(() => navigate('/dashboard')); }}
        leftIcon={() => <GoogleIcon />}
      >
        Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Create one</Link>
      </p>
    </AuthShell>
  );
}

/* ---------- shared auth pieces (kept here to avoid duplication) ---------- */

export function AuthShell({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left visual panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-secondary-700 to-accent-700" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-secondary-300/20 blur-3xl animate-pulse-glow" />
        <div className="relative z-10 p-12 flex flex-col justify-between text-white">
          <Link to="/"><Logo light /></Link>
          <div>
            <h2 className="text-4xl font-bold leading-tight text-gradient-light">
              The intelligent home for all your files.
            </h2>
            <p className="mt-4 text-white/80 max-w-md">
              AI-powered search, OCR, duplicate detection and smart organization — built into a cloud storage experience your team will love.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[['1,284', 'Docs processed'], ['942', 'OCR runs'], ['99.9%', 'Uptime']].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/15">
                  <div className="text-2xl font-bold">{v}</div>
                  <div className="text-xs text-white/70 mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/60">© 2026 DriveAI, Inc.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-950 relative">
        <div className="lg:hidden absolute top-6 left-6"><Logo /></div>
        <div className="w-full max-w-md animate-fade-in-up">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, icon: Icon, error, trailing, inputProps }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <div className={`relative flex items-center rounded-xl border bg-white dark:bg-slate-900 transition-all ${
        error
          ? 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-500/30'
          : 'border-slate-200 dark:border-slate-700 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/30'
      }`}>
        {Icon && <Icon className="h-4.5 w-4.5 text-slate-400 ml-3.5 shrink-0" />}
        <input
          {...inputProps}
          className="flex-1 h-12 px-3.5 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
        />
        {trailing && <div className="pr-3.5">{trailing}</div>}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export function Checkbox({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
        checked ? 'bg-primary-600 border-primary-600' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600'
      }`}
      aria-pressed={checked}
    >
      {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
    </button>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
      <span className="text-xs text-slate-400">or</span>
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
