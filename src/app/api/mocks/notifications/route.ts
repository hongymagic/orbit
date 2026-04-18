/**
 * Mock notifications endpoint.
 *
 * Returns a static list of notifications. Consumed by
 * `src/components/layout/notifications-panel.tsx` and any surface that
 * wants to render live notifications.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Swap for real data:
 *
 *   const rows = await db.notifications.findMany({ where: { userId } });
 *   return Response.json(rows);
 *
 * Or proxy an existing service — the shape is intentionally simple:
 *   { id, initials, actor, title, subtitle, time, bucket, severity, unread }
 * ──────────────────────────────────────────────────────────────────────────
 */

import { notifications } from "@/data/notifications";

export async function GET() {
  return Response.json(notifications, {
    headers: { "Cache-Control": "no-store" },
  });
}
