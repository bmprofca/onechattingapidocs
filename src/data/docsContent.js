export const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'https://server.onechatting.com').replace(/\/$/, '');

export const navSections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', path: '/' },
      { label: 'Authentication', path: '/authentication' },
    ],
  },
  {
    title: 'Messages',
    items: [
      { label: 'Chat List', path: '/messages/chat-list' },
      { label: 'Chat History', path: '/messages/chat-history' },
      { label: 'Media List', path: '/messages/media-list' },
      { label: 'Mark as Read', path: '/messages/mark-as-read' },
      { label: 'Chat Assign Permission', path: '/messages/chat-assign-permission' },
      { label: 'Chat Assign', path: '/messages/chat-assign' },
      { label: 'Send Text', path: '/messages/send-text' },
      { label: 'Send Image', path: '/messages/send-image' },
      { label: 'Send Video', path: '/messages/send-video' },
      { label: 'Send Document', path: '/messages/send-document' },
      { label: 'Send Audio', path: '/messages/send-audio' },
      { label: 'Send Template', path: '/messages/send-template' },
    ],
  },
  {
    title: 'Templates',
    items: [
      { label: 'Template List', path: '/templates/list' },
      { label: 'Template Details', path: '/templates/details' },
      { label: 'Create Template', path: '/templates/create' },
      { label: 'Edit Template', path: '/templates/edit' },
    ],
  },
  {
    title: 'Contacts',
    items: [
      { label: 'Bulk Upsert', path: '/contacts/bulk-upsert' },
      { label: 'Bulk Upsert Status', path: '/contacts/bulk-upsert-status' },
    ],
  },
  {
    title: 'Campaigns',
    items: [
      { label: 'Create Campaign', path: '/campaigns/create' },
      { label: 'Campaign List', path: '/campaigns/list' },
      { label: 'Campaign Details', path: '/campaigns/details' },
      { label: 'Campaign Messages', path: '/campaigns/messages' },
      { label: 'Delete Campaign', path: '/campaigns/delete' },
    ],
  },
  {
    title: 'Real-time',
    items: [
      { label: 'WebSocket Overview', path: '/websocket' },
      { label: 'Socket Events', path: '/websocket/events' },
    ],
  },
  {
    title: 'Developer Access',
    items: [
      { label: 'Access Info', path: '/developer-access/access-info' },
      { label: 'Update Access', path: '/developer-access/update-access' },
      { label: 'Project Token', path: '/developer-access/project-token' },
      { label: 'User Token', path: '/developer-access/user-token' },
    ],
  },
];

export const socketEvents = [
  {
    name: 'auth',
    direction: 'client → server',
    description: 'Authenticate the socket connection after connect. For developer integrations, use auth_type "developer" with your developer token.',
    payload: `{
  "token": "<developer_token>",
  "auth_type": "developer"
}`,
    notes: [
      'Use a User Token for WebSocket authentication (available from Developer Access).',
      'Project Tokens are not supported for WebSocket connections.',
    ],
  },
  {
    name: 'auth_status',
    direction: 'server → client',
    description: 'Authentication result. Connection is closed if false.',
    payload: `true | false`,
  },
  {
    name: 'auth_profile',
    direction: 'server → client',
    description: 'Sent after successful developer authentication with session context.',
    payload: `{
  "auth_type": "developer",
  "project_id": "6975c11a1f13c30dc18f1a30",
  "username": "abc123"
}`,
  },
  {
    name: 'chat',
    direction: 'server → client',
    description: 'New or updated message for a contact. Use project_id to scope events when integrating multiple projects.',
    payload: `{
  "project_id": "6975c11a1f13c30dc18f1a30",
  "contact": {
    "number": "919876543210",
    "name": "John Doe"
  },
  "message": {
    "message_id": "abc123unique30charstringhere12",
    "wamid": "wamid.HBgM...",
    "create_date": "2026-06-20 14:30:00",
    "type": "in",
    "message_type": "text",
    "message": "Hello!",
    "is_template": false,
    "is_forwarded": false,
    "is_reply": false,
    "status": "delivered",
    "id": 12345,
    "is_read": false,
    "send_by": {
      "username": "agent1",
      "name": "Agent Name",
      "mobile": "919999999999",
      "email": "agent@example.com",
      "status": true
    }
  }
}`,
    notes: [
      'type: "in" (received) or "out" (sent).',
      'message_type: text | image | video | audio | document | location | template.',
      'For templates, message contains the rendered body text when available; template and component are always included.',
      'AUTHENTICATION templates: message is built from the OTP code in component (e.g. "123456 is your verification code.").',
      'Template JSON header media URLs are served via {BASE_DOMAIN}/proxy/templates/... (B2 proxied through the API server).',
      'Media messages include media_url and media_name (chat media via {BASE_DOMAIN}/proxy/chat/...).',
    ],
  },
  {
    name: 'message_status',
    direction: 'server → client',
    description: 'Delivery status update for an outgoing message (sent, delivered, read, failed).',
    payload: `{
  "message_id": "abc123unique30charstringhere12",
  "last_id": 12345,
  "project_id": "6975c11a1f13c30dc18f1a30",
  "changes": "delivered",
  "failed_reason": "optional when changes is failed"
}`,
    notes: [
      'changes: sent | delivered | read | failed.',
      'Match updates using message_id or the id field from the message object.',
    ],
  },
  {
    name: 'chat_assigned',
    direction: 'server → client',
    description: 'Chat assignment changed for a contact number.',
    payload: `{
  "assigning": {
    "assigned": true,
    "assigned_to_me": false,
    "assigned_user": {
      "name": "Agent Name",
      "mobile": "919999999999",
      "email": "agent@example.com",
      "status": true,
      "username": "agent1"
    },
    "users": [
      {
        "username": "owner1",
        "name": "Owner",
        "mobile": "918888888888",
        "email": "owner@example.com",
        "type": "admin",
        "is_me": false
      }
    ]
  }
}`,
    notes: [
      'When assigned is false, assigned_user is omitted.',
      'users contains team members available for the conversation.',
    ],
  },
  {
    name: 'total_unread_count',
    direction: 'server → client',
    description: 'Total unread incoming messages for the project.',
    payload: `{
  "count": 12,
  "project_id": "6975c11a1f13c30dc18f1a30"
}`,
  },
  {
    name: 'case_status',
    direction: 'server → client',
    description: 'Open case count updated for a contact number.',
    payload: `{
  "number": "919876543210",
  "case_open_count": 2
}`,
  },
];

