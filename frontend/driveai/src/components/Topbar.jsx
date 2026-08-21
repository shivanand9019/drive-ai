import { Bell, Menu, Moon, Sun, Search } from 'lucide-react';
import Logo from './Logo';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import { useTheme } from '@/context/ThemeContext';

export default function Topbar({ user, query, setQuery, onToggleSidebar, onLogout }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 shrink-0 sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="h-full px-4 sm:px-6 flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="lg:hidden">
          <Logo compact />
        </div>

        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="flex-1 md:hidden" />

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="md:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
