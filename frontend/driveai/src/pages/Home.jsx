import { useState } from 'react';
import {
  Sparkles, Search, ScanText, Copy, ShieldCheck, Zap, Upload, BrainCircuit,
  FileSearch, FolderTree, Database, Server, HardDrive, Code2, Globe, Github,
  Mail, Send, CheckCircle2, ArrowRight, Check, ExternalLink, HelpCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Link } from 'react-router-dom';

// Features implemented vs roadmap
const BUILT_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Stateless JWT Authentication',
    description: 'Custom Spring Security filter chain with BCrypt password hashing, sessionless architecture, and protected REST routes.',
    accent: 'emerald',
    status: 'Live',
  },
  {
    icon: HardDrive,
    title: 'S3 Object Storage (MinIO)',
    description: 'Binary stream uploads and downloads with isolated user storage keys, bucket auto-provisioning, and MIME-type validation.',
    accent: 'primary',
    status: 'Live',
  },
  {
    icon: FolderTree,
    title: 'Full Lifecycle & Trash Bin',
    description: 'Soft-deletion pattern with deletedAt timestamps, trash bin inspection, file restoration, and permanent purge capability.',
    accent: 'violet',
    status: 'Live',
  },
  {
    icon: Send,
    title: 'Granular File Sharing',
    description: 'Share documents securely with any registered user email. Validates ownership and manages cross-user access.',
    accent: 'secondary',
    status: 'Live',
  },
  {
    icon: Search,
    title: 'Instant Search & Favorites',
    description: 'Real-time substring search across uploaded file names, quick favorite toggling, and paginated sorting.',
    accent: 'amber',
    status: 'Live',
  },
  {
    icon: Server,
    title: 'Live Metrics Aggregation',
    description: 'Dynamic JPA aggregation queries calculating total documents, monthly uploads, and system counts in real time.',
    accent: 'primary',
    status: 'Live',
  },
];

const ROADMAP_FEATURES = [
  {
    icon: BrainCircuit,
    title: 'Gemini AI Document Summaries',
    description: 'Asynchronous background pipeline with Apache PDFBox text extraction and Google Gemini LLM for structured insights.',
    accent: 'secondary',
    status: 'Roadmap',
  },
  {
    icon: Copy,
    title: 'SHA-256 Deduplication',
    description: 'Content-addressable hashing during upload to detect identical files and conserve S3 storage.',
    accent: 'rose',
    status: 'Roadmap',
  },
  {
    icon: ScanText,
    title: 'OCR Text Recognition',
    description: 'Optical Character Recognition to extract searchable text from scanned PDFs, receipts, and images.',
    accent: 'accent',
    status: 'Roadmap',
  },
  {
    icon: FileSearch,
    title: 'Natural Language Semantic Search',
    description: 'Vector embeddings with pgvector to search across document contents using plain English queries.',
    accent: 'emerald',
    status: 'Roadmap',
  },
];

