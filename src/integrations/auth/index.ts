/**
 * Auth integration slot.
 *
 * Today: the template ships with NO auth — `getSession()` always returns
 * `null`, `requireSession()` throws, `signIn`/`signOut` are no-ops.
 *
 * Product code imports from `@/integrations/auth`. When you wire Auth.js
 * (or your SaaS of choice), edit THIS file and the interface stays the
 * same — ProfileMenu, protected route handlers, etc. don't need touching.
 *
 * How to wire Auth.js v5:
 *
 *   1. bun add next-auth@beta
 *   2. Set AUTH_SECRET + AUTH_GITHUB_ID + AUTH_GITHUB_SECRET in .env.local.
 *   3. Replace this file:
 *
 *      import NextAuth from "next-auth";
 *      import GitHub from "next-auth/providers/github";
 *      export const { auth, signIn, signOut, handlers } = NextAuth({
 *        providers: [GitHub],
 *      });
 *      export const getSession = auth;
 *      export async function requireSession() {
 *        const session = await auth();
 *        if (!session?.user) throw new Error("Unauthorized");
 *        return session;
 *      }
 *
 *   4. Add `src/app/api/auth/[...nextauth]/route.ts` exporting `handlers.GET`
 *      and `handlers.POST`.
 */

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
};

export async function getSession(): Promise<Session | null> {
  return null;
}

export async function requireSession(): Promise<Session> {
  throw new Error(
    "requireSession() called but no auth provider is configured. See src/integrations/auth/index.ts.",
  );
}

export async function signIn(_provider?: string): Promise<void> {
  throw new Error("signIn() stub — wire a real auth provider. See src/integrations/auth/index.ts.");
}

export async function signOut(): Promise<void> {
  throw new Error(
    "signOut() stub — wire a real auth provider. See src/integrations/auth/index.ts.",
  );
}
