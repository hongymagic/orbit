/**
 * Mock activity endpoint. Returns today's actor/verb/object stream used by
 * the Activity component (`src/components/data/activity.tsx`).
 *
 * Swap for real data: read from your event/audit log, shape to the
 * `ActivityEvent` type.
 */

import { activityToday } from "@/data/activity";

export async function GET() {
  return Response.json(activityToday, {
    headers: { "Cache-Control": "no-store" },
  });
}
