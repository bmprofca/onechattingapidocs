import { useState } from 'react';

export default function CodeBlock({ code, language = 'json', title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-900 overflow-hidden my-4 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {title || language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-medium text-slate-300 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-slate-100 whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
