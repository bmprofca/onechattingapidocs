# OneChatting Developer API Documentation

Professional API reference for the OneChatting Developer REST and WebSocket APIs.

Built with Create React App.

## Development

```bash
cd ApiDocs
npm install
npm start
```

Opens at `http://localhost:5174`.

## Environment

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_BASE_URL` | Server base URL shown in examples |
| `PORT` | Dev server port (default 5174 in `.env.development`) |

## Build

```bash
npm run build
```

Deploy the `build/` folder to your docs host (e.g. `docs.onechatting.com`).

## Link from Client

Set in Client `.env`:

```
REACT_APP_DEVELOPER_API_DOCS_URL=http://localhost:5174
```
