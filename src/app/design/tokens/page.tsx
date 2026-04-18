import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";

const colorTokens = [
  { token: "--color-bg", description: "Page background", swatch: "bg-bg" },
  { token: "--color-bg-subtle", description: "Sidebar, subtle surface", swatch: "bg-bg-subtle" },
  { token: "--color-bg-muted", description: "Muted surface, inputs", swatch: "bg-bg-muted" },
  { token: "--color-fg", description: "Primary text, headings", swatch: "bg-fg" },
  { token: "--color-fg-muted", description: "Secondary text", swatch: "bg-fg-muted" },
  { token: "--color-fg-subtle", description: "Tertiary text, captions", swatch: "bg-fg-subtle" },
  { token: "--color-fg-faint", description: "Placeholder, disabled", swatch: "bg-fg-faint" },
  { token: "--color-accent", description: "Interactive emphasis", swatch: "bg-accent" },
  { token: "--color-develop", description: "Pipeline · develop", swatch: "bg-develop" },
  { token: "--color-preview", description: "Pipeline · preview", swatch: "bg-preview" },
  { token: "--color-ship", description: "Pipeline · ship", swatch: "bg-ship" },
  { token: "--color-success", description: "Semantic · ok", swatch: "bg-success" },
  { token: "--color-warn", description: "Semantic · warn", swatch: "bg-warn" },
  { token: "--color-error", description: "Semantic · error", swatch: "bg-error" },
];

const radii = [
  { name: "radius-xs", value: "4px" },
  { name: "radius-sm", value: "6px" },
  { name: "radius-md", value: "8px" },
  { name: "radius-lg", value: "12px" },
  { name: "radius-xl", value: "16px" },
  { name: "radius-pill", value: "9999px" },
];

const shadows = [
  { name: "shadow-ring-1", sample: "inset 0 0 0 1px var(--color-line)" },
  { name: "shadow-ring-2", sample: "inset 0 0 0 1px var(--color-line-strong)" },
  { name: "shadow-card", sample: "0 0 0 1px line, 0 2px 2px rgb(0 0 0/0.02)" },
  { name: "shadow-card-lifted", sample: "card + 0 8px 16px -8px rgb(0 0 0/0.06)" },
];

const typeScale = [
  { role: "h1", sample: "Display · 28/1.15 · -0.03em", className: "text-h1" },
  { role: "h2", sample: "Section · 20/1.2 · -0.02em", className: "text-h2" },
  { role: "h3", sample: "Heading · 15 · -0.015em", className: "text-h3" },
  { role: "body", sample: "Body · 14 · 1.5", className: "text-[14px] leading-[1.5]" },
  { role: "small", sample: "Small · 13 · 1.5", className: "text-[13px]" },
  { role: "kicker", sample: "KICKER · mono · 11 · +0.08em", className: "text-kicker" },
  { role: "mono", sample: "12.5px mono · 1.7", className: "font-mono text-[12.5px] leading-[1.7]" },
];

export default function TokensPage() {
  return (
    <>
      <Topbar crumbs={["Design System", "Tokens"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Foundation"
          title="Tokens"
          sub="Every color, radius, shadow, and type step is a CSS variable in @theme. Change one variable and the entire surface follows. Dark mode flips values under [data-theme=dark] — no component-level branching."
        />

        <div className="grid gap-4" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
          <Card>
            <CardHead title="Colors" sub="CSS custom properties bridged to Tailwind utilities" />
            <CardBody>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
              >
                {colorTokens.map((t) => (
                  <div key={t.token} className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-sm shrink-0 shadow-[inset_0_0_0_1px_var(--color-line)] ${t.swatch}`}
                    />
                    <div className="min-w-0">
                      <div className="font-mono text-[12px] truncate">{t.token}</div>
                      <div className="text-[11px] text-fg-subtle truncate">{t.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Type scale" sub="Geist Sans · Geist Mono" />
            <CardBody className="flex flex-col gap-3">
              {typeScale.map((t) => (
                <div
                  key={t.role}
                  className="pb-3 shadow-[0_1px_0_var(--color-line-subtle)] last:shadow-none last:pb-0"
                >
                  <div className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.06em] mb-1">
                    {t.role}
                  </div>
                  <div className={t.className}>{t.sample}</div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="mt-4 grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Card>
            <CardHead title="Radii" />
            <CardBody>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
              >
                {radii.map((r) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 bg-bg-muted shadow-[inset_0_0_0_1px_var(--color-line)] shrink-0"
                      style={{ borderRadius: r.value }}
                    />
                    <div className="min-w-0">
                      <div className="font-mono text-[12px] truncate">--{r.name}</div>
                      <div className="text-[11px] text-fg-subtle">{r.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Shadow recipes" sub="The shadow-as-border system" />
            <CardBody className="flex flex-col gap-3">
              {shadows.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 bg-bg rounded-md shrink-0"
                    style={{ boxShadow: `var(--${s.name})` }}
                  />
                  <div className="min-w-0">
                    <div className="font-mono text-[12px] truncate">--{s.name}</div>
                    <div className="text-[11px] text-fg-subtle truncate">{s.sample}</div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </Page>
    </>
  );
}
