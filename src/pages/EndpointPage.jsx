import EndpointHeader from '../components/EndpointHeader';
import ParamTable from '../components/ParamTable';
import CodeBlock from '../components/CodeBlock';
import { endpoints, authTypes, API_BASE_URL } from '../data/docsContent';

const defaultSendResponse = `{
  "wamid": "wamid.HBgM...",
  "message_id": "abc123...",
  "create_date": "2026-06-20 14:30:00",
  "type": "out",
  "message_type": "image",
  "message": "Optional caption",
  "media_url": "https://...",
  "status": "pending",
  "id": 12346,
  "send_by": { "username": "...", "name": "...", "mobile": "...", "email": "...", "status": true }
}`;

export default function EndpointPage({ endpointKey }) {
  const endpoint = endpoints[endpointKey];

  if (!endpoint) {
    return <div className="text-red-600 dark:text-red-400">Endpoint not found.</div>;
  }

  const auth = authTypes[endpoint.auth];
  const response = endpoint.response || defaultSendResponse;

  const curlExample = buildCurlExample(endpoint);

  return (
    <article>
      <EndpointHeader method={endpoint.method} path={endpoint.path} title={endpoint.title} />

      {auth && (
        <div className="docs-info-box">
          <div className="docs-info-box-title">{auth.label}</div>
          <p className="docs-info-box-text">{auth.description}</p>
        </div>
      )}

      {endpoint.description && (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{endpoint.description}</p>
      )}

      {endpoint.notes?.length > 0 && (
        <div className="mb-6">
          <h3 className="docs-section-heading">Notes</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm">
            {endpoint.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <ParamTable title="Headers" params={endpoint.headers || [{ name: 'token', type: 'string', required: true, description: 'Developer token' }]} />
      {endpoint.pathParams && <ParamTable title="Path Parameters" params={endpoint.pathParams.map((param) => ({ ...param, type: 'string', required: true }))} />}
      {endpoint.query && <ParamTable title="Query Parameters" params={endpoint.query} />}
      {endpoint.body && <ParamTable title="Request Body (JSON)" params={endpoint.body} />}

      <h3 className="docs-section-heading">Example Request</h3>
      <CodeBlock code={curlExample} language="bash" title="cURL" />

      {endpoint.body && (
        <>
          <h3 className="docs-section-heading">Example Body</h3>
          <CodeBlock code={buildExampleBody(endpoint)} language="json" />
        </>
      )}

      <h3 className="docs-section-heading">Example Response</h3>
      <CodeBlock code={response} language="json" title="200 OK" />
    </article>
  );
}

function buildCurlExample(endpoint) {
  const url = `${API_BASE_URL}${fillPath(endpoint)}`;
  const isSession = endpoint.auth === 'session';
  const headers = isSession
    ? '-H "token: YOUR_SESSION_TOKEN" -H "username: YOUR_USERNAME" -H "Content-Type: application/json"'
    : '-H "token: YOUR_DEVELOPER_TOKEN" -H "Content-Type: application/json"';

  if (endpoint.method === 'GET' || endpoint.method === 'DELETE') {
    const query = endpoint.exampleQuery
      || endpoint.query
        ?.filter((q) => q.required)
        .map((q) => `${q.name}=...`)
        .join('&');
    const qs = query ? `?${query}` : '';
    const headerLine = isSession
      ? '-H "token: YOUR_SESSION_TOKEN" \\\n  -H "username: YOUR_USERNAME"'
      : '-H "token: YOUR_DEVELOPER_TOKEN"';
    return `curl -X ${endpoint.method} "${url}${qs}" \\\n  ${headerLine}`;
  }

  return `curl -X ${endpoint.method} "${url}" \\\n  ${headers} \\\n  -d '${JSON.stringify(buildExampleBodyObject(endpoint), null, 2)}'`;
}

function fillPath(endpoint) {
  let path = endpoint.path;
  endpoint.pathParams?.forEach((param) => {
    path = path.replace(`{${param.name}}`, param.example || '...');
  });
  return path;
}

function buildExampleBodyObject(endpoint) {
  if (endpoint.exampleBodyObject) {
    return endpoint.exampleBodyObject;
  }

  const body = {};
  endpoint.body?.forEach((field) => {
    if (field.type === 'boolean') body[field.name] = false;
    else if (field.type === 'array') body[field.name] = [];
    else if (field.type === 'number') body[field.name] = 0;
    else body[field.name] = '...';
  });
  return body;
}

function buildExampleBody(endpoint) {
  return JSON.stringify(buildExampleBodyObject(endpoint), null, 2);
}
