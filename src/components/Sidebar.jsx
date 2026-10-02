import { NavLink } from 'react-router-dom';
import { navSections } from '../data/docsContent';
import ThemeToggle from './ThemeToggle';

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/50 dark:bg-black/60 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col transform transition-transform duration-200 lg:translate-x-0 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                OC
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white text-sm">OneChatting</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Developer API</div>
              </div>
            </div>
            <div className="lg:hidden shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                {section.title}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-brand-50 dark:bg-brand-600/20 text-brand-700 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500">
          v1.0 · REST + WebSocket
        </div>
      </aside>
    </>
  );
}
