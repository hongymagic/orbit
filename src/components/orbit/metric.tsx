import { cn } from "@/lib/utils";

import { Sparkline } from "./sparkline";

export type MetricProps = {
  label: string;
  value: React.ReactNode;
  delta?: React.ReactNode;
  deltaDir?: "up" | "down" | "flat";
  data?: readonly number[];
  className?: string;
};

export function Metric({ label, value, delta, deltaDir = "flat", data, className }: MetricProps) {
  const deltaColor =
    deltaDir === "up" ? "text-success" : deltaDir === "down" ? "text-error" : "text-fg-subtle";
  return (
    <div className={cn("relative bg-bg px-[18px] py-4 shadow-[1px_0_0_var(--color-line)] last:shadow-none", className)}>
      <div className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.06em] mb-2">
        {label}
      </div>
      <div className="text-[28px] font-semibold tracking-[-0.025em] leading-none tabular-nums">
        {value}
      </div>
      {delta ? (
        <div className={cn("mt-2 font-mono text-[11px]", deltaColor)}>{delta}</div>
      ) : null}
      {data ? (
        <Sparkline
          data={data}
          className="absolute right-[14px] bottom-[14px]"
          width={72}
          height={24}
        />
      ) : null}
    </div>
  );
}

export function MetricGrid({
  children,
  columns = 4,
  className,
  withGridBg = false,
}: {
  children: React.ReactNode;
  columns?: number;
  className?: string;
  withGridBg?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md overflow-hidden bg-bg",
        "shadow-[0_0_0_1px_var(--color-line),0_2px_2px_rgb(0_0_0/0.02)]",
        withGridBg ? "metric-grid-bg" : undefined,
        className,
      )}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