export const endpoints = {
  'chat-list': {
    title: 'Chat List',
    method: 'GET',
    path: '/developer/message/chat-list',
    auth: 'message',
    description: 'Returns paginated conversations for the authenticated project, with last message preview, unread count, and open case count per contact.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    query: [
      { name: 'page_no', type: 'number', required: false, description: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', required: false, description: 'Items per page, max 100 (default: 100)' },
      { name: 'search', type: 'string', required: false, description: 'Search by number, message, contact name, email, etc.' },
    ],
    response: `{
  "data": [
    {
      "contact": { "number": "919876543210", "name": "John", "is_favorite": false },
      "case_open_count": 1,
      "last_message": {
        "id": 12345,
        "wamid": "wamid.HBgM...",
        "create_date": "2026-06-20 14:30:00",
        "type": "in",
        "message_type": "text",
        "message": "Hello",
        "status": "delivered",
        "unique_id": "abc123..."
      },
      "unread_count": 3
    }
  ],
  "count": 1,
  "pagination": {
    "page_no": 1,
    "limit": 100,
    "total": 50,
    "total_pages": 1,
    "has_more": false
  }
}`,
  },
  'chat-history': {
    title: 'Chat History',
    method: 'GET',
    path: '/developer/message/chat-history',
    auth: 'message',
    description: 'Fetch message history for a specific contact. Supports cursor pagination via last_id. Template messages include template JSON (with proxied media URLs), component parameters, and a rendered message field.',
    headers: [{ name: 'token', required: true, description: 'User Token' }],
    query: [
      { name: 'number', type: 'string', required: true, description: 'Contact WhatsApp number' },
      { name: 'last_id', type: 'number', required: false, description: 'Cursor — pass last message id from previous page (0 for first page)' },
      { name: 'limit', type: 'number', required: false, description: 'Max 100 (default: 100)' },
    ],
    response: `{
  "data": [
    {
      "message_id": "abc123...",
      "type": "out",
      "message_type": "template",
      "message": "123456 is your verification code. For your security, do not share this code.",
      "is_template": true,
      "template": { "category": "AUTHENTICATION", "components": [ /* ... */ ] },
      "component": [{ "type": "body", "parameters": [{ "type": "text", "text": "123456" }] }],
      "status": "sent"
    }
  ],
  "count": 20,
  "last_id": 12300,
  "assigning": { /* assignment object */ }
}`,
  },
  'media-list': {
    title: 'Media List',
    method: 'POST',
    path: '/developer/message/media-list',
    auth: 'message',
    description:
      'Returns paginated incoming and outgoing media files (images, videos, documents, audio, locations, and template header media) for the authenticated project. Filter by media type, search, date range, and optionally restrict to one or more WhatsApp numbers.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    body: [
      { name: 'filter', type: 'string', required: false, description: 'Media type filter: all, image, video, document, audio (default: all)' },
      { name: 'page_no', type: 'number', required: false, description: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', required: false, description: 'Items per page, max 50 (default: 10)' },
      { name: 'search', type: 'string', required: false, description: 'Search by contact name, number, or file name' },
      { name: 'date_from', type: 'string', required: false, description: 'Start date filter (YYYY-MM-DD, inclusive)' },
      { name: 'date_to', type: 'string', required: false, description: 'End date filter (YYYY-MM-DD, inclusive)' },
      { name: 'number', type: 'string', required: false, description: 'Single WhatsApp number to filter media for that chat only' },
      { name: 'numbers', type: 'array | string', required: false, description: 'One or more WhatsApp numbers (array or comma-separated string). Use with or without number.' },
    ],
    exampleBodyObject: {
      filter: 'document',
      page_no: 1,
      limit: 10,
      numbers: ['919876543210'],
      date_from: '2026-01-01',
      date_to: '2026-03-01',
    },
    notes: [
      'Omit number and numbers to fetch media across all chats in the project.',
      'Pass number or numbers to return media for specific contact(s) only.',
      'direction is incoming for type "in" and outgoing for type "out".',
      'media_url uses the same proxied chat media URLs as chat history.',
      'Template messages are included when they contain header image, video, or document media.',
      'Returns 400 if date_from is after date_to.',
    ],
    response: `{
  "data": [
    {
      "message_id": "abc123unique30charstringhere12",
      "wamid": "wamid.HBgM...",
      "id": 12345,
      "number": "919876543210",
      "contact_name": "John Doe",
      "create_date": "2026-06-20 14:30:00",
      "type": "in",
      "direction": "incoming",
      "message_type": "document",
      "message": "",
      "status": "delivered",
      "is_voice": false,
      "media_url": "https://server.onechatting.com/proxy/chat/...",
      "media_name": "invoice.pdf"
    }
  ],
  "count": 1,
  "pagination": {
    "page_no": 1,
    "limit": 10,
    "total": 45,
    "total_pages": 5,
    "has_more": true
  },
  "filters": {
    "filter": "document",
    "search": "",
    "date_from": "2026-01-01 00:00:00",
    "date_to": "2026-03-01 23:59:59",
    "numbers": ["919876543210"]
  }
}`,
  },
  'mark-as-read': {
    title: 'Mark as Read',
    method: 'POST',
    path: '/developer/message/mark-as-read',
    auth: 'message',
    description: 'Mark all incoming messages from a contact as read.',
    headers: [{ name: 'token', required: true, description: 'User Token' }],
    body: [{ name: 'number', type: 'string', required: true, description: 'Contact WhatsApp number' }],
    response: `{ "error": false }`,
  },
  'chat-assign-permission': {
    title: 'Chat Assign Permission',
    method: 'GET',
    path: '/developer/message/chat-assign-permission',
    auth: 'message',
    description:
      'Check whether the authenticated user can manage chat assignment. Uses the same rules as the portal: admin, "chat assign access" permission, or currently assigned to the chat. Requires a User Token.',
    headers: [{ name: 'token', required: true, description: 'User Token (not Project Token)' }],
    query: [
      {
        name: 'number',
        type: 'string',
        required: false,
        description: 'Optional WhatsApp number. When provided, includes current assignment context and whether you can unassign that chat.',
      },
    ],
    notes: [
      'can_assign is true if you are admin, have chat assign access, the chat is currently assigned to you, OR the chat is unassigned (self-claim allowed).',
      'can_assign_others is true only for admin, chat assign access, or current owner (can transfer to any teammate).',
      'can_self_assign_open is true when the chat has no assignee — you may assign it to yourself without special permission.',
      'can_unassign is true only when the chat is currently assigned to you.',
      'can_manage is true if either can_assign or can_unassign is true.',
      'assigning is included when number is provided (same shape as socket chat_assigned payload).',
    ],
    response: `{
  "error": false,
  "data": {
    "can_assign": true,
    "can_assign_others": false,
    "can_self_assign_open": true,
    "can_unassign": false,
    "can_manage": true,
    "is_admin": false,
    "has_chat_assign_access": false,
    "assigned": false,
    "assigned_to_me": false,
    "assigned_user": null,
    "reason": null,
    "assigning": {
      "assigned": false,
      "users": [ /* project team members */ ]
    }
  }
}`,
  },
  'chat-assign': {
    title: 'Chat Assign',
    method: 'POST',
    path: '/developer/message/chat-assign',
    auth: 'message',
    description:
      'Assign a chat to a team member or unassign yourself from a chat. Same permission rules as the portal chat-assign endpoint, plus self-claim of unassigned chats. Requires a User Token. Emits the chat_assigned socket event on success.',
    headers: [{ name: 'token', required: true, description: 'User Token (not Project Token)' }],
    body: [
      { name: 'number', type: 'string', required: true, description: 'Contact WhatsApp number' },
      { name: 'type', type: 'string', required: true, description: '"assign" or "unassign"' },
      { name: 'target', type: 'string', required: false, description: 'Username to assign to. Required when type is "assign".' },
    ],
    exampleBodyObject: {
      number: '919876543210',
      type: 'assign',
      target: 'agent1',
    },
    notes: [
      'Unassign only works if the chat is currently assigned to the authenticated user.',
      'Assign to others: allowed if you are currently assigned, you are an admin, or you have "chat assign access" permission.',
      'Self-claim: if nobody is assigned, you may assign the chat to yourself (target = your username) even without chat-assign permission.',
      'Without permission, assigning an unassigned chat to someone else is rejected.',
      'On assign, any previous assignment for that number is replaced.',
      'Response includes the updated assigning object.',
    ],
    response: `{
  "error": false,
  "msg": "The user has been assigned successfully",
  "assigning": {
    "assigned": true,
    "assigned_to_me": false,
    "assigned_user": {
      "username": "agent1",
      "name": "Agent Name",
      "mobile": "919999999999",
      "email": "agent@example.com",
      "status": true
    },
    "users": [ /* project team members */ ]
  }
}`,
  },
  'send-text': {
    title: 'Send Text Message',
    method: 'POST',
    path: '/developer/message/send-text-message',
    auth: 'send',
    description: 'Send a text message to a WhatsApp number.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    body: [
      { name: 'number', type: 'string', required: true, description: 'Recipient WhatsApp number' },
      { name: 'message', type: 'string', required: true, description: 'Text body' },
      { name: 'is_reply', type: 'boolean', required: false, description: 'Whether this is a reply' },
      { name: 'reply_wamid', type: 'string', required: false, description: 'Required when is_reply is true' },
    ],
    response: `{
  "wamid": "wamid.HBgM...",
  "message_id": "abc123...",
  "message": "Hello!",
  "create_date": "2026-06-20 14:30:00",
  "type": "out",
  "message_type": "text",
  "status": "pending",
  "id": 12346,
  "send_by": { "username": "...", "name": "...", "mobile": "...", "email": "...", "status": true }
}`,
  },
  'send-image': {
    title: 'Send Image Message',
    method: 'POST',
    path: '/developer/message/send-image-message',
    auth: 'send',
    description: 'Send an image with optional caption.',
    body: [
      { name: 'number', type: 'string', required: true },
      { name: 'image_link', type: 'string', required: true, description: 'Public URL of the image' },
      { name: 'message', type: 'string', required: false, description: 'Caption' },
      { name: 'is_reply', type: 'boolean', required: false },
      { name: 'reply_wamid', type: 'string', required: false },
    ],
  },
  'send-video': {
    title: 'Send Video Message',
    method: 'POST',
    path: '/developer/message/send-video-message',
    auth: 'send',
    body: [
      { name: 'number', type: 'string', required: true },
      { name: 'video_link', type: 'string', required: true },
      { name: 'message', type: 'string', required: false, description: 'Caption' },
      { name: 'is_reply', type: 'boolean', required: false },
      { name: 'reply_wamid', type: 'string', required: false },
    ],
  },
  'send-document': {
    title: 'Send Document Message',
    method: 'POST',
    path: '/developer/message/send-document-message',
    auth: 'send',
    body: [
      { name: 'number', type: 'string', required: true },
      { name: 'document_link', type: 'string', required: true },
      { name: 'document_name', type: 'string', required: false, description: 'Display filename (default: Document)' },
      { name: 'message', type: 'string', required: false, description: 'Caption' },
      { name: 'is_reply', type: 'boolean', required: false },
      { name: 'reply_wamid', type: 'string', required: false },
    ],
  },
  'send-audio': {
    title: 'Send Audio Message',
    method: 'POST',
    path: '/developer/message/send-audio-message',
    auth: 'send',
    body: [
      { name: 'number', type: 'string', required: true },
      { name: 'audio_link', type: 'string', required: true },
      { name: 'is_voice', type: 'boolean', required: false, description: 'true for voice note' },
      { name: 'is_reply', type: 'boolean', required: false },
      { name: 'reply_wamid', type: 'string', required: false },
    ],
  },
  'send-template': {
    title: 'Send Template Message',
    method: 'POST',
    path: '/developer/message/send-template',
    auth: 'send',
    description: 'Send an approved WhatsApp template message. Marketing and Utility templates use variable parameters in header/body. AUTHENTICATION templates use Meta\'s predefined OTP format — pass the OTP code in body.parameters only; the Copy Code button component is added automatically when required. Wallet balance is checked per template category (marketing, utility, authentication).',
    body: [
      { name: 'number', type: 'string', required: true, description: 'Recipient WhatsApp number' },
      { name: 'template_id', type: 'string', required: true, description: 'Template ID from template list/details' },
      { name: 'component', type: 'array', required: true, description: 'WhatsApp send-time components with parameters (array or JSON string)' },
      { name: 'is_reply', type: 'boolean', required: false },
      { name: 'reply_wamid', type: 'string', required: false },
    ],
    exampleBodyObject: {
      number: '919876543210',
      template_id: 'your_template_id',
      component: [
        {
          type: 'body',
          parameters: [{ type: 'text', text: '123456' }],
        },
      ],
    },
    notes: [
      'AUTHENTICATION: component must include body.parameters[0].text with a 4–8 digit OTP code.',
      'AUTHENTICATION: omit the button component for COPY_CODE templates — the API adds it automatically.',
      'MARKETING / UTILITY: include header parameters when the template has a media or text header; include body parameters for {{1}}, {{2}}, etc.',
      'Use proxied media URLs from template-details ({BASE_DOMAIN}/proxy/templates/...) when filling header image/video/document parameters.',
    ],
    response: `{
  "message_id": "abc123...",
  "wamid": "wamid.HBgM...",
  "type": "out",
  "message_type": "template",
  "message": "123456 is your verification code. For your security, do not share this code.",
  "is_template": true,
  "status": "sent",
  "template": {
    "name": "login_otp",
    "category": "AUTHENTICATION",
    "language": "en",
    "components": [ /* template definition */ ]
  },
  "component": [
    { "type": "body", "parameters": [{ "type": "text", "text": "123456" }] },
    { "type": "button", "sub_type": "url", "index": "0", "parameters": [{ "type": "text", "text": "123456" }] }
  ],
  "send_by": { "username": "...", "name": "...", "mobile": "...", "email": "...", "status": true }
}`,
  },
  'template-list': {
    title: 'Template List',
    method: 'GET',
    path: '/developer/template/template-list',
    auth: 'template',
    description: 'List WhatsApp templates for your project. Template definitions are loaded from the database (template_json) with header media expanded to proxied URLs ({BASE_DOMAIN}/proxy/templates/...). Requires a Project Token.',
    headers: [{ name: 'token', required: true, description: 'Project Token' }],
    query: [
      { name: 'status', type: 'string', required: false, description: 'Filter by status (e.g. APPROVED). Partial match supported.' },
      { name: 'category', type: 'string', required: false, description: 'Filter by category: MARKETING, UTILITY, or AUTHENTICATION' },
      { name: 'page_no', type: 'number', required: false, description: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', required: false, description: 'Items per page, max 100 (default: 20)' },
    ],
    response: `{
  "data": [
    {
      "template_id": "...",
      "waba_template_id": "...",
      "template_name": "login_otp",
      "language_code": "en",
      "category": "AUTHENTICATION",
      "status": "APPROVED",
      "create_date": "2026-06-20 14:30:00",
      "reject_reason": null,
      "template": {
        "name": "login_otp",
        "language": "en",
        "category": "AUTHENTICATION",
        "components": [
          { "type": "BODY", "add_security_recommendation": true },
          { "type": "FOOTER", "code_expiration_minutes": 10 },
          { "type": "BUTTONS", "buttons": [{ "type": "OTP", "otp_type": "COPY_CODE", "text": "Copy code" }] }
        ]
      }
    }
  ],
  "count": 10,
  "meta": { "page_no": 1, "limit": 20, "total_records": 10, "total_pages": 1, "has_more": false }
}`,
  },
  'template-details': {
    title: 'Template Details',
    method: 'GET',
    path: '/developer/template/template-details',
    auth: 'template',
    description: 'Get a single template by ID. Header image/video/document handles in template JSON are returned as proxied media URLs ({BASE_DOMAIN}/proxy/templates/...) ready for use in send-template header parameters.',
    query: [
      { name: 'template_id', type: 'string', required: true, description: 'Template ID' },
    ],
    response: `{
  "data": {
    "template_id": "...",
    "waba_template_id": "...",
    "template_name": "hello_world",
    "language_code": "en",
    "status": "APPROVED",
    "category": "MARKETING",
    "create_date": "2026-06-20 14:30:00",
    "project_id": "...",
    "reject_reason": null
  },
  "template": {
    "name": "hello_world",
    "category": "MARKETING",
    "language": "en",
    "components": [
      {
        "type": "HEADER",
        "format": "IMAGE",
        "example": { "header_handle": ["https://server.onechatting.com/proxy/templates/.../header.jpg"] }
      },
      { "type": "BODY", "text": "Hello {{1}}", "example": { "body_text": [["World"]] } }
    ]
  }
}`,
  },
  'create-template': {
    title: 'Create Template',
    method: 'POST',
    path: '/developer/template/create-template',
    auth: 'template',
    description: 'Create a new WhatsApp template and submit it to Meta for approval. Header media URLs in the request are downloaded and stored on B2; only filenames are saved in template_json. AUTHENTICATION templates must use Meta\'s predefined format (no custom body text). Requires a Project Token.',
    body: [
      { name: 'template', type: 'object', required: true, description: 'WhatsApp template JSON (name, language, category, components)' },
    ],
    exampleBodyObject: {
      template: {
        name: 'login_otp',
        language: 'en',
        category: 'AUTHENTICATION',
        components: [
          { type: 'BODY', add_security_recommendation: true },
          { type: 'FOOTER', code_expiration_minutes: 10 },
          {
            type: 'BUTTONS',
            buttons: [{ type: 'OTP', otp_type: 'COPY_CODE', text: 'Copy code' }],
          },
        ],
      },
    },
    notes: [
      'AUTHENTICATION: do not include custom body text or body variable samples — use add_security_recommendation and code_expiration_minutes only.',
      'MARKETING / UTILITY: header media can be a public URL; it will be uploaded to B2 during create.',
      'Status after create may be APPROVED, PENDING, or REJECTED depending on Meta review.',
    ],
    response: `{
  "template_id": "...",
  "template_name": "login_otp",
  "language_code": "en",
  "category": "AUTHENTICATION",
  "status": "PENDING",
  "template": { /* stored template with proxied media URLs expanded */ }
}`,
  },
  'edit-template': {
    title: 'Edit Template',
    method: 'POST',
    path: '/developer/template/edit-template',
    auth: 'template',
    description: 'Edit an existing template and resubmit to Meta. Media is re-processed to B2. AUTHENTICATION templates are validated against the predefined format. Template status becomes PENDING after edit.',
    body: [
      { name: 'template_id', type: 'string', required: true, description: 'Existing template ID' },
      { name: 'template', type: 'object', required: true, description: 'Updated template JSON' },
      { name: 'category', type: 'string', required: false, description: 'Override category if needed' },
    ],
    exampleBodyObject: {
      template_id: 'your_template_id',
      template: {
        name: 'login_otp',
        components: [
          { type: 'BODY', add_security_recommendation: true },
          { type: 'FOOTER', code_expiration_minutes: 15 },
          {
            type: 'BUTTONS',
            buttons: [{ type: 'OTP', otp_type: 'COPY_CODE', text: 'Copy code' }],
          },
        ],
      },
    },
    response: `{
  "template_id": "...",
  "template_name": "login_otp",
  "language_code": "en",
  "category": "AUTHENTICATION",
  "status": "PENDING",
  "template": { /* updated template with proxied media URLs expanded */ }
}`,
  },
  'bulk-upsert': {
    title: 'Bulk Upsert Contacts',
    method: 'POST',
    path: '/developer/contact/bulk-upsert',
    auth: 'send',
    description:
      'Create or update contacts in bulk for the authenticated project. Matching is done by phone number: existing numbers are updated, new numbers are inserted. The request is accepted immediately and processed in a background queue — use the returned job_id to poll status.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    body: [
      {
        name: 'number',
        type: 'string',
        required: true,
        description: 'WhatsApp number with country code (digits only preferred). Used as the upsert key.',
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Contact display name. If omitted, the number is used as the name.',
      },
      { name: 'email', type: 'string', required: false, description: 'Contact email address' },
      { name: 'firm_name', type: 'string', required: false, description: 'Company / firm name' },
      { name: 'website', type: 'string', required: false, description: 'Website URL' },
      { name: 'remark', type: 'string', required: false, description: 'Internal note / remark' },
    ],
    exampleBodyObject: [
      {
        number: '91234567890',
        name: 'Test Contact',
        email: 'test@gmail.com',
        firm_name: 'Test Firm',
        website: 'https://www.test.com',
        remark: 'Test Remark',
      },
      {
        number: '91234567891',
        email: 'test1@gmail.com',
        firm_name: 'Test Firm 1',
        website: 'https://www.test1.com',
        remark: 'Test Remark 1',
      },
    ],
    notes: [
      'Send either a raw JSON array of contact objects, or { "contacts": [ ... ] }.',
      'Maximum 10,000 contacts per request.',
      'Processing runs in the background. The HTTP response returns as soon as the job is queued.',
      'New contacts are also assigned to the authenticated user in chat_assigned (same behaviour as create-contact).',
      'Poll GET /developer/contact/bulk-upsert-status?job_id=... for progress. Job status is retained for about 1 hour.',
    ],
    response: `{
  "error": false,
  "msg": "Bulk contact upsert accepted and is processing in the background",
  "job_id": "abc123xyz...",
  "total": 2,
  "status_url": "/developer/contact/bulk-upsert-status?job_id=abc123xyz..."
}`,
  },
  'bulk-upsert-status': {
    title: 'Bulk Upsert Status',
    method: 'GET',
    path: '/developer/contact/bulk-upsert-status',
    auth: 'send',
    description:
      'Check the status of a previously queued bulk contact upsert job. Only jobs belonging to the authenticated project can be queried.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    query: [
      { name: 'job_id', type: 'string', required: true, description: 'Job ID returned by bulk-upsert' },
    ],
    notes: [
      'status values: queued | processing | completed | failed.',
      'errors contains up to 100 sample failure/skip reasons (e.g. missing number).',
      'Jobs expire after about 1 hour and then return "Job not found or expired".',
    ],
    response: `{
  "error": false,
  "data": {
    "job_id": "abc123xyz...",
    "status": "completed",
    "total": 2,
    "processed": 2,
    "inserted": 1,
    "updated": 1,
    "skipped": 0,
    "failed": 0,
    "errors": []
  }
}`,
  },
  'campaign-create': {
    title: 'Create Campaign',
    method: 'POST',
    path: '/developer/campaign/create',
    auth: 'send',
    description:
      'Create a WhatsApp template campaign using phone numbers only. Recipients are processed in the background. Optionally schedule the campaign for a future time (IST).',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    body: [
      { name: 'name', type: 'string', required: true, description: 'Campaign name' },
      { name: 'template_id', type: 'string', required: true, description: 'Approved template ID' },
      { name: 'numbers', type: 'array', required: true, description: 'Array of WhatsApp numbers (country code included). Max 10,000. Duplicates are removed.' },
      { name: 'component', type: 'array', required: true, description: 'Template component parameters (same format as send-template)' },
      { name: 'schedule_date', type: 'string', required: false, description: 'Optional schedule time in IST: YYYY-MM-DD HH:mm:ss. Must be a future time. Omit to send as soon as recipients are prepared.' },
    ],
    exampleBodyObject: {
      name: 'March promo',
      template_id: 'tmpl_abc123',
      numbers: ['919876543210', '919811122233'],
      component: [
        { type: 'body', parameters: [{ type: 'text', text: 'John' }] },
      ],
      schedule_date: '2026-07-26 10:30:00',
    },
    notes: [
      'Only numbers-based creation is supported on the developer API (no excel/sheet/group sources).',
      'Template must belong to the project and have status APPROVED.',
      'If schedule_date is provided, messages are not sent until that time (scheduler).',
      'Past schedule_date values are rejected.',
      'Immediate create (no schedule_date) returns msg "Campaign created successfully" without schedule_date.',
    ],
    response: `{
  "error": false,
  "msg": "Campaign created successfully",
  "campaign_id": "abc123...",
  "total_numbers": 2
}

// When schedule_date is provided:
{
  "error": false,
  "msg": "Campaign scheduled successfully",
  "campaign_id": "abc123...",
  "schedule_date": "2026-07-26 10:30:00",
  "total_numbers": 2
}`,
  },
  'campaign-list': {
    title: 'Campaign List',
    method: 'GET',
    path: '/developer/campaign/list',
    auth: 'send',
    description: 'List campaigns for the authenticated project with pagination and optional status filter.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    query: [
      { name: 'status', type: 'string', required: false, description: 'all | pending | complete | stopped (default: all)' },
      { name: 'page_no', type: 'number', required: false, description: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', required: false, description: 'Items per page, max 100 (default: 20)' },
    ],
    notes: [
      'Deleted campaigns are excluded.',
      'status in the response may also be "scheduled" when a pending campaign has schedule_date set.',
      'recipients stats are included only when entry_complete is true.',
    ],
    response: `{
  "data": [
    {
      "campaign_id": "abc123...",
      "name": "March promo",
      "status": "scheduled",
      "schedule_date": "2026-07-26 10:30:00",
      "entry_complete": true,
      "source": "contact",
      "template": { "template_id": "...", "template_name": "promo_offer" },
      "recipients": {
        "total": 100,
        "pending": 10,
        "sent": 80,
        "delivered": 70,
        "read": 40,
        "failed": 10
      }
    }
  ],
  "count": 1,
  "meta": { "page_no": 1, "limit": 20, "total_records": 1, "total_pages": 1, "has_more": false }
}`,
  },
  'campaign-details': {
    title: 'Campaign Details',
    method: 'GET',
    path: '/developer/campaign/details',
    auth: 'send',
    description: 'Fetch a single campaign with recipient counters and estimated cost.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    query: [
      { name: 'campaign_id', type: 'string', required: true, description: 'Campaign ID' },
    ],
    response: `{
  "error": false,
  "msg": "Campaign data fetched successfully",
  "data": {
    "campaign_id": "abc123...",
    "name": "March promo",
    "status": "complete",
    "entry_complete": true,
    "source": "contact",
    "template": {
      "template_id": "...",
      "template_name": "promo_offer",
      "category": "MARKETING",
      "language_code": "en"
    },
    "recipients": {
      "total": 100,
      "pending": 0,
      "sent": 90,
      "delivered": 85,
      "read": 60,
      "failed": 10
    },
    "cost": {
      "total": 85.0,
      "per_message": 0.85,
      "used": 72.25
    }
  }
}`,
  },
  'campaign-messages': {
    title: 'Campaign Messages',
    method: 'GET',
    path: '/developer/campaign/messages',
    auth: 'send',
    description: 'Paginated list of campaign message rows (per recipient), with optional status filter.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    query: [
      { name: 'campaign_id', type: 'string', required: true, description: 'Campaign ID' },
      { name: 'status', type: 'string', required: false, description: 'all | pending | sent | delivered | read | failed (default: all)' },
      { name: 'page_no', type: 'number', required: false, description: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', required: false, description: 'Items per page, max 100 (default: 20)' },
    ],
    response: `{
  "data": [
    {
      "unique_id": "...",
      "number": "919876543210",
      "template_id": "...",
      "template_name": "promo_offer",
      "component": [],
      "wamid": "wamid.HBgM...",
      "send_date": "2026-07-26 10:31:00",
      "create_date": "2026-07-26 10:30:05",
      "status": "delivered"
    }
  ],
  "count": 1,
  "meta": { "page_no": 1, "limit": 20, "total_records": 100, "total_pages": 5, "has_more": true }
}`,
    notes: [
      'When status is "failed", the item also includes failed_reason.',
    ],
  },
  'campaign-delete': {
    title: 'Delete Campaign',
    method: 'POST',
    path: '/developer/campaign/delete',
    auth: 'send',
    description: 'Soft-delete a campaign. Same rules as the portal: campaign must exist and must not already be deleted.',
    headers: [{ name: 'token', required: true, description: 'User Token or Project Token' }],
    body: [
      { name: 'campaign_id', type: 'string', required: true, description: 'Campaign ID to delete' },
    ],
    notes: [
      'Sets is_deleted = 1 and records deleted_by.',
      'Already deleted campaigns return an error.',
      'Deleted campaigns no longer appear in the list endpoint.',
    ],
    response: `{
  "error": false,
  "msg": "Campaign deleted successfully"
}`,
  },
  'access-info': {
    title: 'Access Info',
    method: 'POST',
    path: '/developer/access-info',
    auth: 'session',
    description: 'Returns developer access settings, project token, and user tokens for a project. Project owner only.',
    headers: [
      { name: 'token', type: 'string', required: true, description: 'Login session token' },
      { name: 'username', type: 'string', required: true, description: 'Logged-in username' },
    ],
    body: [
      { name: 'project_id', type: 'string', required: true, description: 'Project ID' },
    ],
    response: `{
  "error": false,
  "developer_access": true,
  "developer_token": "...",
  "users": [
    {
      "unique_id": "...",
      "username": "...",
      "name": "...",
      "email": "...",
      "type": "admin",
      "status": true,
      "developer_token": "..."
    }
  ]
}`,
  },
  'update-access': {
    title: 'Update Developer Access',
    method: 'POST',
    path: '/developer/update-developer-access',
    auth: 'session',
    description: 'Enable or disable developer API access for a project. Project owner only.',
    headers: [
      { name: 'token', type: 'string', required: true, description: 'Login session token' },
      { name: 'username', type: 'string', required: true, description: 'Logged-in username' },
    ],
    body: [
      { name: 'project_id', type: 'string', required: true, description: 'Project ID' },
      { name: 'status', type: 'boolean', required: true, description: 'true to enable, false to disable' },
    ],
    response: `{
  "error": false,
  "msg": "Developer access updated successfully",
  "developer_access": true
}`,
  },
  'project-token': {
    title: 'Generate Project Token',
    method: 'PUT',
    path: '/developer/update-developer-access',
    auth: 'session',
    description: 'Generate or regenerate the project-level developer token. Project owner only.',
    headers: [
      { name: 'token', type: 'string', required: true, description: 'Login session token' },
      { name: 'username', type: 'string', required: true, description: 'Logged-in username' },
    ],
    body: [
      { name: 'project_id', type: 'string', required: true, description: 'Project ID' },
    ],
    response: `{
  "error": false,
  "msg": "Developer token updated successfully",
  "developer_token": "..."
}`,
  },
  'user-token': {
    title: 'Generate User Token',
    method: 'PUT',
    path: '/developer/update-agent-developer-token',
    auth: 'session',
    description: 'Generate or regenerate a user developer token. Project owner only.',
    headers: [
      { name: 'token', type: 'string', required: true, description: 'Login session token' },
      { name: 'username', type: 'string', required: true, description: 'Logged-in username' },
    ],
    body: [
      { name: 'project_id', type: 'string', required: true, description: 'Project ID' },
      { name: 'unique_id', type: 'string', required: true, description: 'User mapping unique ID' },
    ],
    response: `{
  "error": false,
  "msg": "User developer token updated successfully",
  "developer_token": "..."
}`,
  },
};

export const authTypes = {
  session: {
    label: 'Session Auth',
    description: 'Used for Developer Access management from the dashboard. Send your login token and username in headers, and project_id in the JSON body.',
  },
  message: {
    label: 'User Token',
    description: 'Used to read conversations and manage chat assignment: chat list, chat history, mark as read, chat-assign-permission, and chat-assign.',
  },
  send: {
    label: 'User or Project Token',
    description: 'Used to send messages, manage contacts (bulk upsert), and manage campaigns. A User Token acts as that user; a Project Token acts on behalf of the project.',
  },
  template: {
    label: 'Project Token',
    description: 'Required for template list, details, create, and edit endpoints.',
  },
};
