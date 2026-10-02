import CodeBlock from '../components/CodeBlock';
import { authTypes } from '../data/docsContent';

export default function Authentication() {
  return (
    <article className="prose-docs">
      <h1>Authentication</h1>
      <p>
        All API requests require a developer token in the
        <code className="inline-code mx-1">token</code>
        HTTP header. Tokens are created and managed from the Developer Access section in your OneChatting account.
      </p>

      <CodeBlock
        title="Request header"
        language="http"
        code={`token: YOUR_DEVELOPER_TOKEN`}
      />

      <h2>Token Types</h2>
      <p>OneChatting provides two token types. Use the one that matches the endpoint you are calling:</p>

      <div className="space-y-4 not-prose my-6">
        {Object.entries(authTypes).map(([key, auth]) => (
          <div key={key} className="docs-panel">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">{auth.label}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{auth.description}</p>
          </div>
        ))}
      </div>

      <h2>Getting Your Token</h2>
      <ol className="list-decimal pl-5 space-y-2 mb-6">
        <li>Sign in to OneChatting and select your project.</li>
        <li>Open <strong>Management → Developer Access</strong>.</li>
        <li>Enable Developer Access if it is not already on.</li>
        <li>Copy the <strong>Project Token</strong> or a <strong>User Token</strong> as needed.</li>
      </ol>

      <h2>Error Responses</h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 not-prose my-4">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">HTTP Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950/50">
            <tr>
              <td className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">401</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Missing or invalid token</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">403</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Developer access is not enabled or the token cannot access this endpoint</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">400</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Invalid or missing request parameters</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">404</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Resource not found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>WebSocket Authentication</h2>
      <p>
        After connecting via Socket.io, send an <code className="inline-code">auth</code> event
        with your User Token. See the WebSocket section for details.
      </p>
      <CodeBlock
        code={`socket.emit("auth", {
  token: "YOUR_USER_TOKEN",
  auth_type: "developer"
});`}
        language="javascript"
      />

      <h2>Developer Access Management</h2>
      <p>
        Endpoints under <strong>Developer Access</strong> in this documentation are used from the OneChatting dashboard
        by project owners. They use <strong>session authentication</strong> (<code className="inline-code">token</code> and{' '}
        <code className="inline-code">username</code> headers from login) and require{' '}
        <code className="inline-code">project_id</code> in the JSON request body — not in headers.
      </p>
    </article>
  );
}
