import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { AuthShell, Field, Checkbox, Divider } from './Login';
import { authService } from '@/services/authService';

function strengthOf(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['bg-slate-200', 'bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '', terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverErrors,setServerErrors] = useState({});

  const strength = strengthOf(form.password);

  const validate = () => {
    const e = {};
    if (!form.fullName) e.fullName = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Min 8 characters';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    if (!form.terms) e.terms = 'You must accept the terms';
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
        const registerRequest = {
            fullName:form.fullName,
            email:form.email,
            password:form.password
        }
      await authService.register(registerRequest);
        navigate("/login", {
            state: {
                message: "Registration successful. Please sign in."
            }
        });
    } catch (error){
      setServerErrors( error.response?.data?.message ??"Registration Failed" );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="text-center">
        <Link to="/" className="inline-block"><Logo /></Link>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Start using AI-powered cloud storage today</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Field
          label="Full Name"
          icon={User}
          error={errors.name}
          inputProps={{
              name:"fullName",
            placeholder: 'Alex Morgan',
            value: form.fullName,
            onChange:handleChange
          }}
        />
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
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
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
          {form.password && (
            <div className="mt-2.5">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength ? STRENGTH_COLORS[strength] : 'bg-slate-200 dark:bg-slate-800'}`}
                  />
                ))}
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Password strength: <span className="font-medium text-slate-700 dark:text-slate-300">{STRENGTH_LABELS[strength]}</span>
              </p>
            </div>
          )}
        </div>

        <Field
          label="Confirm Password"
          icon={Lock}
          error={errors.confirm}
          inputProps={{
              name:"confirm",
            type:showPassword ? 'text' : 'password',
            placeholder: '••••••••',
            value: form.confirm,
            onChange: handleChange
          }}
        />

        <div>
          <label className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <Checkbox checked={form.terms} onChange={(v) => setForm({ ...form, terms: v })} />
            <span>I agree to the <a href="#" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Terms</a> and <a href="#" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Privacy Policy</a>.</span>
          </label>
          {errors.terms && <p className="mt-1.5 text-xs text-rose-600">{errors.terms}</p>}
        </div>

        <Button type="submit" variant="gradient" size="lg" loading={loading} rightIcon={ArrowRight} className="w-full">
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
