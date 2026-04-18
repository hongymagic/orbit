import Link from "next/link";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Badge } from "@/components/orbit/badge";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Icon } from "@/components/icons";

const sections = [
  {
    key: "tokens",
    title: "Tokens",
    sub: "The load-bearing layer",
    body: "Every color, radius, shadow, and type step is a CSS variable in @theme. Light + dark in one scope, shadcn bridge included.",
    href: "/_design/tokens",
  },
  {
    key: "components",
    title: "Components",
    sub: "Atoms → composites",
    body: "Button, Badge, Card, Metric, Sparkline, DataTable, Pipeline, Console, Activity. Every variant is rendered here.",
    href: "/_design/components",
  },
  {
    key: "conservative",
    title: "Conservative",
    sub: "Safe · data-dense",
    body: "Deployments page with table, pipeline, activity, build output. The default layout mode for data-heavy surfaces.",
    href: "/_design/conservative",
  },
  {
    key: "confident",
    title: "Confident",
    sub: "Bold · hero-led",
    body: "Overview page with hero banner, stat panel, quickstart. For marketing-adjacent surfaces and first impressions.",
    href: "/_design/confident",
  },
  {
    key: "experimental",
    title: "Experimental",
    sub: "Lab · terminal-forward",
    body: "Ops page: mono-heavy, ASCII dividers, brutalist table. For oncall / incident / infra surfaces.",
    href: "/_design/experimental",
  },
  {
    key: "ai",
    title: "ai-elements",
    sub: "AI UI under Orbit tokens",
    body: "Conversation, PromptInput, CodeBlock, Tool. Every AI surface re-skinned to match the shadow-as-border system.",
    href: "/_design/ai",
  },
] as const;

export default function DesignIndexPage() {
  return (
    <>
      <Topbar
        crumbs={["Orbit", "Design System"]}
        hideDeploy
        actions={
          <Badge tone="info" dot>
            v0.1
          </Badge>
        }
      />
      <Page>
        <PageHead
          kicker="~/design-system $ orbit explain"
          title="Orbit Design System"
          sub="A shadow-as-border foundation for product surfaces. Next.js 16, Tailwind v4, shadcn primitives, ai-elements. Swap theme, accent, and variation live from the Tweaks panel (⌘.)."
          actions={
            <Link
              href="/_design/tokens"
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-sm bg-fg text-bg font-medium text-[13px] hover:opacity-90"
            >
              <Icon name="dash" /> Start with tokens
            </Link>
          }
        />

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {sections.map((s) => (
            <Link key={s.key} href={s.href as never} className="block">
              <Card className="transition-shadow duration-150 hover:shadow-[0_0_0_1px_var(--color-line-strong),0_2px_2px_rgb(0_0_0/0.03),0_8px_16px_-8px_rgb(0_0_0/0.06)]">
                <CardHead title={s.title} sub={s.sub} />
                <CardBody>
                  <div className="text-[13px] text-fg-muted leading-[1.55]">{s.body}</div>
                  <div className="mt-3 flex items-center gap-1.5 text-accent text-[12px] font-medium">
                    Open
                    <Icon name="chev" className="rotate-[-90deg]" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </Page>
    </>
  );
}
