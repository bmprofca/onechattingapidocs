import MethodBadge from './MethodBadge';
import { API_BASE_URL } from '../data/docsContent';

export default function EndpointHeader({ method, path, title }) {
  const fullUrl = `${API_BASE_URL}${path}`;

  return (
    <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <MethodBadge method={method} />
        <code className="text-sm font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md break-all">
          {path}
        </code>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-mono break-all">{fullUrl}</p>
    </div>
  );
}
