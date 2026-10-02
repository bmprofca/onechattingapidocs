import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { API_BASE_URL } from '../data/docsContent';

export default function WebSocketOverview() {
  return (
    <article className="prose-docs">
      <h1>WebSocket Overview</h1>
      <p>
        Connect via Socket.io to receive real-time updates: new messages, delivery status changes,
        unread counts, and chat assignment updates. Use WebSocket instead of polling the REST API
        for live data.
      </p>

      <h2>Connection</h2>
      <p>
        Connect to the same base URL as the REST API. After the connection is established, authenticate
        by emitting the <code className="inline-code">auth</code> event
        with your User Token.
      </p>

      <CodeBlock
        title="JavaScript — Socket.io client"
        language="javascript"
        code={`import { io } from "socket.io-client";

const socket = io("${API_BASE_URL}", {
  transports: ["polling"],
  reconnection: true,
  reconnectionAttempts: Infinity,
});

socket.on("connect", () => {
  socket.emit("auth", {
    token: "YOUR_USER_TOKEN",
    auth_type: "developer",
  });
});

socket.on("auth_status", (status) => {
  if (!status) {
    console.error("Authentication failed");
    socket.disconnect();
  }
});

socket.on("auth_profile", (profile) => {
  console.log("Connected", profile);
});`}
      />

      <div className="docs-info-box not-prose">
        <p className="docs-info-box-text">
          WebSocket connections require a <strong className="text-brand-800 dark:text-brand-300">User Token</strong>.
          Project Tokens are used for REST endpoints only.
        </p>
      </div>

      <h2>Connection Steps</h2>
      <ol className="list-decimal pl-5 space-y-2 mb-6">
        <li>Connect to the server using Socket.io.</li>
        <li>Emit <code className="inline-code">auth</code> with your User Token and <code className="inline-code">auth_type: "developer"</code>.</li>
        <li>Listen for <code className="inline-code">auth_status</code> — <code className="inline-code">true</code> means you are authenticated.</li>
        <li>Subscribe to events such as <code className="inline-code">chat</code> and <code className="inline-code">message_status</code>.</li>
      </ol>

      <p>
        See the full event reference with payload examples on the{' '}
        <Link to="/websocket/events">Socket Events</Link> page.
      </p>
    </article>
  );
}
