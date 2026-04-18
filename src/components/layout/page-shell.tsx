import { cn } from "@/lib/cn";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col min-w-0", className)}>{children}</div>
  );
}

export function Page({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-[1400px] mx-auto",
        "px-5 md:px-8 pt-7 pb-16 view-fade",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  sub,
  actions,
  className,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-6", className)}>
      <div className="min-w-0">
        {kicker ? <div className="text-kicker">{kicker}</div> : null}
        <h1 className="orbit-h1 text-h1 mt-2">{title}</h1>
        {sub ? (
          <div className="text-[14px] text-fg-muted mt-1.5 max-w-[560px]">{sub}</div>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function AppShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-bg"
      style={{
        display: "grid",
        gridTemplateColumns: "var(--sidebar-w) minmax(0, 1fr)",
      }}
    >
      {sidebar}
      <PageShell>{children}</PageShell>
    </div>
  );
}

export function VariationScope({
  variation,
  children,
}: {
  variation?: "conservative" | "confident" | "experimental";
  children: React.ReactNode;
}) {
  return <div data-variation={variation}>{children}</div>;
}

export function Grid({
  columns = 2,
  gap = 16,
  className,
  children,
  ...rest
}: {
  columns?: 2 | 3 | 4;
  gap?: number;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function GridSplit({
  ratio = "2fr 1fr",
  gap = 16,
  className,
  children,
}: {
  ratio?: string;
  gap?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "grid",
        gridTemplateColumns: ratio,
        gap,
      }}
    >
      {children}
    </div>
  );
}
