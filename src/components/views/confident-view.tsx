"use client";

import { Icon } from "@/components/icons";
import { Column, DataTable } from "@/components/data/data-table";
import { CodeSnippet } from "@/components/data/code-snippet";
import { Badge } from "@/components/orbit/badge";
import { Button } from "@/components/orbit/button";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Grid, GridSplit, Page } from "@/components/layout/page-shell";

import { services, serviceStatusLabel, type Service } from "@/data/services";

const statusTone: Record<Service["status"], "ok" | "warn" | "err"> = {
  ok: "ok",
  warn: "warn",
  err: "err",
};

const columns: readonly Column<Service>[] = [
  {
    key: "service",
    header: "Service",
    cell: (s) => (
      <div>
        <div className="font-medium">{s.name}</div>
        <div className="font-mono text-[12px] text-fg-subtle mt-0.5">{s.domain}</div>
      </div>
    ),
  },
  {
    key: "region",
    header: "Region",
    cell: (s) => <span className="font-mono text-fg-muted">{s.region}</span>,
  },
  {
    key: "status",
    header: "Status",
    cell: (s) => (
      <Badge tone={statusTone[s.status]} dot>
        {serviceStatusLabel[s.status]}
      </Badge>
    ),
  },
  {
    key: "latency",
    header: "P50 latency",
    align: "right",
    cell: (s) => <span className="font-mono">{s.latency}</span>,
  },
  {
    key: "req",
    header: "Req · 24h",
    align: "right",
    cell: (s) => <span className="font-mono text-fg-muted">{s.req}</span>,
  },
  {
    key: "cpu",
    header: "CPU",
    align: "right",
    cell: (s) => (
      <div className="inline-flex items-center gap-2">
        <div className="w-[60px] h-1 bg-bg-muted rounded-[2px] overflow-hidden shadow-[inset_0_0_0_1px_var(--color-line)]">
          <div
            className="h-full"
            style={{
              width: `${s.cpu}%`,
              background: s.cpu > 70 ? "var(--color-warn)" : "var(--color-accent)",
            }}
          />
        </div>
        <span className="font-mono text-[12px] min-w-[28px] text-right">{s.cpu}%</span>
      </div>
    ),
  },
];

