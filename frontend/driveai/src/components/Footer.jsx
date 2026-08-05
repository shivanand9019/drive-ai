import { Sparkles } from 'lucide-react';
import Logo from './Logo';

const COLUMNS = [
  { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
  { title: 'Resources', links: ['Documentation', 'API Reference', 'Help Center', 'Community', 'Status'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR', 'SOC 2'] },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              The AI-first cloud storage platform. Upload, organize, search and understand your files with intelligence built in.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-xs font-medium text-primary-700 dark:text-primary-300">
              <Sparkles className="h-3.5 w-3.5" /> AI-ready · Enterprise-grade
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{col.title}</h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">© 2026 DriveAI, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
