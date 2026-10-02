import CodeBlock from '../components/CodeBlock';
import { socketEvents } from '../data/docsContent';

export default function SocketEvents() {
  return (
    <article>
      <h1 className="docs-page-title">Socket Events</h1>
      <p className="docs-page-desc">
        Reference for WebSocket events you can listen to after authenticating your connection.
      </p>

      <div className="space-y-10">
        {socketEvents.map((event) => (
          <section key={event.name} className="border-b border-slate-200 dark:border-slate-800 pb-10 last:border-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <code className="text-lg font-mono font-semibold text-brand-700 dark:text-brand-400">{event.name}</code>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {event.direction}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-4">{event.description}</p>

            <CodeBlock code={event.payload} language="json" title="Payload" />

            {event.notes?.length > 0 && (
              <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                {event.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <section className="mt-12 p-6 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Example Listeners</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Register handlers for the events your integration needs:
        </p>
        <CodeBlock
          language="javascript"
          code={`socket.on("auth_status", (status) => { /* handle auth result */ });
socket.on("chat", (data) => { /* new or updated message */ });
socket.on("message_status", (data) => { /* delivery status update */ });
socket.on("chat_assigned", (data) => { /* assignment changed */ });
socket.on("total_unread_count", (data) => { /* unread count updated */ });
socket.on("case_status", (data) => { /* open case count updated */ });`}
        />
      </section>
    </article>
  );
}
