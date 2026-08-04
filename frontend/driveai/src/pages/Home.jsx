import {
  Sparkles, Search, ScanText, Copy, ShieldCheck, Zap, Upload, BrainCircuit,
  FileSearch, FolderTree, BarChart3,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: BrainCircuit, title: 'AI File Analysis', description: 'Automatic summaries, sentiment, entities and key insights extracted from every document you upload.', accent: 'primary' },
  { icon: Search, title: 'Smart Search', description: 'Search by meaning, not keywords. Ask questions in plain English and find exactly what you need.', accent: 'secondary' },
  { icon: ScanText, title: 'OCR Document Reading', description: 'Turn scanned PDFs and images into searchable, selectable text with 99%+ accuracy.', accent: 'accent' },
  { icon: Copy, title: 'Duplicate File Detection', description: 'AI finds duplicate and near-duplicate files — even if they were renamed or resized.', accent: 'rose' },
  { icon: ShieldCheck, title: 'Secure Cloud Storage', description: 'End-to-end encryption, SOC 2 compliance, and granular access controls keep data safe.', accent: 'emerald' },
  { icon: Zap, title: 'Lightning Fast Uploads', description: 'Chunked, parallel uploads with resumable transfers make large files effortless.', accent: 'amber' },
];

const WORKFLOW = [
  { icon: Upload, title: 'Upload', desc: 'Drag & drop any file', accent: 'primary' },
  { icon: BrainCircuit, title: 'AI Processing', desc: 'Neural analysis begins', accent: 'secondary' },
  { icon: ScanText, title: 'OCR', desc: 'Extract text from images', accent: 'accent' },
  { icon: FileSearch, title: 'Metadata Extraction', desc: 'Tags, entities, topics', accent: 'violet' },
  { icon: FolderTree, title: 'Smart Organization', desc: 'Auto-categorize & tag', accent: 'emerald' },
  { icon: Search, title: 'Search Ready', desc: 'Ask anything, find instantly', accent: 'amber' },
];

const WHY = [
  { icon: ShieldCheck, title: '99.9% Secure', desc: 'SOC 2 Type II, end-to-end encryption.', accent: 'emerald' },
  { icon: Sparkles, title: 'AI Powered', desc: 'GPT-grade intelligence in every file.', accent: 'primary' },
  { icon: Zap, title: 'Fast', desc: 'Sub-second search across millions.', accent: 'amber' },
  { icon: BarChart3, title: 'Scalable', desc: 'From 1 GB to 1 TB and beyond.', accent: 'secondary' },
  { icon: BrainCircuit, title: 'Open Architecture', desc: 'REST API, webhooks, integrations.', accent: 'violet' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <HeroSection />

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-xs font-semibold text-primary-700 dark:text-primary-300">
              <Sparkles className="h-3.5 w-3.5" /> Features
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Everything you need, <span className="text-gradient">supercharged by AI</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              DriveAI combines the familiarity of cloud storage with the intelligence of modern AI — so your files work for you.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Workflow timeline */}
      <section id="demo" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950/40 text-xs font-semibold text-secondary-700 dark:text-secondary-300">
              <BrainCircuit className="h-3.5 w-3.5" /> AI Workflow
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              From upload to <span className="text-gradient">insight</span> in seconds
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Every file is automatically processed through our intelligent pipeline.
            </p>
          </div>

          <div className="mt-16 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-3">
              {WORKFLOW.map((step, i) => (
                <div key={step.title} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${accentBg(step.accent)} grid place-items-center shadow-glow`}>
                      <step.icon className="h-6 w-6 text-white" />
                      <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 grid place-items-center">
                        {i + 1}
                      </span>
                    </div>
                    <h4 className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">{step.title}</h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why DriveAI */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-950/40 text-xs font-semibold text-accent-700 dark:text-accent-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Why DriveAI
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Built for the way <span className="text-gradient">modern teams work</span>
            </h2>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WHY.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br ${accentBg(item.accent)} grid place-items-center shadow-glow`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-float">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight relative">Start free. Upgrade when you need more.</h2>
            <p className="mt-4 text-white/90 max-w-xl mx-auto relative">
              10 GB free forever. Pro plans start at $9/month with 1 TB storage and unlimited AI processing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center relative">
              <Link to="/register"><Button variant="secondary" size="lg" className="w-full sm:w-auto">Get Started Free</Button></Link>
              <Link to="/login"><Button variant="ghost" size="lg" className="w-full sm:w-auto text-white hover:bg-white/10">Sign in</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function accentBg(a) {
  return {
    primary: 'from-primary-500 to-primary-700',
    secondary: 'from-secondary-500 to-secondary-700',
    accent: 'from-accent-500 to-accent-700',
    emerald: 'from-emerald-500 to-emerald-700',
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-500 to-red-500',
    violet: 'from-violet-500 to-fuchsia-600',
  }[a] || 'from-primary-500 to-primary-700';
}
