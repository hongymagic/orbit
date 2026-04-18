import { notFound } from "next/navigation";

import Calendar01 from "@/components/calendar-01";
import Calendar18 from "@/components/calendar-18";
import { ChartAreaDefault } from "@/components/chart-area-default";
import { ChartBarInteractive } from "@/components/chart-bar-interactive";
import { ChartLineDefault } from "@/components/chart-line-default";
import { ChartPieSimple } from "@/components/chart-pie-simple";
import { ChartRadialSimple } from "@/components/chart-radial-simple";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";

import {
  AppSidebarDemo,
  ChartAreaInteractiveDemo,
  DataTableDemo,
  LoginFormDemo,
  SearchFormDemo,
  SectionCardsDemo,
  SettingsDialogDemo,
  SiteHeaderDemo,
  TeamSwitcherDemo,
  VersionSwitcherDemo,
} from "./block-frames";

type BlockRenderer = {
  title: string;
  id: string;
  path: string;
  component: React.ComponentType;
  /** Disable centering/padding when the block manages its own frame. */
  fullBleed?: boolean;
};

const blockMap: Record<string, BlockRenderer> = {
  "calendar-01": {
    title: "Calendar · single",
    id: "calendar-01",
    path: "src/components/calendar-01.tsx",
    component: Calendar01,
  },
  "calendar-18": {
    title: "Calendar · range",
    id: "calendar-18",
    path: "src/components/calendar-18.tsx",
    component: Calendar18,
  },
  "chart-area-default": {
    title: "Chart · area",
    id: "chart-area-default",
    path: "src/components/chart-area-default.tsx",
    component: ChartAreaDefault,
  },
  "chart-area-interactive": {
    title: "Chart · area (interactive)",
    id: "chart-area-interactive",
    path: "src/components/chart-area-interactive.tsx",
    component: ChartAreaInteractiveDemo,
    fullBleed: true,
  },
  "chart-bar-interactive": {
    title: "Chart · bar (interactive)",
    id: "chart-bar-interactive",
    path: "src/components/chart-bar-interactive.tsx",
    component: ChartBarInteractive,
  },
  "chart-line-default": {
    title: "Chart · line",
    id: "chart-line-default",
    path: "src/components/chart-line-default.tsx",
    component: ChartLineDefault,
  },
  "chart-pie-simple": {
    title: "Chart · pie",
    id: "chart-pie-simple",
    path: "src/components/chart-pie-simple.tsx",
    component: ChartPieSimple,
  },
  "chart-radial-simple": {
    title: "Chart · radial",
    id: "chart-radial-simple",
    path: "src/components/chart-radial-simple.tsx",
    component: ChartRadialSimple,
  },
  "app-sidebar": {
    title: "AppSidebar",
    id: "app-sidebar",
    path: "src/components/app-sidebar.tsx",
    component: AppSidebarDemo,
    fullBleed: true,
  },
  "site-header": {
    title: "SiteHeader",
    id: "site-header",
    path: "src/components/site-header.tsx",
    component: SiteHeaderDemo,
    fullBleed: true,
  },
  "section-cards": {
    title: "SectionCards",
    id: "section-cards",
    path: "src/components/section-cards.tsx",
    component: SectionCardsDemo,
    fullBleed: true,
  },
  "settings-dialog": {
    title: "SettingsDialog",
    id: "settings-dialog",
    path: "src/components/settings-dialog.tsx",
    component: SettingsDialogDemo,
  },
  "search-form": {
    title: "SearchForm",
    id: "search-form",
    path: "src/components/search-form.tsx",
    component: SearchFormDemo,
    fullBleed: true,
  },
  "team-switcher": {
    title: "TeamSwitcher",
    id: "team-switcher",
    path: "src/components/team-switcher.tsx",
    component: TeamSwitcherDemo,
    fullBleed: true,
  },
  "version-switcher": {
    title: "VersionSwitcher",
    id: "version-switcher",
    path: "src/components/version-switcher.tsx",
    component: VersionSwitcherDemo,
    fullBleed: true,
  },
  "login-01": {
    title: "Login",
    id: "login-01",
    path: "src/components/login-form.tsx",
    component: LoginFormDemo,
  },
  "data-table": {
    title: "DataTable (shadcn)",
    id: "data-table",
    path: "src/components/data-table.tsx",
    component: DataTableDemo,
    fullBleed: true,
  },
};

export function generateStaticParams() {
  return Object.keys(blockMap).map((block) => ({ block }));
}

export default async function BlockDemoPage({ params }: { params: Promise<{ block: string }> }) {
  const { block } = await params;
  const entry = blockMap[block];
  if (!entry) notFound();

  const Demo = entry.component;

  return (
    <>
      <Topbar crumbs={["Design System", "Blocks", entry.title]} hideDeploy />
      <Page>
        <PageHead
          kicker={entry.id}
          title={entry.title}
          sub={`Pulled from shadcn registry via \`bunx shadcn@latest add ${entry.id}\`. Source: ${entry.path}.`}
        />
        <Card>
          <CardHead title="Live" sub={entry.path} />
          <CardBody>
            <div className={entry.fullBleed ? "" : "p-4 flex justify-center"}>
              <Demo />
            </div>
          </CardBody>
        </Card>
      </Page>
    </>
  );
}
