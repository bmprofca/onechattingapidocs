import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import Introduction from "./pages/Introduction";
import Authentication from "./pages/Authentication";
import EndpointPage from "./pages/EndpointPage";
import WebSocketOverview from "./pages/WebSocketOverview";
import SocketEvents from "./pages/SocketEvents";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Layout onMenuToggle={() => setSidebarOpen(true)}>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/authentication" element={<Authentication />} />

          <Route
            path="/messages/chat-list"
            element={<EndpointPage endpointKey="chat-list" />}
          />
          <Route
            path="/messages/chat-history"
            element={<EndpointPage endpointKey="chat-history" />}
          />
          <Route
            path="/messages/media-list"
            element={<EndpointPage endpointKey="media-list" />}
          />
          <Route
            path="/messages/mark-as-read"
            element={<EndpointPage endpointKey="mark-as-read" />}
          />
          <Route
            path="/messages/chat-assign-permission"
            element={<EndpointPage endpointKey="chat-assign-permission" />}
          />
          <Route
            path="/messages/chat-assign"
            element={<EndpointPage endpointKey="chat-assign" />}
          />
          <Route
            path="/messages/send-text"
            element={<EndpointPage endpointKey="send-text" />}
          />
          <Route
            path="/messages/send-image"
            element={<EndpointPage endpointKey="send-image" />}
          />
          <Route
            path="/messages/send-video"
            element={<EndpointPage endpointKey="send-video" />}
          />
          <Route
            path="/messages/send-document"
            element={<EndpointPage endpointKey="send-document" />}
          />
          <Route
            path="/messages/send-audio"
            element={<EndpointPage endpointKey="send-audio" />}
          />
          <Route
            path="/messages/send-template"
            element={<EndpointPage endpointKey="send-template" />}
          />

          <Route
            path="/templates/list"
            element={<EndpointPage endpointKey="template-list" />}
          />
          <Route
            path="/templates/details"
            element={<EndpointPage endpointKey="template-details" />}
          />
          <Route
            path="/templates/create"
            element={<EndpointPage endpointKey="create-template" />}
          />
          <Route
            path="/templates/edit"
            element={<EndpointPage endpointKey="edit-template" />}
          />
          <Route
            path="/templates/delete"
            element={<EndpointPage endpointKey="delete-template" />}
          />

          <Route
            path="/contacts/bulk-upsert"
            element={<EndpointPage endpointKey="bulk-upsert" />}
          />
          <Route
            path="/contacts/bulk-upsert-status"
            element={<EndpointPage endpointKey="bulk-upsert-status" />}
          />

          <Route
            path="/campaigns/create"
            element={<EndpointPage endpointKey="campaign-create" />}
          />
          <Route
            path="/campaigns/list"
            element={<EndpointPage endpointKey="campaign-list" />}
          />
          <Route
            path="/campaigns/details"
            element={<EndpointPage endpointKey="campaign-details" />}
          />
          <Route
            path="/campaigns/messages"
            element={<EndpointPage endpointKey="campaign-messages" />}
          />
          <Route
            path="/campaigns/delete"
            element={<EndpointPage endpointKey="campaign-delete" />}
          />

          <Route path="/websocket" element={<WebSocketOverview />} />
          <Route path="/websocket/events" element={<SocketEvents />} />

          <Route path="/developer-access/access-info" element={<EndpointPage endpointKey="access-info" />} />
          <Route path="/developer-access/update-access" element={<EndpointPage endpointKey="update-access" />} />
          <Route path="/developer-access/project-token" element={<EndpointPage endpointKey="project-token" />} />
          <Route path="/developer-access/user-token" element={<EndpointPage endpointKey="user-token" />} />
        </Routes>
      </Layout>
    </>
  );
}
