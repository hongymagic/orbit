/**
 * Legacy chat endpoint — re-exports the handler from /api/mocks/chat.
 *
 * Any existing consumer (`useChat({ api: "/api/chat" })`) keeps working;
 * new code should POST to `/api/mocks/chat` directly so it's obvious the
 * surface is stubbed. When you wire a real provider, edit the mocks route
 * and delete this file.
 */

export { POST } from "../mocks/chat/route";
