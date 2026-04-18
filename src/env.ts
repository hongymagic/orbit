/**
 * Environment variable schema.
 *
 * Single source of truth for what `process.env` may contain. Parsed once
 * at module load — misconfigured env crashes the app immediately with a
 * readable error instead of leaking undefined into integration code.
 *
 * Usage:
 *   import { env } from "@/env";
 *   if (env.AI_PROVIDER === "openai") { ... }
 *
 * Server-only vars MUST NOT be prefixed with NEXT_PUBLIC_.
 * Client-readable vars MUST be prefixed NEXT_PUBLIC_.
 */

import { z } from "zod";

const schema = z.object({
  // ──────── public (client-readable) ────────
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  // ──────── ai (server-only) ────────
  AI_PROVIDER: z.enum(["mock", "openai", "anthropic"]).default("mock"),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),

  // ──────── auth (server-only) ────────
  AUTH_SECRET: z.string().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),

  // ──────── db (server-only) ────────
  DATABASE_URL: z.string().optional(),
});

export type Env = z.infer<typeof schema>;

function load(): Env {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment:\n${issues}\n\nSee .env.example.`);
  }
  return parsed.data;
}

export const env = load();

/**
 * Typed assertion helper. Use on a server boundary when an integration
 * absolutely requires a var. Throws a helpful error pointing at .env.example.
 *
 *   const key = requireEnv("OPENAI_API_KEY");
 */
export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env[key];
  if (value === undefined || value === "") {
    throw new Error(
      `Missing required env var: ${key}. Add it to .env.local — see .env.example for the contract.`,
    );
  }
  return value as NonNullable<Env[K]>;
}
