import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, UploadCloud, Sparkles, Star, Clock, Trash2, Settings,
} from 'lucide-react';
import Logo from './Logo';

const NAV = [
  { section: 'Main', items: [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'My Files', to: '/dashboard/files', icon: FolderOpen },
    { label: 'Upload', to: '/dashboard/upload', icon: UploadCloud },
    { label: 'AI Insights', to: '/dashboard/insights', icon: Sparkles },
  ]},
  { section: 'Library', items: [
    { label: 'Favorites', to: '/dashboard/favorites', icon: Star },
    { label: 'Recent', to: '/dashboard/recent', icon: Clock },
    { label: 'Trash', to: '/dashboard/trash', icon: Trash2 },
  ]},
  { section: 'Account', items: [
    { label: 'Settings', to: '/dashboard/settings', icon: Settings },
  ]},
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="h-full w-64 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="h-16 px-5 flex items-center border-b border-slate-200 dark:border-slate-800 shrink-0">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-6">
        {NAV.map((group) => (
          <div key={group.section}>
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {group.section}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 dark:from-primary-950/40 dark:to-secondary-950/30 dark:text-primary-300 shadow-soft'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                      <span>{item.label}</span>
                      {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-500" />}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 shrink-0">
        <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 p-4 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/15 blur-xl" />
          <p className="text-sm font-semibold relative">Upgrade to Team</p>
          <p className="text-xs text-white/80 mt-1 relative">Unlock 1 TB & collaborative AI.</p>
          <button className="mt-3 w-full bg-white/95 hover:bg-white text-primary-700 text-xs font-semibold py-2 rounded-lg transition-colors relative">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}
