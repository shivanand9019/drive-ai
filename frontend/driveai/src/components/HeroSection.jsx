import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, FileText, Image as ImageIcon, ShieldCheck, Zap } from 'lucide-react';
import Button from './Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 via-white to-white dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute inset-0 bg-grid dark:bg-grid-dark opacity-60" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-400/20 blur-3xl animate-pulse-glow" />
        <div className="absolute top-40 -left-24 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-soft backdrop-blur animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-primary-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">AI-first cloud storage, reimagined</span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05] animate-fade-in-up">
              AI-Powered <span className="text-gradient">Cloud Storage</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Upload, organize and intelligently manage your files with AI-powered search, analysis and secure cloud storage.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link to="/register">
                <Button variant="gradient" size="lg" rightIcon={ArrowRight} className="w-full sm:w-auto">Get Started</Button>
              </Link>
              <a href="#demo">
                <Button variant="secondary" size="lg" leftIcon={Play} className="w-full sm:w-auto">Live Demo</Button>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-slate-500 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> SOC 2 Type II</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber-500" /> 99.9% Uptime</div>
            </div>
          </div>

          {/* Right: dashboard illustration */}
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '300ms' }}>
            <DashboardIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardIllustration() {
  return (
    <div className="relative">
      {/* Main card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float p-5 animate-float-slow">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-rose-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
          <div className="ml-3 text-xs text-slate-400">driveai.app/dashboard</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 p-4 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">AI Summary</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2 w-full rounded bg-white/30" />
              <div className="h-2 w-4/5 rounded bg-white/30" />
              <div className="h-2 w-3/5 rounded bg-white/30" />
            </div>
          </div>
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
            <div className="text-xs text-slate-500">Storage</div>
            <div className="mt-2 h-16 rounded-xl bg-gradient-to-t from-primary-500 to-secondary-500" />
            <div className="mt-2 text-xs text-slate-500">68.4 / 100 GB</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {[
            { l: 'Docs', v: '1,284', c: 'text-primary-600' },
            { l: 'OCR', v: '942', c: 'text-secondary-600' },
            { l: 'Dupes', v: '37', c: 'text-rose-600' },
            { l: 'Images', v: '3.5k', c: 'text-violet-600' },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
              <div className={`text-base font-bold ${s.c}`}>{s.v}</div>
              <div className="text-[11px] text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -top-6 -left-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float p-3 w-44 animate-float" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 grid place-items-center">
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800 dark:text-white">OCR Complete</div>
            <div className="text-[10px] text-slate-400">Invoice_Q3.pdf</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float p-3 w-48 animate-float" style={{ animationDelay: '2.5s' }}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-violet-50 dark:bg-violet-950/40 grid place-items-center">
            <ImageIcon className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800 dark:text-white">Image Classified</div>
            <div className="text-[10px] text-slate-400">"Team meeting" · 12 tags</div>
          </div>
        </div>
      </div>
    </div>
  );
}
