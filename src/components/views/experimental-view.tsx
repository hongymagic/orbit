"use client";

import { Column, DataTable } from "@/components/data/data-table";
import { Console } from "@/components/data/console";
import { Badge } from "@/components/orbit/badge";
import { Button } from "@/components/orbit/button";
import { Card, CardHead } from "@/components/orbit/card";
import { Metric, MetricGrid } from "@/components/orbit/metric";
import { GridSplit, Page, PageHead } from "@/components/layout/page-shell";

import { runtimeLogs } from "@/data/logs";

type OpsRow = [
  ts: string,
  kind: string,
  svc: string,
  ref: string,
  target: string,
  state: string,
  dur: string,
];

const opsRows: readonly OpsRow[] = [
  ["14:22:34", "deploy", "atlas-web", "main", "4e2a1b7", "READY", "1m 24s"],
  ["14:08:12", "deploy", "atlas-web", "feat/billing-v2", "9f1c8e3", "BUILD", "54s"],
  ["13:40:02", "deploy", "atlas-api", "fix/rate-limit", "a7b02d4", "QUEUE", "-"],
  ["13:22:48", "rollback", "atlas-web", "main", "c45ff91", "DONE", "36s"],
  ["11:22:01", "deploy", "atlas-edge", "main", "1e0a762", "READY", "48s"],
  ["09:41:19", "deploy", "atlas-api", "main", "880fa0c", "READY", "1m 52s"],
  ["08:12:04", "secret", "atlas-web", "-", "STRIPE_WEBHOOK_KEY", "ROTATED", "-"],
];

const stateTone: Record<string, "ok" | "info" | "warn" | "err"> = {
  READY: "ok",
  BUILD: "info",
  QUEUE: "warn",
  DONE: "ok",
  ROTATED: "info",
  FAILED: "err",
};

const routeRows: readonly [method: string, path: string, latency: string, region: string][] = [
  ["GET", "/", "4ms", "iad1"],
  ["GET", "/dashboard", "22ms", "iad1"],
  ["GET", "/api/me", "8ms", "edge"],
  ["POST", "/api/sessions", "34ms", "edge"],
  ["GET", "/api/billing/plans", "18ms", "edge"],
  ["POST", "/api/webhook/stripe", "94ms", "iad1"],
  ["GET", "/api/search", "42ms", "edge"],
];

const ascii = "━".repeat(240);

const opsColumns: readonly Column<OpsRow>[] = [
  { key: "ts", header: "ts", cell: (r) => <span className="text-fg-subtle">{r[0]}</span> },
  { key: "kind", header: "kind", cell: (r) => <span className="text-fg-muted">{r[1]}</span> },
  { key: "svc", header: "service", cell: (r) => <span className="font-semibold">{r[2]}</span> },
  { key: "ref", header: "ref", cell: (r) => <span className="text-fg-muted">{r[3]}</span> },
  {
    key: "tgt",
    header: "sha / target",
    cell: (r) => <span className="text-fg-muted">{r[4]}</span>,
  },
  {
    key: "st",
    header: "state",
    cell: (r) => (
      <Badge tone={stateTone[r[5]] ?? "neutral"} dot>
        {r[5]}
      </Badge>
    ),
  },
  {
    key: "dur",
    header: "dur",
    align: "right",
    cell: (r) => <span className="text-fg-muted">{r[6]}</span>,
  },
  {
    key: "chev",
    header: "",
    align: "right",
    width: 40,
    cell: () => <span className="text-fg-faint">→</span>,
  },
];

const routeColumns: readonly Column<(typeof routeRows)[number]>[] = [
  {
    key: "method",
    header: "",
    width: 60,
    cell: (r) => <span className="text-accent">{r[0]}</span>,
  },
  { key: "path", header: "", cell: (r) => <span className="font-medium">{r[1]}</span> },
  {
    key: "lat",
    header: "",
    align: "right",
    cell: (r) => <span className="text-fg-muted">{r[2]}</span>,
  },
  {
    key: "reg",
    header: "",
    align: "right",
    width: 50,
    cell: (r) => <span className="text-fg-subtle">{r[3]}</span>,
  },
];

export function ExperimentalView() {
  return (
    <Page>
      <PageHead
        kicker="~/atlas-web $ orbit ps"
        title="Operations"
        sub="Flat event log. No dashboards. Grep-friendly by design."
        actions={
          <>
            <Button size="sm" variant="ghost">
              [?] help
            </Button>
            <Button size="sm" variant="ghost">
              [/] filter
            </Button>
            <Button size="sm" variant="primary">
              [n] new deployment
            </Button>
          </>
        }
      />

      <MetricGrid withGridBg>
        <Metric label="UPTIME" value="99.94%" delta="30d" />
        <Metric label="P50 LATENCY" value="42ms" delta="−4ms" deltaDir="up" />
        <Metric label="ERR RATE" value="0.018%" delta="+0.002" deltaDir="down" />
        <Metric label="QPS" value="4,812" delta="rolling 1m" />
      </MetricGrid>

      <AsciiDivider text={ascii} />

      <div className="mb-3 flex items-center tag-strip">
        <Badge>env:prod</Badge>
        <Badge>region:iad1</Badge>
        <Badge>svc:*</Badge>
        <Badge>kind:deploy|rollback|secret</Badge>
        <Badge>since:24h</Badge>
      </div>

      <Card className="brutal-card">
        <DataTable columns={opsColumns} rows={opsRows} rowKey={(r) => r[0] + r[4]} mono />
      </Card>

      <AsciiDivider text={ascii} />

      <GridSplit>
        <Card>
          <CardHead title="$ orbit logs --tail" sub="atlas-web · prod" />
          <Console entries={runtimeLogs} maxHeight={300} flush />
        </Card>

        <Card>
          <CardHead title="routes" sub="edge · 12 fns" />
          <DataTable columns={routeColumns} rows={routeRows} rowKey={(r) => r[0] + r[1]} mono />
        </Card>
      </GridSplit>

      <AsciiDivider text={ascii} />

      <div className="flex justify-between font-mono text-[11px] text-fg-subtle">
        <span>orbit · 7 events · prod · iad1</span>
        <span>[j/k] navigate · [enter] open · [r] refresh · [q] quit</span>
      </div>
    </Page>
  );
}

function AsciiDivider({ text }: { text: string }) {
  return (
    <div className="font-mono text-fg-faint text-[11px] overflow-hidden whitespace-nowrap select-none my-6">
      {text}
    </div>
  );
}
