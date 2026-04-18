import { cn } from "@/lib/utils";

export function CodeSnippet({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[12.5px] leading-[1.7] p-4",
        "bg-bg-subtle rounded-md shadow-[inset_0_0_0_1px_var(--color-line)]",
        "overflow-auto text-fg",
        className,
      )}
    >
      {children}
    </div>
  );
}
