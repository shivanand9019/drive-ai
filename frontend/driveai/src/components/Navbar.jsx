import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { useTheme } from '@/context/ThemeContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const linkClass = (label) =>
    `text-sm font-medium transition-colors ${
      label === 'Home' && isHome
        ? 'text-primary-600 dark:text-primary-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-soft'
          : isHome
          ? 'bg-transparent'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" aria-label="DriveAI home">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={linkClass(l.label)}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/login">
            <Button variant="ghost" size="md">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="gradient" size="md" rightIcon={ChevronDown}>Get Started</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 glass ${
          mobileOpen ? 'max-h-96 border-t border-slate-200/60 dark:border-slate-800/60' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-3 mt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <button
              onClick={toggleTheme}
              className="flex-1 inline-flex items-center justify-center gap-2 p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <Link to="/login" className="flex-1">
              <Button variant="secondary" className="w-full">Login</Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button variant="gradient" className="w-full">Start</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