export function ConfidentView() {
  return (
    <Page className="pt-10">
      <section
        className="mb-7"
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <div className="relative overflow-hidden rounded-lg bg-bg-subtle p-8 shadow-[0_0_0_1px_var(--color-line),0_2px_2px_rgb(0_0_0/0.02)]">
          <div
            className="hero-grid absolute pointer-events-none"
            style={{ right: -40, top: -40, width: 360, height: 360, opacity: 0.8 }}
            aria-hidden="true"
          />
          <div className="relative text-kicker">Orbit · platform</div>
          <h1
            className="orbit-h1 relative mt-2.5"
            style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.035em", maxWidth: 560 }}
          >
            Ship code at the speed of thought.
          </h1>
          <div className="relative mt-3.5 text-fg-muted max-w-[480px] text-[15px]">
            Four services. One control plane. Deploy on push, preview on PR, promote with a click —
            with guardrails your security team actually trusts.
          </div>
          <div className="relative flex gap-2 mt-5 items-center">
            <Button variant="accent" size="lg">
              Start a deployment
            </Button>
            <Button size="lg" variant="ghost">
              Open runbook
            </Button>
            <div className="ml-3 text-fg-subtle">
              <Badge tone="ok" dot>
                all systems nominal
              </Badge>
            </div>
          </div>
        </div>

        <div className="bg-bg rounded-lg p-5 shadow-[0_0_0_1px_var(--color-line),0_2px_2px_rgb(0_0_0/0.02)] flex flex-col justify-between">
          <div>
            <div className="text-kicker">This month</div>
            <div
              className="mt-2.5 tabular-nums font-semibold leading-none"
              style={{ fontSize: 48, letterSpacing: "-0.035em" }}
            >
              1,842
            </div>
            <div className="mt-1 text-fg-muted text-[13px]">deployments across 4 services</div>
          </div>
          <div className="mt-5 space-y-1.5">
            <Row label="P50 BUILD" value="47s" />
            <Row label="P95 BUILD" value="2m 14s" />
            <Row label="ROLLBACKS" value="3" />
          </div>
        </div>
      </section>

      <GridSplit>
        <Card>
          <CardHead
            title="Services"
            sub="4 projects · 3 regions"
            actions={
              <Button size="sm" variant="ghost">
                <Icon name="plus" /> Add service
              </Button>
            }
          />
          <DataTable columns={columns} rows={services} rowKey={(s) => s.name} />
        </Card>

        <Card>
          <CardHead title="Quick start" sub="Wire up the CLI" />
          <CardBody>
            <CodeSnippet>
              <div>
                <span className="code-c"># install the Orbit CLI</span>
              </div>
              <div>
                <span className="code-k">curl</span> -fsSL orbit.app/install{" "}
                <span className="code-n">|</span> sh
              </div>
              <div className="mt-2.5">
                <span className="code-c"># link an existing project</span>
              </div>
              <div>
                <span className="code-k">orbit</span> link <span className="code-s">./my-app</span>
              </div>
              <div className="mt-2.5">
                <span className="code-c"># deploy a preview from your laptop</span>
              </div>
              <div>
                <span className="code-k">orbit</span> deploy <span className="code-n">--env</span>=
                <span className="code-s">preview</span>
              </div>
            </CodeSnippet>
            <div className="flex items-center gap-2 mt-4">
              <Button size="sm" variant="ghost">
                Copy
              </Button>
              <Button size="sm" variant="ghost">
                Open docs
              </Button>
              <div className="flex-1" />
              <Badge tone="info" dot>
                CLI v3.4.1
              </Badge>
            </div>
          </CardBody>
        </Card>
      </GridSplit>

      <div className="mt-6">
        <Grid columns={3}>
          <Card>
            <CardHead title="Build queue" sub="3 in flight" />
            <CardBody>
              <div className="flex flex-col gap-3">
                {[
                  { b: "feat/billing-v2", pct: 78, eta: "22s" },
                  { b: "fix/rate-limit", pct: 34, eta: "1m 08s" },
                  { b: "chore/deps", pct: 12, eta: "1m 42s" },
                ].map((b) => (
                  <div key={b.b}>
                    <div className="flex justify-between">
                      <span className="font-mono text-[12px]">{b.b}</span>
                      <span className="font-mono text-[11px] text-fg-subtle">{b.eta}</span>
                    </div>
                    <div className="w-full h-[3px] bg-bg-muted rounded-[2px] mt-1.5 overflow-hidden shadow-[inset_0_0_0_1px_var(--color-line)]">
                      <div className="h-full bg-accent" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Uptime · 30d" sub="99.94% overall" />
            <CardBody>
              <div className="flex gap-[2px] items-end h-12">
                {Array.from({ length: 30 }, (_, i) => i).map((day) => {
                  const h = 28 + (day % 5) * 4 + Math.sin(day) * 6;
                  const bad = day === 18 || day === 22;
                  return (
                    <div
                      // oxlint-disable-next-line no-array-index-key -- fixed-length decorative bar chart, no reorder possible
                      key={day}
                      className="flex-1 rounded-[1px]"
                      style={{
                        height: bad ? 12 : h,
                        background: bad ? "var(--color-warn)" : "var(--color-accent)",
                        opacity: 0.85,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 font-mono text-[11px] text-fg-subtle">
                <span>30d ago</span>
                <span>today</span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Secrets rotation" sub="Next due in 4 days" />
            <CardBody>
              <div className="flex flex-col gap-2">
                {[
                  ["STRIPE_WEBHOOK_KEY", "rotated 3d", "ok"],
                  ["DATABASE_URL", "rotated 11d", "ok"],
                  ["OPENAI_API_KEY", "due in 4d", "warn"],
                  ["AUTH_SIGNING_SECRET", "due in 12d", "neutral"],
                ].map(([k, t, tone]) => (
                  <div key={k as string} className="flex justify-between">
                    <span className="font-mono text-[12px]">{k}</span>
                    <Badge tone={tone as "ok" | "warn" | "neutral"}>{t}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Grid>
      </div>
    </Page>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-mono text-fg-subtle text-[11px]">{label}</span>
      <span className="font-mono text-[12px]">{value}</span>
    </div>
  );
}
