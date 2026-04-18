/**
 * Mock services endpoint. Returns the fleet of services shown on
 * `/_design/experimental` and the dashboard block.
 *
 * Swap for real data: read from your service registry / infra DB, shape
 * to the `Service` type in `src/data/services.ts`.
 */

import { services } from "@/data/services";

export async function GET() {
  return Response.json(services, {
    headers: { "Cache-Control": "no-store" },
  });
}
