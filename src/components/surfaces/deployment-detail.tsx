"use client";

import { Console } from "@/components/data/console";
import { Pipeline, PipelineArrow, PipelineStep } from "@/components/data/pipeline";
import { Badge } from "@/components/orbit/badge";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Button } from "@/components/orbit/button";
import { Icon } from "@/components/icons";
import { buildLogs } from "@/data/logs";
import { type Deployment, statusLabel } from "@/data/deployments";

export function DeploymentDetail({ deployment }: { deployment: Deployment }) {
  const tone: "ok" | "info" | "warn" | "err" = deployment.status;
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "minmax(0, 1fr) 280px" }}
    >
      <div className="flex flex-col gap-4 min-w-0">
        <Card>
          <CardHead
            title={
              <span className="flex items-center gap-2">
                <span className="font-mono">{deployment.id}</span>
                <Badge tone={tone} dot>
                  {statusLabel[deployment.status]}
                </Badge>
              </span>
            }
            sub={`${deployment.name} · ${deployment.branch} · ${deployment.sha}`}
            actions={
              <>
                <Button size="sm" variant="ghost">
                  Rollback
                </Button>
                <Button size="sm" variant="primary">
                  Promote
                </Button>
              </>
            }
          />
        </Card>

        <Card>
          <CardHead title="Pipeline" sub="Develop → Preview → Ship" />
          <CardBody>
            <Pipeline>
              <PipelineStep stage="develop" label="Develop" title={deployment.branch} sub={`${deployment.author}`} />
              <PipelineArrow />
              <PipelineStep
                stage="preview"
                label="Preview"
                title={deployment.env === "Preview" ? "current" : "promoted"}
                sub={`${deployment.duration} build`}
              />
              <PipelineArrow />
              <PipelineStep
                stage="ship"
                label="Ship"
                title={deployment.env === "Production" ? "In production" : "Awaiting approval"}
                sub={deployment.env === "Production" ? "live now" : "2 reviewers"}
              />
            </Pipeline>
          </CardBody>
        </Card>

        <Card>
          <CardHead title="Build output" sub={`${deployment.id} · logs`} />
          <CardBody>
            <Console entries={buildLogs} />
          </CardBody>
        </Card>
      </div>

      <aside className="flex flex-col gap-4">
        <Card>
          <CardHead title="Metadata" />
          <CardBody className="flex flex-col gap-3 text-[13px]">
            <MetadataRow label="Environment" value={deployment.env} />
            <MetadataRow label="Author" value={deployment.author} />
            <MetadataRow label="Duration" value={deployment.duration} mono />
            <MetadataRow label="Age" value={deployment.time} mono />
            <MetadataRow label="Commit" value={deployment.sha} mono />
          </CardBody>
        </Card>
        <Card>
          <CardHead title="Actions" />
          <CardBody className="flex flex-col gap-2">
            <Button size="sm" variant="ghost" className="justify-start">
              <Icon name="globe" /> View preview URL
            </Button>
            <Button size="sm" variant="ghost" className="justify-start">
              <Icon name="logs" /> View runtime logs
            </Button>
            <Button size="sm" variant="ghost" className="justify-start">
              <Icon name="git" /> Open PR
            </Button>
          </CardBody>
        </Card>
      </aside>
    </div>
  );
}

function MetadataRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-fg-subtle text-[12px] font-mono uppercase tracking-[0.06em]">{label}</span>
      <span className={mono ? "font-mono" : undefined}>{value}</span>
    </div>
  );
}
