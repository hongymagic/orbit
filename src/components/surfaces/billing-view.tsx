"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/components/icons";
import { usageApril } from "@/data/usage";

const tiers = [
  {
    name: "Hobby",
    price: "$0",
    unit: "forever",
    description: "For personal projects and experiments.",
    features: ["100 deployments / month", "1 preview env", "Community support"],
    cta: "Current plan",
    current: true,
  },
  {
    name: "Pro",
    price: "$20",
    unit: "per user / month",
    description: "For teams shipping production traffic.",
    features: ["Unlimited deployments", "Unlimited previews", "SLA 99.95%", "Priority support"],
    cta: "Upgrade",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    description: "For organisations with custom compliance needs.",
    features: ["SSO + SCIM", "Dedicated support", "Custom contracts", "Data residency"],
    cta: "Contact sales",
  },
];

const invoices = [
  { id: "INV-104", date: "Apr 2026", amount: "$240.00", status: "Paid", due: "—" },
  { id: "INV-103", date: "Mar 2026", amount: "$240.00", status: "Paid", due: "—" },
  { id: "INV-102", date: "Feb 2026", amount: "$220.00", status: "Paid", due: "—" },
  { id: "INV-101", date: "Jan 2026", amount: "$220.00", status: "Paid", due: "—" },
  { id: "INV-100", date: "Dec 2025", amount: "$220.00", status: "Paid", due: "—" },
];

export function BillingView() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-[14px] font-semibold uppercase tracking-[0.08em] font-mono text-muted-foreground mb-3">
          Plans
        </h2>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={
                tier.highlighted
                  ? "border-[color:var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent),0_8px_16px_-8px_color-mix(in_oklab,var(--color-accent)_30%,transparent)]"
                  : undefined
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{tier.name}</CardTitle>
                  {tier.current ? <Badge variant="secondary">Current</Badge> : null}
                  {tier.highlighted ? <Badge>Recommended</Badge> : null}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-1.5">
                  <div className="text-[32px] font-semibold tracking-[-0.025em]">{tier.price}</div>
                  {tier.unit ? (
                    <div className="text-muted-foreground text-sm">{tier.unit}</div>
                  ) : null}
                </div>
                <ul className="space-y-1.5 text-[13px] text-muted-foreground">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Icon name="check" className="text-[color:var(--color-success)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlighted ? "default" : "outline"}
                  className="w-full"
                  disabled={tier.current}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[14px] font-semibold uppercase tracking-[0.08em] font-mono text-muted-foreground mb-3">
          Usage · {usageApril.period}
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-5">
            {usageApril.metrics.map((m) => (
              <UsageBar key={m.key} label={m.label} used={m.used} cap={m.cap} unit={m.unit} />
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.08em] font-mono text-muted-foreground">
            Invoices
          </h2>
          <Button variant="outline" size="sm">
            Download all
          </Button>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono">{inv.id}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell className="font-mono">{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm" aria-label={`Download ${inv.id}`}>
                      <Icon name="deploy" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
}

function UsageBar({
  label,
  used,
  cap,
  unit,
}: {
  label: string;
  used: number;
  cap: number;
  unit: string;
}) {
  const pct = Math.min(100, (used / cap) * 100);
  const warn = pct > 75;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="text-[13px] font-medium">{label}</div>
        <div className="text-[12px] font-mono text-muted-foreground">
          {used.toLocaleString()} {unit} / {cap.toLocaleString()} {unit}
        </div>
      </div>
      <div className="h-2 w-full rounded-pill bg-muted overflow-hidden shadow-[inset_0_0_0_1px_var(--color-line)]">
        <div
          className="h-full rounded-pill"
          style={{
            width: `${pct}%`,
            background: warn ? "var(--color-warn)" : "var(--color-accent)",
          }}
        />
      </div>
    </div>
  );
}
