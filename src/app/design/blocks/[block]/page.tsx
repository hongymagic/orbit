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

type BlockRenderer = {
  title: string;
  id: string;
  path: string;
  component: React.ComponentType;
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
            <div className="p-4 flex justify-center">
              <Demo />
            </div>
          </CardBody>
        </Card>
      </Page>
    </>
  );
}
