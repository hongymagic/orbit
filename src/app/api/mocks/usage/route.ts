/**
 * Mock usage endpoint. Returns the billing-period meters consumed by the
 * Billing surface.
 *
 * Swap for real data: aggregate your metering pipeline and shape to
 * `UsagePayload` in `src/data/usage.ts`.
 */

import { usageApril } from "@/data/usage";

export async function GET() {
  return Response.json(usageApril, {
    headers: { "Cache-Control": "no-store" },
  });
}
