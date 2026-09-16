import { Code2, Heart } from 'lucide-react';
import Logo from './Logo';

const COLUMNS = [
  {
    title: 'Project',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Live Demo', href: '/register' },
      { label: 'System Architecture', href: '/#demo' },
      { label: 'Roadmap', href: '/#features' },
    ],
  },
  {
    title: 'Tech Stack',
    links: [
      { label: 'Java 21 & Spring Boot 3', href: '/#about' },
      { label: 'PostgreSQL (Neon)', href: '/#about' },
      { label: 'MinIO S3 Storage', href: '/#about' },
      { label: 'React 19 & Tailwind', href: '/#about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'About The Project', href: '/#about' },
      { label: 'Deployment Transparency', href: '/#pricing' },
      { label: 'Swagger OpenAPI Docs', href: 'http://localhost:8080/api/v1/swagger-ui/index.html' },
      { label: 'Developer Contact', href: '/#contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              DriveAI is an open-source student software engineering project exploring distributed S3 object storage, Spring Boot REST microservices, and AI document intelligence.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              <Code2 className="h-3.5 w-3.5 text-primary-600" /> Student Portfolio · MIT Licensed
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{col.title}</h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © 2026 DriveAI. An open-source full-stack engineering portfolio project.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Engineered with care and curiosity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
