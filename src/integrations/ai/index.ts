/**
 * AI integration slot.
 *
 * Today: every consumer goes through the mock `/api/chat` SSE stream.
 * When you swap in a real provider, edit THIS file; UI code stays
 * unchanged (it already talks to `/api/chat`).
 *
 *   env.AI_PROVIDER = "openai"      → OPENAI_API_KEY required
 *   env.AI_PROVIDER = "anthropic"   → ANTHROPIC_API_KEY required
 *
 * How to wire a real provider (OpenAI example — 3 edits):
 *
 *   1. bun add @ai-sdk/openai
 *   2. Replace `streamChatMock` in /src/app/api/chat/route.ts with:
 *
 *      import { streamText } from "ai";
 *      import { openai } from "@ai-sdk/openai";
 *      const result = streamText({
 *        model: openai("gpt-4o"),
 *        messages: body.messages,
 *      });
 *      return result.toUIMessageStreamResponse();
 *
 *   3. Set OPENAI_API_KEY + AI_PROVIDER=openai in .env.local.
 */

import { env, requireEnv } from "@/env";

export type AiProvider = "mock" | "openai" | "anthropic";

export const aiProvider: AiProvider = env.AI_PROVIDER;

/**
 * Returns a runtime-validated handle to the configured provider. Call at
 * the top of server routes that need to fail fast on misconfiguration.
 *
 * The template ships with `mock`, so this never throws by default.
 */
export function assertAiConfigured(): AiProvider {
  if (aiProvider === "openai") requireEnv("OPENAI_API_KEY");
  if (aiProvider === "anthropic") requireEnv("ANTHROPIC_API_KEY");
  return aiProvider;
}
