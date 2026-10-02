import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { API_BASE_URL } from '../data/docsContent';

export default function Introduction() {
  return (
    <article className="prose-docs">
      <h1>OneChatting Developer API</h1>
      <p>
        Integrate WhatsApp Business messaging into your applications using the OneChatting
        Developer API. Send and receive messages, manage conversations, and subscribe to
        real-time events over WebSocket.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
        <Link to="/authentication" className="docs-card">
          <div className="docs-card-title">Authentication</div>
          <div className="docs-card-desc">Developer tokens, headers, and access levels</div>
        </Link>
        <Link to="/messages/chat-list" className="docs-card">
          <div className="docs-card-title">Messages API</div>
          <div className="docs-card-desc">Chat list, history, send text, media, templates</div>
        </Link>
        <Link to="/templates/list" className="docs-card">
          <div className="docs-card-title">Templates API</div>
          <div className="docs-card-desc">List, create, edit, and send templates including AUTHENTICATION OTP</div>
        </Link>
        <Link to="/contacts/bulk-upsert" className="docs-card">
          <div className="docs-card-title">Contacts API</div>
          <div className="docs-card-desc">Bulk create or update contacts in the background</div>
        </Link>
        <Link to="/campaigns/create" className="docs-card">
          <div className="docs-card-title">Campaigns API</div>
          <div className="docs-card-desc">Create, list, schedule, and delete number-based campaigns</div>
        </Link>
        <Link to="/websocket" className="docs-card">
          <div className="docs-card-title">WebSocket Events</div>
          <div className="docs-card-desc">Real-time chat, status updates, assignments</div>
        </Link>
      </div>

      <h2>Base URL</h2>
      <p>All REST endpoints are relative to your OneChatting server URL:</p>
      <CodeBlock code={API_BASE_URL} language="text" title="Base URL" />

      <h2>Quick Start</h2>
      <p>
        Enable Developer Access in your OneChatting account, copy a token,
        and include it in the <code className="inline-code">token</code> header
        for every request.
      </p>

      <CodeBlock
        title="Example — Fetch chat list"
        language="bash"
        code={`curl -X GET "${API_BASE_URL}/developer/message/chat-list?page_no=1&limit=20" \\
  -H "token: YOUR_DEVELOPER_TOKEN"`}
      />

      <h2>Response Format</h2>
      <p>Successful responses return JSON with a <code className="inline-code">data</code> field when applicable. Errors return:</p>
      <CodeBlock
        code={`{
  "error": true,
  "message": "Human-readable error description"
}`}
      />

      <h2>Best Practices</h2>
      <ul>
        <li>Use WebSocket for real-time updates instead of polling chat history.</li>
        <li>Respect pagination limits (max 100 items per page).</li>
        <li>Store tokens securely — treat them like API keys.</li>
        <li>Use a User Token to read messages and connect via WebSocket; use a Project Token for template management (list, create, edit).</li>
        <li>Template and chat media are stored on B2 and served through the API proxy at <code className="inline-code">&#123;BASE_DOMAIN&#125;/proxy/...</code> (not direct Backblaze URLs).</li>
      </ul>
    </article>
  );
}
