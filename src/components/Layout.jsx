import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../data/docsContent';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children, onMenuToggle }) {
  return (
    <div className="min-h-screen lg:pl-72">
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 gap-4">
          <button
            type="button"
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:block text-sm text-slate-500 dark:text-slate-400 min-w-0">
            Base URL:{' '}
            <code className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {API_BASE_URL}
            </code>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Link
              to="/"
              className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
            >
              Documentation
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
        {children}
      </main>
    </div>
  );
}
