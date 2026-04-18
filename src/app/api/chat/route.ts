/**
 * Mock chat endpoint.
 *
 * Returns a simulated SSE stream compatible with ai-elements' Conversation +
 * Message rendering. No API key required — useful for local demos, Playwright
 * tests, and onboarding new contributors.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Swap to a real provider (OpenAI example — 3 lines):
 *
 *   import { streamText } from "ai";
 *   import { openai } from "@ai-sdk/openai";
 *
 *   export async function POST(req: Request) {
 *     const { messages } = await req.json();
 *     const result = streamText({ model: openai("gpt-4o"), messages });
 *     return result.toUIMessageStreamResponse();
 *   }
 *
 * Anthropic:       import { anthropic } from "@ai-sdk/anthropic";   model: anthropic("claude-sonnet-4-6")
 * Google:          import { google }    from "@ai-sdk/google";      model: google("gemini-2.5-flash")
 * OpenRouter, etc. follow the same pattern.
 *
 * Remember to set the relevant API key in .env.local (NEXT_NOT_public; server-only).
 * ──────────────────────────────────────────────────────────────────────────
 */

type ReqBody = {
  messages?: { role: string; content?: string; parts?: { type: string; text?: string }[] }[];
};

const CANNED_REPLIES = [
  "Preview queued. I'll stream results as they come in.",
  "Looking at the build config for that branch… ",
  "Here's what I see in the last 10 deployments:",
  "On it — let me summarise the current pipeline state.",
];

function pickReply(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("deploy"))
    return "Kicking off a deploy against `main`. I'll hold here and stream status events as each step completes.";
  if (lower.includes("log")) return "Tailing runtime logs for atlas-web · prod. Ctrl+C to stop.";
  if (lower.includes("status"))
    return "All four services are operational. atlas-edge is degraded in the sfo1 region (88ms p50, 2× baseline).";
  return CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)];
}

export async function POST(req: Request) {
  let body: ReqBody = {};
  try {
    body = (await req.json()) as ReqBody;
  } catch {}

  const last = body.messages?.at(-1);
  const prompt = last?.content ?? last?.parts?.map((p) => p.text ?? "").join(" ") ?? "Hello";

  const reply = pickReply(prompt);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Minimal UIMessageStream protocol — one message, streamed char by char.
      const id = `msg_${Date.now()}`;
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "start", messageId: id })}\n\n`),
      );
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "start-step" })}\n\n`));

      for (const chunk of reply.match(/.{1,4}/g) ?? []) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "text-delta", id, delta: chunk })}\n\n`),
        );
        await new Promise((r) => setTimeout(r, 30));
      }

      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "finish-step" })}\n\n`));
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "finish" })}\n\n`));
      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "x-vercel-ai-ui-message-stream": "v1",
    },
  });
}
