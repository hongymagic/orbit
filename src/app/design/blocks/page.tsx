import Link from "next/link";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Badge } from "@/components/orbit/badge";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Icon } from "@/components/icons";

type Block = {
  name: string;
  id: string;
  category: string;
  path: string;
  description: string;
  openHref?: string;
  internalDemo?: boolean;
};

const blocks: readonly Block[] = [
  {
    name: "Dashboard",
    id: "dashboard-idp",
    category: "Application",
    path: "src/app/design/dashboard/page.tsx + src/components/{orbit,data,layout}/*",
    description:
      "Orbit IDP dashboard — metric grid, recent deployments, pipeline + activity split, and build output console. Composed from Orbit atoms and data composites; matches the _reference/Orbit IDP.html default surface.",
    openHref: "/_design/dashboard",
  },
  {
    name: "Login",
    id: "login-01",
    category: "Auth",
    path: "src/components/login-form.tsx",
    description:
      "Standard email-and-password login with branded wrapper. Form uses shadcn Field primitives. Mount under src/app/ when wiring a real auth route.",
    openHref: "/_design/surfaces/login",
    internalDemo: true,
  },
  {
    name: "Sidebar · app",
    id: "app-sidebar",
    category: "Navigation",
    path: "src/components/app-sidebar.tsx",
    description:
      "Full application sidebar — team header, nav-main, documents, secondary section, and user footer. Collapsible=offcanvas.",
    internalDemo: true,
  },
  {
    name: "Site header",
    id: "site-header",
    category: "Navigation",
    path: "src/components/site-header.tsx",
    description:
      "Top bar that pairs with AppSidebar — sidebar toggle + breadcrumb + utility actions.",
    internalDemo: true,
  },
  {
    name: "Search form",
    id: "search-form",
    category: "Navigation",
    path: "src/components/search-form.tsx",
    description:
      "Sidebar-aware search input wrapping a form. Drop inside a SidebarHeader for docs-style nav.",
    internalDemo: true,
  },
  {
    name: "Team switcher",
    id: "team-switcher",
    category: "Navigation",
    path: "src/components/team-switcher.tsx",
    description:
      "Multi-team dropdown with per-item shortcuts and Add-team affordance. Mount in SidebarHeader.",
    internalDemo: true,
  },
  {
    name: "Version switcher",
    id: "version-switcher",
    category: "Navigation",
    path: "src/components/version-switcher.tsx",
    description: "Documentation version picker — dropdown with current-selection check mark.",
    internalDemo: true,
  },
  {
    name: "Section cards",
    id: "section-cards",
    category: "Application",
    path: "src/components/section-cards.tsx",
    description:
      "4-up KPI grid with gradient cards, trend badges, and caption footers. Container-query responsive.",
    internalDemo: true,
  },
  {
    name: "Settings dialog",
    id: "settings-dialog",
    category: "Application",
    path: "src/components/settings-dialog.tsx",
    description:
      "Modal with embedded SidebarProvider — category list on the left, content on the right.",
    internalDemo: true,
  },
  {
    name: "Data table",
    id: "data-table",
    category: "Data",
    path: "src/components/data-table.tsx",
    description:
      "TanStack Table + dnd-kit sortable rows. Columns with checkbox selection, status badges, inline editing, drawer row viewer.",
    internalDemo: true,
  },
  {
    name: "Calendar · single",
    id: "calendar-01",
    category: "Date",
    path: "src/components/calendar-01.tsx",
    description: "Single-date picker with shadcn Calendar primitive.",
    internalDemo: true,
  },
  {
    name: "Calendar · range",
    id: "calendar-18",
    category: "Date",
    path: "src/components/calendar-18.tsx",
    description: "Range picker variant, ideal for report filters.",
    internalDemo: true,
  },
  {
    name: "Chart · area",
    id: "chart-area-default",
    category: "Data viz",
    path: "src/components/chart-area-default.tsx",
    description: "Smooth area chart backed by Recharts with tooltip + legend.",
    internalDemo: true,
  },
  {
    name: "Chart · area (interactive)",
    id: "chart-area-interactive",
    category: "Data viz",
    path: "src/components/chart-area-interactive.tsx",
    description: "Interactive time-range area chart with Select + ToggleGroup window controls.",
    internalDemo: true,
  },
  {
    name: "Chart · bar (interactive)",
    id: "chart-bar-interactive",
    category: "Data viz",
    path: "src/components/chart-bar-interactive.tsx",
    description: "Bar chart with series toggles and animated hover state.",
    internalDemo: true,
  },
  {
    name: "Chart · line",
    id: "chart-line-default",
    category: "Data viz",
    path: "src/components/chart-line-default.tsx",
    description: "Line chart with multiple series and gridlines.",
    internalDemo: true,
  },
  {
    name: "Chart · pie",
    id: "chart-pie-simple",
    category: "Data viz",
    path: "src/components/chart-pie-simple.tsx",
    description: "Minimal pie chart with legend.",
    internalDemo: true,
  },
  {
    name: "Chart · radial",
    id: "chart-radial-simple",
    category: "Data viz",
    path: "src/components/chart-radial-simple.tsx",
    description: "Circular gauge / radial bar for single-value KPIs.",
    internalDemo: true,
  },
];

const categoryOrder = ["Application", "Navigation", "Auth", "Data", "Date", "Data viz"] as const;

export default function BlocksPage() {
  const byCategory = categoryOrder.map((cat) => ({
    cat,
    items: blocks.filter((b) => b.category === cat),
  }));

  return (
    <>
      <Topbar crumbs={["Design System", "Blocks"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Composed patterns"
          title="Blocks"
          sub="Pre-built compositions from the shadcn registry, pulled via bunx shadcn@latest add <name>. They live in src/components/ and /src/app/ as shadcn expects — the token bridge in globals.css styles them automatically."
          actions={
            <Badge tone="info" dot>
              shadcn registry
            </Badge>
          }
        />

        {byCategory.map(({ cat, items }) =>
          items.length === 0 ? null : (
            <section key={cat} className="mb-8">
              <div className="text-kicker mb-3">{cat}</div>
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
              >
                {items.map((block) => (
                  <Card key={block.id}>
                    <CardHead
                      title={block.name}
                      sub={block.id}
                      actions={
                        <span className="font-mono text-[10px] text-fg-subtle">
                          {block.category}
                        </span>
                      }
                    />
                    <CardBody>
                      <div className="text-[13px] text-fg-muted leading-[1.55] mb-3">
                        {block.description}
                      </div>
                      <div className="font-mono text-[11px] text-fg-subtle mb-3 break-all">
                        {block.path}
                      </div>
                      <div className="flex items-center gap-2">
                        {block.openHref ? (
                          <Link
                            href={block.openHref as never}
                            className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-sm bg-fg text-bg text-[12px] font-medium hover:opacity-90"
                          >
                            Open route <Icon name="chev" className="rotate-[-90deg]" />
                          </Link>
                        ) : null}
                        {block.internalDemo ? (
                          <Link
                            href={`/_design/blocks/${block.id}` as never}
                            className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-sm text-[12px] font-medium text-fg-muted hover:text-fg shadow-[inset_0_0_0_1px_var(--color-line)]"
                          >
                            Live demo <Icon name="chev" className="rotate-[-90deg]" />
                          </Link>
                        ) : null}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </section>
          ),
        )}
      </Page>
    </>
  );
}
