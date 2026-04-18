import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeStyles = cva(
  [
    "inline-flex items-center gap-1.5 h-5 px-2",
    "rounded-pill font-mono text-[11px] font-medium whitespace-nowrap",
    "shadow-[inset_0_0_0_1px_var(--color-line)]",
  ],
  {
    variants: {
      tone: {
        neutral: "text-fg-muted",
        ok: "text-success",
        warn: "text-warn",
        err: "text-error",
        info: "text-accent",
      },
      solid: {
        true: "shadow-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        solid: true,
        tone: "ok",
        class: "bg-[color-mix(in_oklab,var(--color-success)_14%,transparent)] text-success",
      },
      {
        solid: true,
        tone: "warn",
        class: "bg-[color-mix(in_oklab,var(--color-warn)_14%,transparent)] text-warn",
      },
      {
        solid: true,
        tone: "err",
        class: "bg-[color-mix(in_oklab,var(--color-error)_14%,transparent)] text-error",
      },
      { solid: true, tone: "info", class: "bg-accent-soft text-accent" },
      { solid: true, tone: "neutral", class: "bg-bg-muted text-fg-muted" },
    ],
    defaultVariants: { tone: "neutral", solid: false },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeStyles> & {
    dot?: boolean;
  };

export function Badge({ className, tone, solid, dot = false, children, ...rest }: BadgeProps) {
  return (
    <span className={cn(badgeStyles({ tone, solid }), className)} {...rest}>
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
