/**
 * Mock search endpoint.
 *
 * GET /api/mocks/search?q=atlas → { deployments: [...], services: [...], nav: [...] }
 *
 * Used by the "live search" demo on /_design/navigation. Matches a simple
 * case-insensitive `includes` across the fixture data.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Swap for real data:
 *
 *   const [deps, svcs] = await Promise.all([
 *     db.deployments.search(q),
 *     db.services.search(q),
 *   ]);
 *   return Response.json({ deployments: deps, services: svcs, nav: [] });
 *
 * Or front the whole thing with Algolia / Typesense / Postgres FTS.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { deployments } from "@/data/deployments";
import { services } from "@/data/services";
import { designNav } from "@/lib/design-nav";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();

  if (!q) {
    return Response.json(
      { deployments: [], services: [], nav: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const navItems = designNav
    .flatMap((section) => section.items.map((item) => ({ ...item, section: section.label })))
    .filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.key.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q),
    );

  return Response.json(
    {
      deployments: deployments.filter(
        (d) =>
          d.id.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q) ||
          d.branch.toLowerCase().includes(q) ||
          d.sha.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q),
      ),
      services: services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.domain.toLowerCase().includes(q) ||
          s.region.toLowerCase().includes(q),
      ),
      nav: navItems,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
