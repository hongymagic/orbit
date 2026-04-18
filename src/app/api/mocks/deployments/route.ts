/**
 * Mock deployments endpoint.
 *
 * GET /api/mocks/deployments              → all deployments
 * GET /api/mocks/deployments?env=Production → filtered by env
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Swap for real data:
 *
 *   const rows = await db.deployments.findMany({
 *     where: env ? { env } : undefined,
 *     orderBy: { createdAt: "desc" },
 *   });
 *   return Response.json(rows);
 * ──────────────────────────────────────────────────────────────────────────
 */

import { deployments } from "@/data/deployments";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const env = url.searchParams.get("env");
  const rows = env ? deployments.filter((d) => d.env === env) : deployments;
  return Response.json(rows, {
    headers: { "Cache-Control": "no-store" },
  });
}
