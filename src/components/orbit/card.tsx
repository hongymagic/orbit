import { cn } from "@/lib/utils";

export function Card({
  children,
  lifted,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { lifted?: boolean }) {
  return (
    <div
      className={cn(
        "bg-bg rounded-md overflow-hidden",
        lifted
          ? "shadow-[0_0_0_1px_var(--color-line),0_2px_2px_rgb(0_0_0/0.03),0_8px_16px_-8px_rgb(0_0_0/0.06)]"
          : "shadow-[0_0_0_1px_var(--color-line),0_2px_2px_rgb(0_0_0/0.02)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHead({
  title,
  sub,
  actions,
  className,
}: {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-4 py-3.5",
        "shadow-[0_1px_0_var(--color-line)]",
        className,
      )}
    >
      <div>
        {title ? <div className="text-[13px] font-semibold tracking-[-0.01em]">{title}</div> : null}
        {sub ? <div className="text-[12px] text-fg-subtle font-mono">{sub}</div> : null}
      </div>
      {actions ? <div className="ml-auto flex gap-1.5">{actions}</div> : null}
    </div>
  );
}

export function CardBody({
  children,
  className,
  pad = true,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { pad?: boolean }) {
  return (
    <div className={cn(pad ? "p-4" : undefined, className)} {...rest}>
      {children}
    </div>
  );
}
