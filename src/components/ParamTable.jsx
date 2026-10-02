export default function ParamTable({ title, params }) {
  if (!params?.length) return null;

  return (
    <div className="my-6">
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">{title}</h3>
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Required</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950/50">
            {params.map((param) => (
              <tr key={param.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="px-4 py-3 font-mono text-brand-700 dark:text-brand-400">{param.name}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{param.type || '—'}</td>
                <td className="px-4 py-3">
                  {param.required ? (
                    <span className="text-red-600 dark:text-red-400 font-medium">Yes</span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{param.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
