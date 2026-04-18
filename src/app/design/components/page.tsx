import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Button } from "@/components/orbit/button";
import { Badge } from "@/components/orbit/badge";
import { Metric, MetricGrid } from "@/components/orbit/metric";
import { Sparkline } from "@/components/orbit/sparkline";
import { Icon, iconNames } from "@/components/icons";
import { Pipeline, PipelineArrow, PipelineStep } from "@/components/data/pipeline";
import { Activity } from "@/components/data/activity";
import { Console } from "@/components/data/console";
import { activityToday } from "@/data/activity";
import { buildLogs } from "@/data/logs";
import { sparkDeployments } from "@/data/sparks";

export default function ComponentsPage() {
  return (
    <>
      <Topbar crumbs={["Design System", "Components"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Gallery"
          title="Components"
          sub="Every atom and composite, every variant, rendered in-place. Source paths listed on each card — copy the patterns into product surfaces."
        />

        <Section
          title="Button"
          path="src/components/orbit/button.tsx"
          description="4 variants × 3 sizes + icon-only. Uses radix Slot for asChild."
        >
          <div className="flex items-center gap-3 flex-wrap">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button iconOnly aria-label="Settings"><Icon name="settings" /></Button>
            <Button iconOnly size="sm" aria-label="More"><Icon name="dots" /></Button>
            <Button><Icon name="plus" /> New deployment</Button>
          </div>
        </Section>

        <Section
          title="Badge"
          path="src/components/orbit/badge.tsx"
          description="5 tones × shadow-bordered or solid · optional dot indicator."
        >
          <div className="flex items-center gap-3 flex-wrap">
            <Badge>Neutral</Badge>
            <Badge tone="ok" dot>Ready</Badge>
            <Badge tone="info" dot>Building</Badge>
            <Badge tone="warn" dot>Queued</Badge>
            <Badge tone="err" dot>Failed</Badge>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-3">
            <Badge tone="neutral" solid>v0.1</Badge>
            <Badge tone="info" solid>Preview</Badge>
            <Badge tone="ok" solid>Deployed</Badge>
          </div>
        </Section>

        <Section
          title="Metric grid"
          path="src/components/orbit/metric.tsx"
          description="4 equal cells, inline sparkline, shared outer shadow."
        >
          <MetricGrid>
            <Metric label="Deployments · 7d" value="247" delta="+18" deltaDir="up" data={sparkDeployments} />
            <Metric label="Avg build time" value="1m 12s" delta="−9s" deltaDir="up" />
            <Metric label="Success rate" value="99.8%" delta="+0.2 pp" deltaDir="up" />
            <Metric label="Active branches" value="18" delta="+2" deltaDir="up" />
          </MetricGrid>
        </Section>

        <Section
          title="Sparkline"
          path="src/components/orbit/sparkline.tsx"
          description="Line-only by default. Pass `area` for filled variant."
        >
          <div className="flex items-center gap-6">
            <Sparkline data={sparkDeployments} />
            <Sparkline data={sparkDeployments} area />
            <Sparkline data={sparkDeployments} color="var(--color-success)" />
            <Sparkline data={sparkDeployments} color="var(--color-error)" />
          </div>
        </Section>

        <Section
          title="Pipeline"
          path="src/components/data/pipeline.tsx"
          description="Develop · Preview · Ship accents typed into the stage prop."
        >
          <Pipeline>
            <PipelineStep stage="develop" label="Develop" title="feat/billing-v2" sub="3 commits ahead" />
            <PipelineArrow />
            <PipelineStep stage="preview" label="Preview" title="dpl_pK3m" sub="building · 22s ETA" />
            <PipelineArrow />
            <PipelineStep stage="ship" label="Ship" title="Requires approval" sub="2 reviewers" />
          </Pipeline>
        </Section>

        <Section
          title="Activity"
          path="src/components/data/activity.tsx"
          description="Avatar + actor + verb + object + time."
        >
          <Activity events={activityToday} />
        </Section>

        <Section
          title="Console / LogRow"
          path="src/components/data/console.tsx"
          description="Monospace log stream with level coloring. Fixed grid columns."
        >
          <Console entries={buildLogs.slice(0, 6)} maxHeight={220} />
        </Section>

        <Section
          title="Icons"
          path="src/components/icons.tsx"
          description={'18 bespoke 16×16 stroke icons. Import <Icon name="…" />.'}
        >
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(88px, 1fr))" }}>
            {iconNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 py-3 px-2 rounded-sm shadow-[inset_0_0_0_1px_var(--color-line)]"
              >
                <Icon name={name} size={16} />
                <span className="font-mono text-[11px] text-fg-subtle">{name}</span>
              </div>
            ))}
          </div>
        </Section>
      </Page>
    </>
  );
}

function Section({
  title,
  path,
  description,
  children,
}: {
  title: string;
  path: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <Card>
        <CardHead
          title={title}
          sub={description}
          actions={<span className="font-mono text-[11px] text-fg-subtle">{path}</span>}
        />
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}
