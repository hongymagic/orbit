"use client";

import { Icon } from "@/components/icons";
import { Activity } from "@/components/data/activity";
import { Console } from "@/components/data/console";
import { Column, DataTable } from "@/components/data/data-table";
import { Pipeline, PipelineArrow, PipelineStep } from "@/components/data/pipeline";
import { Badge } from "@/components/orbit/badge";
import { Button } from "@/components/orbit/button";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Metric, MetricGrid } from "@/components/orbit/metric";
import { Grid, GridSplit, Page, PageHead } from "@/components/layout/page-shell";

import { activityToday } from "@/data/activity";
import { buildLogs } from "@/data/logs";
import { deployments, statusLabel, type Deployment } from "@/data/deployments";
import { sparkBranches, sparkBuild, sparkDeployments, sparkUptime } from "@/data/sparks";

const statusTone: Record<Deployment["status"], "ok" | "info" | "warn" | "err"> = {
  ok: "ok", info: "info", warn: "warn", err: "err",
};

const columns: readonly Column<Deployment>[] = [
  {
    key: "status",
    header: "Status",
    cell: (d) => (
      <Badge tone={statusTone[d.status]} dot>
        {statusLabel[d.status]}
      </Badge>
    ),
  },
  { key: "name", header: "Project", cell: (d) => <span className="font-medium">{d.name}</span> },
  { key: "branch", header: "Branch", cell: (d) => <span className="font-mono text-[12px] text-fg-muted">{d.branch}</span> },
  { key: "sha", header: "Commit", cell: (d) => <span className="font-mono text-[12px] text-fg-subtle">{d.sha}</span> },
  {
    key: "env",
    header: "Environment",
    cell: (d) =>
      d.env === "Production" ? <Badge>Production</Badge> : <Badge tone="info">Preview</Badge>,
  },
  { key: "author", header: "Author", cell: (d) => <span className="text-fg-muted">{d.author}</span> },
  { key: "duration", header: "Duration", align: "right", cell: (d) => <span className="font-mono text-fg-muted">{d.duration}</span> },
  { key: "age", header: "Age", align: "right", cell: (d) => <span className="font-mono text-fg-subtle">{d.time}</span> },
];

export function ConservativeView() {
  return (
    <Page>
      <PageHead
        kicker="Project · atlas-web"
        title="Deployments"
        sub="Every push to a branch creates a preview. Promotion to production requires approval."
        actions={
          <>
            <Button size="sm">
              <Icon name="git" /> Import Git repo
            </Button>
            <Button size="sm" variant="primary">
              <Icon name="plus" /> New deployment
            </Button>
          </>
        }
      />

      <MetricGrid>
        <Metric label="Deployments · 7d" value="247"     delta="+18 vs prev week"  deltaDir="up" data={sparkDeployments} />
        <Metric label="Avg build time"    value="1m 12s" delta="−9s vs prev week"  deltaDir="up" data={sparkBuild} />
        <Metric label="Success rate"      value="99.8%"  delta="+0.2 pp"           deltaDir="up" data={sparkUptime} />
        <Metric label="Active branches"   value="18"     delta="+2 this week"      deltaDir="up" data={sparkBranches} />
      </MetricGrid>

      <div className="mt-6">
        <Card>
          <CardHead
            title="Recent deployments"
            sub="Last 24 hours"
            actions={
              <>
                <Button size="sm" variant="ghost">All environments</Button>
                <Button size="sm" variant="ghost" iconOnly aria-label="More">
                  <Icon name="dots" />
                </Button>
              </>
            }
          />
          <DataTable columns={columns} rows={deployments} rowKey={(d) => d.id} />
        </Card>
      </div>

      <div className="mt-6">
        <GridSplit>
          <Card>
            <CardHead title="Pipeline" sub="Develop → Preview → Ship" />
            <CardBody>
              <Pipeline>
                <PipelineStep
                  stage="develop"
                  label="Develop"
                  title="feat/billing-v2"
                  sub="3 commits ahead · Kian Park"
                />
                <PipelineArrow />
                <PipelineStep
                  stage="preview"
                  label="Preview"
                  title="dpl_pK3m · building"
                  sub="ETA 22s · automated checks queued"
                />
                <PipelineArrow />
                <PipelineStep
                  stage="ship"
                  label="Ship"
                  title="Requires approval"
                  sub="2 reviewers · 1 check passing"
                />
              </Pipeline>
              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" variant="ghost">View checks</Button>
                <Button size="sm" variant="ghost">Runtime config</Button>
                <div className="flex-1" />
                <Button size="sm" variant="primary">Promote to production</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Activity" sub="Team · today" />
            <Activity events={activityToday} />
          </Card>
        </GridSplit>
      </div>

      <div className="mt-6">
        <Card>
          <CardHead
            title="Build output"
            sub="dpl_pK3m · feat/billing-v2 · building"
            actions={
              <Button size="sm" variant="ghost" iconOnly aria-label="More">
                <Icon name="dots" />
              </Button>
            }
          />
          <CardBody>
            <Console entries={buildLogs} />
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
