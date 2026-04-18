# Integrations

Indirection layer between product code and external services. The template ships with placeholder implementations — no API keys needed to run the dev server. Swapping any slot to a real provider is a single-file change.

## Pattern

Every slot exports a stable interface that product code imports from `@/integrations/<slot>`. The implementation behind that interface starts as a stub; real wires come later.

```
src/integrations/
├── ai/    · index.ts     — AI provider (mock | openai | anthropic)
├── auth/  · index.ts     — session + sign in/out
├── db/    · index.ts     — typed queries
└── README.md             — this file
```

Product code (e.g. `ProfileMenu`, `ConservativeView`) only imports the interface. Flip the implementation to production by editing the single `index.ts` — no UI changes required.

## Env

All slots read from [`src/env.ts`](../env.ts), which Zod-validates `process.env` at import time. See [`.env.example`](../../.env.example) for the contract.

## AI — `@/integrations/ai`

Today: routes through the mock `/api/chat` SSE stream (no API key).

Swap to OpenAI:

```bash
bun add @ai-sdk/openai
```

Replace `src/app/api/chat/route.ts` body with:

```ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({ model: openai("gpt-4o"), messages });
  return result.toUIMessageStreamResponse();
}
```

Set `OPENAI_API_KEY` and `AI_PROVIDER=openai` in `.env.local`.

## Auth — `@/integrations/auth`

Today: `getSession()` returns `null`; `requireSession()` throws. `ProfileMenu` and any protected-route code already import from this slot.

Swap to Auth.js v5:

```bash
bun add next-auth@beta
```

Replace `src/integrations/auth/index.ts`:

```ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [GitHub],
});
export const getSession = auth;
export async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}
```

Add `src/app/api/auth/[...nextauth]/route.ts` exporting `handlers.GET` / `handlers.POST`. Set `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`.

## DB — `@/integrations/db`

Today: typed async getters that read from `src/data/*`. Exercised in production code (`ConservativeView` reads deployments through this slot).

Swap to Drizzle + libSQL:

```bash
bun add drizzle-orm @libsql/client
bun add -D drizzle-kit
```

Create `src/integrations/db/schema.ts` with `deployments` and `services` tables, then replace `index.ts` with Drizzle queries. Run `bunx drizzle-kit push` to create tables and seed from `src/data/*`.

## Adding a new slot

1. Create `src/integrations/<slot>/index.ts` with typed stubs that throw "not configured".
2. Add required env vars to `src/env.ts` + `.env.example`.
3. Update this README with the copy-paste recipe.
4. Consume the slot from product code via `@/integrations/<slot>` — never call the underlying provider directly.
