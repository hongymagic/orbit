import { cn } from "@/lib/utils";

export function BrandMark({
  letter = "O",
  size = 22,
  className,
}: {
  letter?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center bg-fg text-bg font-mono font-semibold tracking-[-0.02em]",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(4, size * 0.23),
        fontSize: Math.round(size * 0.55),
      }}
    >
      {letter}
    </div>
  );
}

export function Avatar({
  initials,
  size = 24,
  tone = "accent",
  className,
}: {
  initials: string;
  size?: number;
  tone?: "accent" | "muted";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-pill font-semibold shrink-0",
        tone === "accent"
          ? "bg-accent text-accent-fg"
          : "bg-bg-muted text-fg-muted shadow-[inset_0_0_0_1px_var(--color-line)]",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.46),
      }}
    >
      {initials}
    </div>
  );
}