// Architecture Pipeline
const ARCHITECTURE_STEPS = [
  { step: '1', title: 'React 19 Client', desc: 'Vite SPA with Axios interceptors & JWT storage', icon: Globe, accent: 'primary' },
  { step: '2', title: 'Spring Boot Gateway', desc: 'REST controllers, JWT filter, Swagger OpenAPI', icon: Server, accent: 'secondary' },
  { step: '3', title: 'PostgreSQL on Neon', desc: 'Serverless DB storing metadata, users & shares', icon: Database, accent: 'emerald' },
  { step: '4', title: 'MinIO S3 Buckets', desc: 'Object storage hosting binary document streams', icon: HardDrive, accent: 'violet' },
  { step: '5', title: 'Async Worker (AI)', desc: 'Background queue for PDFBox text parsing & LLM', icon: BrainCircuit, accent: 'amber' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const displayedFeatures =
    activeTab === 'live'
      ? BUILT_FEATURES
      : activeTab === 'roadmap'
      ? ROADMAP_FEATURES
      : [...BUILT_FEATURES, ...ROADMAP_FEATURES];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-xs font-semibold text-primary-700 dark:text-primary-300">
              <Code2 className="h-3.5 w-3.5" /> Project Capabilities
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Engineered Features & <span className="text-gradient">Upcoming Roadmap</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              An authentic overview of what is fully implemented and running today, alongside the architectural improvements currently in progress.
            </p>

            {/* Feature Filter Tabs */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Features ({BUILT_FEATURES.length + ROADMAP_FEATURES.length})
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'live'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live Now ({BUILT_FEATURES.length})
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'roadmap'
                    ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Roadmap ({ROADMAP_FEATURES.length})
              </button>
            </div>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedFeatures.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} status={f.status} />
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section id="demo" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950/40 text-xs font-semibold text-secondary-700 dark:text-secondary-300">
              <Server className="h-3.5 w-3.5" /> System Architecture
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              How the Data <span className="text-gradient">Flows End-to-End</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              From client request to binary streaming and persistent database metadata.
            </p>
          </div>

          <div className="mt-16 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {ARCHITECTURE_STEPS.map((step, i) => (
                <div key={step.title} className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-soft hover:shadow-card transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${accentBg(step.accent)} grid place-items-center shadow-glow text-white`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{step.step}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{step.title}</h4>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About The Project */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-950/40 text-xs font-semibold text-accent-700 dark:text-accent-300">
                <Code2 className="h-3.5 w-3.5" /> Developer Story
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                About The <span className="text-gradient">DriveAI Project</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  DriveAI is a hands-on software engineering project developed to master cloud-native backend systems, distributed S3 storage interfaces, relational database schema design, and secure authentication flows.
                </p>
                <p>
                  Instead of relying on turnkey services (like Firebase or Supabase), every layer was purposefully engineered from scratch:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong>Backend Architecture:</strong> Java 21 with Spring Boot 3, Spring Data JPA, Hibernate ORM, and custom JWT authentication filters.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong>Object Storage:</strong> MinIO S3-compatible API for streaming binary data with isolated user buckets and keys.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong>Database Design:</strong> PostgreSQL hosted on Neon Serverless with UUID primary keys and soft-deletion tracking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                    <span><strong>API Documentation:</strong> Self-documenting interactive Swagger UI (`springdoc-openapi`) with JWT Bearer authorization.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tech Stack Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5">
                <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-950/50 text-primary-600 grid place-items-center mb-3">
                  <Server className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Backend Layer</h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Java 21, Spring Boot 3, Spring Security, Maven</p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 grid place-items-center mb-3">
                  <Database className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Database</h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">PostgreSQL (Neon Serverless), JPA Repositories</p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5">
                <div className="h-8 w-8 rounded-lg bg-violet-100 dark:bg-violet-950/50 text-violet-600 grid place-items-center mb-3">
                  <HardDrive className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Object Storage</h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">MinIO S3 Client, Apache PDFBox text extraction</p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5">
                <div className="h-8 w-8 rounded-lg bg-secondary-100 dark:bg-secondary-950/50 text-secondary-600 grid place-items-center mb-3">
                  <Globe className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Frontend & Cloud</h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">React 19, Vite, Tailwind CSS, Vercel & Render</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Open Source Transparency Section */}
      <section id="pricing" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Free & Open Source
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hosting & Deployment <span className="text-gradient">Transparency</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              This is a student portfolio project—no enterprise fees or paywalls. Explore the live web demo or run it locally on your own machine.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Tier 1: Web Demo */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-primary-500/30 p-6 shadow-soft hover:shadow-card transition flex flex-col justify-between">
              <div>
                <Badge color="primary" size="sm">Live Web Demo</Badge>
                <div className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">$0</div>
                <p className="text-xs text-slate-500 mt-1">Hosted on Vercel + Render + Neon</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Free user registration & login
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Up to 25MB per file upload
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Full file management & sharing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Real-time dashboard metrics
                  </li>
                </ul>
              </div>
              <Link to="/register" className="mt-6">
                <Button variant="gradient" className="w-full">Create Account</Button>
              </Link>
            </div>

            {/* Tier 2: Self Host */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft hover:shadow-card transition flex flex-col justify-between">
              <div>
                <Badge color="green" size="sm">Self-Hosted</Badge>
                <div className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Docker</div>
                <p className="text-xs text-slate-500 mt-1">Run locally on your computer</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> `docker-compose.yml` included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Local PostgreSQL & MinIO
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Unlimited local disk storage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> 1-command startup setup
                  </li>
                </ul>
              </div>
              <a href="#about" className="mt-6">
                <Button variant="secondary" className="w-full">Read Architecture</Button>
              </a>
            </div>

            {/* Tier 3: Open Source */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft hover:shadow-card transition flex flex-col justify-between">
              <div>
                <Badge color="violet" size="sm">Open Source</Badge>
                <div className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">MIT</div>
                <p className="text-xs text-slate-500 mt-1">Inspect the code & APIs</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Complete source on GitHub
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Swagger OpenAPI spec included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Layered clean code design
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Open for reviews & PRs
                  </li>
                </ul>
              </div>
              <a href="#contact" className="mt-6">
                <Button variant="ghost" className="w-full border border-slate-200 dark:border-slate-700">Contact Developer</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Feedback Section */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-xs font-semibold text-primary-700 dark:text-primary-300">
              <Mail className="h-3.5 w-3.5" /> Feedback & Connect
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Connect with the <span className="text-gradient">Developer</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Have architectural suggestions, feedback on the code, or interested in hiring a passionate junior software engineer? Reach out directly!
            </p>
          </div>

          <div className="mt-12 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-soft">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Alex"
                    className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Message / Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Share your thoughts on the project, bug reports, or collaboration opportunities..."
                  className="w-full p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button type="submit" variant="gradient" rightIcon={Send}>
                  Send Feedback
                </Button>
                {contactSubmitted && (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-fade-in flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Thank you! Feedback recorded locally.
                  </span>
                )}
              </div>
            </form>
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
