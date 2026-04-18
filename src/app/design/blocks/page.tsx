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
    id: "dashboard-01",
    category: "Application",
    path: "src/app/dashboard + src/components/{app-sidebar,data-table,section-cards,site-header,nav-*}.tsx",
    description:
      "Full application shell — sidebar + header + section cards + data table + area chart. Installed from shadcn registry as-is; swap data to taste.",
    openHref: "/dashboard",
  },
  {
    name: "Login",
    id: "login-01",
    category: "Auth",
    path: "src/app/login + src/components/login-form.tsx",
    description:
      "Standard email-and-password login with branded wrapper. Form uses shadcn Field primitives.",
    openHref: "/login",
  },
  {
    name: "Sidebar",
    id: "sidebar-02 / 07 / 13 (merged)",
    category: "Navigation",
    path: "src/components/{app-sidebar,nav-main,nav-projects,nav-secondary,nav-user,team-switcher}.tsx",
    description:
      "Collapsible app sidebar with team switcher, grouped nav, and user menu. Used by the dashboard block; drop into other routes via <SidebarProvider>.",
    openHref: "/dashboard",
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

const categoryOrder = ["Application", "Navigation", "Auth", "Date", "Data viz"] as const;

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
