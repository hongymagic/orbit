/**
 * Mock build/runtime logs endpoint.
 *
 * GET /api/mocks/logs              → JSON array (all entries)
 * GET /api/mocks/logs?limit=5      → first N entries
 * GET /api/mocks/logs?stream=1     → SSE stream (40ms pacing), for the
 *                                    Console composite to animate.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Swap for real data:
 *
 *   const rows = await logs.tail({ service, limit });
 *   return Response.json(rows);
 *
 * For SSE streaming, connect to your log pipeline (Vector, Loki, etc.)
 * and re-emit each line as a `data: <json>\n\n` chunk.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { buildLogsText } from "@/data/logs-text";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit") ?? 0) || buildLogsText.length;
  const stream = url.searchParams.get("stream") === "1";
  const rows = buildLogsText.slice(0, limit);

  if (!stream) {
    return Response.json(rows, { headers: { "Cache-Control": "no-store" } });
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      for (const entry of rows) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(entry)}\n\n`));
        // oxlint-disable-next-line no-await-in-loop -- sequential pacing is intentional for SSE streaming
        await new Promise((r) => setTimeout(r, 40));
      }
      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
