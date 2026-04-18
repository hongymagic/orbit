/**
 * Stub chat endpoint.
 *
 * The design-system demo at /_design/ai renders a fake conversation purely
 * in React state. When you're ready to wire a real provider, replace this
 * handler with a call to the AI SDK's streaming helpers — the front-end
 * already speaks `ai-elements`, so no UI change should be needed.
 *
 *   import { streamText } from "ai";
 *   import { openai } from "@ai-sdk/openai";
 *
 *   export async function POST(req: Request) {
 *     const { messages } = await req.json();
 *     const result = streamText({ model: openai("gpt-4o"), messages });
 *     return result.toUIMessageStreamResponse();
 *   }
 */

export async function POST() {
  return Response.json(
    {
      error:
        "stub: wire a provider in src/app/api/chat/route.ts. See source for the two-line AI SDK recipe.",
    },
    { status: 501 },
  );
}
