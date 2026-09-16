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
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Student Engineering Project · Cloud & Systems</span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05] animate-fade-in-up">
              Cloud Storage <span className="text-gradient">Engineered with AI</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              A full-stack, cloud-native storage platform built from scratch with Spring Boot 3, PostgreSQL, MinIO (S3-compatible), and React to explore secure distributed file storage and AI workflows.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link to="/register">
                <Button variant="gradient" size="lg" rightIcon={ArrowRight} className="w-full sm:w-auto">Try Live Demo</Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">Explore Features</Button>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2 justify-center lg:justify-start text-xs text-slate-500 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">Java 21 · Spring Boot</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">PostgreSQL (Neon)</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">MinIO S3</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">Docker & React</span>
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
          <div className="ml-3 text-xs text-slate-400 font-mono">driveai.vercel.app/dashboard</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 p-4 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold">DriveAI Architecture</span>
            </div>
            <div className="mt-2.5 space-y-1.5 text-[11px] text-white/90">
              <div>✓ Spring Security + Stateless JWT</div>
              <div>✓ MinIO S3 Binary Stream Uploads</div>
              <div>✓ Soft-Delete & Trash Recovery</div>
              <div>✓ Live Stats Aggregation API</div>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Deployment</div>
              <div className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">Cloud Native</div>
            </div>
            <div className="text-[10px] text-slate-400">Neon + Render + Vercel</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {[
            { l: 'Auth', v: 'JWT', c: 'text-primary-600' },
            { l: 'Storage', v: 'MinIO', c: 'text-secondary-600' },
            { l: 'DB', v: 'Neon PG', c: 'text-emerald-600' },
            { l: 'Docs', v: 'Swagger', c: 'text-violet-600' },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 text-center">
              <div className={`text-sm font-bold ${s.c}`}>{s.v}</div>
              <div className="text-[10px] text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -top-6 -left-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float p-3 w-48 animate-float" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 grid place-items-center">
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800 dark:text-white">Live Storage Service</div>
            <div className="text-[10px] text-slate-400">MinIO S3 Buckets</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float p-3 w-48 animate-float" style={{ animationDelay: '2.5s' }}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary-50 dark:bg-primary-950/40 grid place-items-center">
            <Sparkles className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800 dark:text-white">AI Engine (Roadmap)</div>
            <div className="text-[10px] text-slate-400">Async PDF Summarization</div>
          </div>
        </div>
      </div>
    </div>
  );
}
